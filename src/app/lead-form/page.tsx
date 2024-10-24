'use client';

import Image from 'next/image';
import LeadForm from '@/components/LeadForm';

export default function LeadFormPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-alma-green p-4 h-96 flex items-center justify-center">
        <div className="container mx-auto flex flex-col items-start justify-between max-w-2xl">
          <a href="/">
            <Image src="/images/logo.png" alt="Alma AI Logo" width={100} height={50} />
          </a>
          <h1 className="text-4xl font-bold mt-8">Get An Assessment Of Your Immigration Case</h1>
        </div>
      </header>
      <main className="flex-grow bg-white">
        <div className="container mx-auto py-8">
          <LeadForm />
        </div>
      </main>
    </div>
  );
}
