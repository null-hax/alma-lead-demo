import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-alma-green">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <Image src="/images/logo.png" alt="Alma Logo" width={100} height={50} />
          </Link>
          <Link href="/admin/login">
            <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors text-sm font-semibold">
              Admin Login
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow bg-white">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Immigration <br />made <span className="text-[#8687E7]">easy!</span>
            </h1>
            <p className="text-xl mb-8 text-gray-700">
              Alma simplifies immigration for founders, technologists, researchers and others at the top of their fields.
            </p>
            <Link href="/lead-form">
              <button className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors text-sm font-semibold">
                Submit your information now
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 border-t">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo */}
            <div>
              <Image src="/images/logo.png" alt="Alma Logo" width={100} height={50} />
            </div>

            {/* About Links */}
            <div>
              <h3 className="text-black font-bold mb-4">ABOUT</h3>
              <div className="space-y-2">
                <p className="text-gray-600 cursor-not-allowed">Contact Us</p>
                <p className="text-gray-600 cursor-not-allowed">Careers</p>
              </div>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-black font-bold mb-4">LEGAL</h3>
              <div className="space-y-2">
                <p className="text-gray-600 cursor-not-allowed">Privacy</p>
                <p className="text-gray-600 cursor-not-allowed">Terms of Service</p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 text-sm text-gray-600">
            <p className="mb-4">
              Disclaimer: Alma is not a law firm and nothing on this website, including guides and resources, is to be considered legal advice. Blank immigration forms with instructions are available for free at the USCIS website. Alma partners with licensed immigration attorneys who provide all legal advice on a contract basis. Communications between Alma and you are governed by our Privacy Policy and Terms of Service but are not covered by the attorney-client privilege.
            </p>
            <p>Copyright © 2024 ALMA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
