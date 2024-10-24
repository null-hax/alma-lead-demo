import { Lead } from '@/app/api/leads/route';

type LeadsTableProps = {
  leads: Lead[];
  onStatusChange: (leadId: string, newStatus: 'PENDING' | 'REACHED_OUT') => void;
};

export default function LeadsTable({ leads, onStatusChange }: LeadsTableProps) {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Email
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Country
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Visas Interested
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {leads.map((lead) => (
          <tr key={lead.id}>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              {lead.firstName} {lead.lastName}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              {lead.email}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              {lead.countryOfCitizenship}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              {lead.visasInterested.join(', ')}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              {lead.status}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              <button
                onClick={() => onStatusChange(lead.id, lead.status === 'PENDING' ? 'REACHED_OUT' : 'PENDING')}
                className={`px-4 py-2 font-semibold text-sm text-white rounded-full shadow-sm ${
                  lead.status === 'PENDING' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-yellow-500 hover:bg-yellow-600'
                }`}
              >
                {lead.status === 'PENDING' ? 'Mark as Reached Out' : 'Reset to Pending'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
