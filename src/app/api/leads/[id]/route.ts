import { NextResponse } from 'next/server';
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

export async function PUT(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { message: 'This is a demo. To update data, please run the app locally.' },
      { status: 200 }
    );
  }

  try {
    // Get ID from URL
    const segments = request.url.split('/');
    const id = segments[segments.length - 1];
    
    const { status } = await request.json();

    if (!id || (status !== 'REACHED_OUT' && status !== 'PENDING')) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const leads = getLeads();
    const leadIndex = leads.findIndex(lead => lead.id === id);

    if (leadIndex === -1) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    leads[leadIndex].status = status;
    saveLeads(leads);

    return NextResponse.json(leads[leadIndex]);
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 }
    );
  }
}
