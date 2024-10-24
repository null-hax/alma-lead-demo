import { Lead } from '@/app/api/leads/route';

type SortConfig = {
  key: keyof Lead | null;
  direction: 'asc' | 'desc';
};

type LeadsTableProps = {
  leads: Lead[];
  onStatusChange: (leadId: string, newStatus: 'PENDING' | 'REACHED_OUT') => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSort: (key: keyof Lead) => void;
  sortConfig: SortConfig;
};

export default function LeadsTable({ 
  leads, 
  onStatusChange, 
  currentPage, 
  totalPages, 
  onPageChange,
  onSort,
  sortConfig 
}: LeadsTableProps) {
  const getSortIcon = (columnKey: keyof Lead) => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === 'asc' ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4 ml-1 inline-block">
          <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4 ml-1 inline-block">
          <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
        </svg>
      );
    }
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4 ml-1 inline-block text-gray-400">
        <path fill="currentColor" d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
      </svg>
    );
  };

  return (
    <div className="max-w-screen-xl overflow-x-auto border border-gray-200 rounded-lg">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="text-left font-semibold text-gray-400">
            <th 
              className={`px-6 py-3 cursor-pointer hover:text-gray-900 ${sortConfig.key === 'firstName' ? 'font-bold text-gray-900' : ''}`}
              onClick={() => onSort('firstName')}
            >
              Name {getSortIcon('firstName')}
            </th>
            <th 
              className={`px-6 py-3 cursor-pointer hover:text-gray-900 ${sortConfig.key === 'createdAt' ? 'font-bold text-gray-900' : ''}`}
              onClick={() => onSort('createdAt')}
            >
              Submitted {getSortIcon('createdAt')}
            </th>
            <th 
              className={`px-6 py-3 cursor-pointer hover:text-gray-900 ${sortConfig.key === 'status' ? 'font-bold text-gray-900' : ''}`}
              onClick={() => onSort('status')}
            >
              Status {getSortIcon('status')}
            </th>
            <th 
              className={`px-6 py-3 cursor-pointer hover:text-gray-900 ${sortConfig.key === 'countryOfCitizenship' ? 'font-bold text-gray-900' : ''}`}
              onClick={() => onSort('countryOfCitizenship')}
            >
              Country {getSortIcon('countryOfCitizenship')}
            </th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-t">
              <td className="px-6 py-4 whitespace-nowrap">
                {lead.firstName} {lead.lastName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(lead.createdAt).toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {lead.status === 'PENDING' ? 'Pending' : 'Reached Out'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {lead.countryOfCitizenship}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onStatusChange(lead.id, lead.status === 'PENDING' ? 'REACHED_OUT' : 'PENDING')}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  {lead.status === 'PENDING' ? 'Mark Reached Out' : 'Mark Pending'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                currentPage === page ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}
