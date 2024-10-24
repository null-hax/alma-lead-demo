import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Lead } from '../route';

const DATA_FILE = path.join(process.cwd(), 'data', 'leads.json');

function getLeads(): Lead[] {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(data);
}

function saveLeads(leads: Lead[]) {
  const dirPath = path.dirname(DATA_FILE);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2));
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { status } = await req.json();

  if (status !== 'REACHED_OUT' && status !== 'PENDING') {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const leads = getLeads();
  const leadIndex = leads.findIndex((lead: Lead) => lead.id === id);

  if (leadIndex === -1) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  }

  leads[leadIndex].status = status;
  saveLeads(leads);

  return NextResponse.json({ message: 'Lead status updated successfully', lead: leads[leadIndex] });
}
