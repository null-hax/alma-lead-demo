import { NextRequest, NextResponse } from 'next/server';
import { Lead, leads } from '../route';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { status } = await req.json();

  if (status !== 'REACHED_OUT') {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const leadIndex = leads.findIndex((lead: Lead) => lead.id === id);

  if (leadIndex === -1) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  }

  if (leads[leadIndex].status !== 'PENDING') {
    return NextResponse.json({ error: 'Lead status can only be changed from PENDING to REACHED_OUT' }, { status: 400 });
  }

  leads[leadIndex].status = 'REACHED_OUT';

  return NextResponse.json({ message: 'Lead status updated successfully', lead: leads[leadIndex] });
}
