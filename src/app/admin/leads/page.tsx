'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LeadsTable from '@/components/LeadsTable';
import AuthWrapper from '@/components/AuthWrapper';
import { Lead } from '@/app/api/leads/route';
import { LEADS_PER_PAGE } from '@/config/constants';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type SortConfig = {
  key: keyof Lead | null;
  direction: 'asc' | 'desc';
};

export default function LeadsListPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'asc'
  });

  const fetchLeads = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/leads?page=${page}&limit=${LEADS_PER_PAGE}`, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch leads');
      const data = await response.json();
      setLeads(data.leads);
      setFilteredLeads(data.leads);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (err) {
      console.error(err);
      setError('Error fetching leads. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const filtered = leads.filter(lead => 
      (statusFilter === '' || lead.status === statusFilter) &&
      (searchTerm === '' || 
        `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.countryOfCitizenship.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredLeads(filtered);
  }, [leads, statusFilter, searchTerm]);

  const handleStatusChange = async (leadId: string, newStatus: 'PENDING' | 'REACHED_OUT') => {
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (!response.ok) throw new Error('Failed to update lead status');
      fetchLeads(currentPage);
    } catch (err) {
      setError('Error updating lead status. Please try again.');
      console.error(err);
    }
  };

  const handleSort = (key: keyof Lead) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });

    const sortedLeads = [...filteredLeads].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredLeads(sortedLeads);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    router.push('/');
  };

  return (
    <AuthWrapper>
      <div className="flex flex-col-reverse lg:flex-row h-screen alma-admin-gradient">
        {/* Sidebar */}
        <div className="w-full lg:w-64 flex flex-col border-r border-gray-200">
          <div className="p-8">
            <Link href="/">
              <Image src="/images/logo.png" alt="Alma Logo" width={100} height={50} />
            </Link>
          </div>
          <nav className="lg:flex-grow lg:mt-8">
            <a href="#" className="block py-2 px-8 text-gray-900 font-bold">Leads</a>
            <a href="#" className="block py-2 px-8 text-gray-600 cursor-not-allowed">Settings</a>
          </nav>
          <div className="p-8">
            <div className="relative group">
              <button 
                onClick={() => handleLogout()}
                className="w-full flex items-center justify-between hover:bg-gray-50 p-2 rounded-md transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-2 flex items-center justify-center font-bold">
                    A
                  </div>
                  <span className="font-bold">Admin</span>
                </div>
                <svg 
                  className="w-4 h-4 text-gray-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <div className="container mx-auto px-6 py-8">
              <h1 className="text-3xl font-bold mb-6 mt-2">Leads</h1>
              <div className="flex items-start gap-2 mb-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-8 pr-4 py-2 border rounded-md h-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg className="w-4 h-4 absolute left-2 top-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <select
                  className="px-4 py-2 border rounded-md h-10 text-gray-400 w-28"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="REACHED_OUT">Reached Out</option>
                </select>
              </div>
              {isLoading ? (
                <p>Loading leads...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <LeadsTable 
                  leads={filteredLeads} 
                  onStatusChange={handleStatusChange}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  onSort={handleSort}
                  sortConfig={sortConfig}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </AuthWrapper>
  );
}
