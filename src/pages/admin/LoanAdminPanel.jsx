import { useEffect, useState } from 'react';
import apiClient from '../../api/client';
import { useLanguage } from '../../context/LanguageProvider';

export default function LoanAdminPanel() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  const statusLabel = {
    pending: t('pending'),
    approved: t('approved'),
    returned: t('returned'),
    rejected: t('rejected')
  };

  const fetchLoans = async () => {
    try {
      const res = await apiClient.get('/loans');
      setLoans(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const loanToUpdate = loans.find(l => l.id === id);
      await apiClient.put(`/loans/${id}`, { ...loanToUpdate, status });
      setLoans(loans.map(l => l.id === id ? { ...l, status } : l));
    } catch (err) {
      console.error(err);
      alert(t('failedUpdateStatus'));
    }
  };

  if (loading) return <div className="text-center py-10">{t('loadingLoans')}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('loanRequests')}</h1>
      <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('user')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('productId')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('date')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('status')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{loan.userName || loan.user_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{loan.product_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(loan.request_date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${loan.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      loan.status === 'approved' ? 'bg-green-100 text-green-800' : 
                      loan.status === 'returned' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                    {statusLabel[loan.status] || loan.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button onClick={() => updateStatus(loan.id, 'approved')} className="text-indigo-600 hover:text-indigo-900">{t('approve')}</button>
                  <button onClick={() => updateStatus(loan.id, 'rejected')} className="text-red-600 hover:text-red-900">{t('reject')}</button>
                  <button onClick={() => updateStatus(loan.id, 'returned')} className="text-gray-600 hover:text-gray-900">{t('markReturned')}</button>
                </td>
              </tr>
            ))}
            {loans.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">{t('noLoanRequests')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}