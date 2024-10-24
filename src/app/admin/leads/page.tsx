'use client';

import { useState, useEffect } from 'react';
import LeadsTable from '@/components/LeadsTable';
import AuthWrapper from '@/components/AuthWrapper';
import { Lead } from '@/app/api/leads/route';
import { LEADS_PER_PAGE } from '@/config/constants';

export default function LeadsListPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleStatusChange = async (leadId: string, newStatus: 'PENDING' | 'REACHED_OUT') => {
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
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
    }
  };

  return (
    <AuthWrapper>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Leads</h1>
        {isLoading ? (
          <p>Loading leads...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <LeadsTable leads={leads} onStatusChange={handleStatusChange} />
            <div className="mt-4 flex justify-center">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`mx-1 px-3 py-1 border ${
                    currentPage === page ? 'bg-blue-500 text-white' : 'bg-white'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </AuthWrapper>
  );
}
