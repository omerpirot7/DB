import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageProvider';

export default function AdminDashboard() {
  const { t } = useLanguage();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('adminDashboard')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">{t('loanManagement')}</h2>
          <p className="text-gray-600 mb-4">{t('loanManagementDesc')}</p>
          <Link to="/admin/loans" className="text-indigo-600 font-medium hover:underline">{t('manageLoans')} &rarr;</Link>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">{t('reportsReceipts')}</h2>
          <p className="text-gray-600 mb-4">{t('reportsReceiptsDesc')}</p>
          <Link to="/admin/reports" className="text-indigo-600 font-medium hover:underline">{t('viewReports')} &rarr;</Link>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">{t('productNotesInfo')}</h2>
          <p className="text-gray-600 mb-4">{t('productNotesInfoDesc')}</p>
          <Link to="/admin/notes" className="text-indigo-600 font-medium hover:underline">{t('editNotes')} &rarr;</Link>
        </div>

      </div>
    </div>
  );
}