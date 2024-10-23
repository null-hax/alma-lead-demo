import { NextRequest, NextResponse } from 'next/server';

export type Lead = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  countryOfCitizenship: string;
  linkedin: string;
  visasInterested: string[];
  resumeUrl: string;
  openInput: string;
  status: 'PENDING' | 'REACHED_OUT';
  createdAt: Date;
};

export let leads: Lead[] = [];

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const countryOfCitizenship = formData.get('countryOfCitizenship') as string;
  const linkedin = formData.get('linkedin') as string;
  const visasInterested = formData.getAll('visasInterested') as string[];
  const openInput = formData.get('openInput') as string;
  const resume = formData.get('resume') as File;

  if (!firstName || !lastName || !email || !countryOfCitizenship || !linkedin || visasInterested.length === 0 || !resume || !openInput) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // In a real application, we would upload the file to a storage service
  // For this example, we'll just use the file name
  const resumeUrl = `https://example.com/resumes/${resume.name}`;

  const newLead: Lead = {
    id: Date.now().toString(),
    firstName,
    lastName,
    email,
    countryOfCitizenship,
    linkedin,
    visasInterested,
    resumeUrl,
    openInput,
    status: 'PENDING',
    createdAt: new Date(),
  };

  leads.push(newLead);

  return NextResponse.json({ message: 'Lead submitted successfully', lead: newLead }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const sort = searchParams.get('sort') || 'createdAt';

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const sortedLeads = [...leads].sort((a, b) => {
    if (a[sort as keyof Lead] < b[sort as keyof Lead]) return -1;
    if (a[sort as keyof Lead] > b[sort as keyof Lead]) return 1;
    return 0;
  });

  const paginatedLeads = sortedLeads.slice(startIndex, endIndex);

  return NextResponse.json({
    leads: paginatedLeads,
    totalLeads: leads.length,
    currentPage: page,
    totalPages: Math.ceil(leads.length / limit),
  });
}