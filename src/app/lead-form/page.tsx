'use client';

import Image from 'next/image';
import Link from 'next/link';
import LeadForm from '@/components/LeadForm';

export default function LeadFormPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-alma-green p-4 h-96 flex items-center justify-center relative overflow-hidden">
        <div className="absolute w-1/4 inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-alma-green z-10" />
          <Image 
            src="/images/background.png" 
            alt="Background" 
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto flex flex-col items-start justify-between max-w-2xl relative z-20">
          <Link href="/">
            <Image src="/images/logo.png" alt="Alma AI Logo" width={64} height={32} />
          </Link>
          <h1 className="text-4xl lg:text-6xl font-bold mt-12">Get An Assessment Of Your Immigration Case</h1>
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
