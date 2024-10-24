import { Lead } from '@/app/api/leads/route';

type LeadsTableProps = {
  leads: Lead[];
  onStatusChange: (leadId: string, newStatus: 'PENDING' | 'REACHED_OUT') => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function LeadsTable({ leads, onStatusChange, currentPage, totalPages, onPageChange }: LeadsTableProps) {
  return (
    <div className="max-w-screen-xl overflow-x-auto border border-gray-200 rounded-lg">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="text-left text-xs font-semibold text-gray-600 uppercase">
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Submitted</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Country</th>
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
                {new Date(lead.createdAt).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  lead.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>
                  {lead.status}
                </span>
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
          {/* Add page numbers here if needed */}
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
