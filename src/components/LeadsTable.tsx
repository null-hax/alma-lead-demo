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

const CheckIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

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
                {lead.status === 'PENDING' ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm bg-yellow-50 text-yellow-800">
                    <ClockIcon />
                    <span className="ml-1">Pending</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm bg-green-50 text-green-800">
                    <CheckIcon />
                    <span className="ml-1">Reached Out</span>
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {lead.countryOfCitizenship}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onStatusChange(lead.id, lead.status === 'PENDING' ? 'REACHED_OUT' : 'PENDING')}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                    ${lead.status === 'PENDING' 
                      ? 'bg-white border border-green-600 text-green-700 hover:bg-green-50' 
                      : 'bg-white border border-yellow-600 text-yellow-700 hover:bg-yellow-50'
                    }`}
                >
                  {lead.status === 'PENDING' ? (
                    <>
                      <CheckIcon />
                      Set as Reached Out
                    </>
                  ) : (
                    <>
                      <ClockIcon />
                      Reset to Pending
                    </>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end gap-1 border-t border-gray-200 py-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-2 py-1 ${
            currentPage === 1 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-3 h-3">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
          </svg>
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-sm ${
              currentPage === page 
                ? 'border border-black font-semibold bg-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-2 py-1 ${
            currentPage === totalPages 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-3 h-3">
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
