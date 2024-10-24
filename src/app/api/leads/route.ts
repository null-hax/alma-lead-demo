import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

  const leads = getLeads();
  leads.push(newLead);
  saveLeads(leads);

  return NextResponse.json({ message: 'Lead submitted successfully', lead: newLead }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const sort = searchParams.get('sort') || 'createdAt';

  const leads = getLeads();

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const sortedLeads = [...leads].sort((a, b) => {
    if (a[sort as keyof Lead] < b[sort as keyof Lead]) return 1;
    if (a[sort as keyof Lead] > b[sort as keyof Lead]) return -1;
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
