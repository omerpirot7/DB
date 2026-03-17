import { useEffect, useState, useMemo } from 'react';
import apiClient from '../../api/client';
import { useLanguage } from '../../context/LanguageProvider';

export default function ReportsDashboard() {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get('/receipts');
        setReceipts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = useMemo(() => {
    let revenue = 0;
    let tax = 0;
    const itemSales = {};

    receipts.forEach(r => {
      revenue += r.total;
      tax += r.tax;
      r.line_items.forEach(item => {
        if (!itemSales[item.name]) {
          itemSales[item.name] = { quantity: 0, revenue: 0 };
        }
        itemSales[item.name].quantity += item.quantity;
        itemSales[item.name].revenue += (item.price * item.quantity);
      });
    });

    const salesArray = Object.entries(itemSales).map(([name, data]) => ({
      name,
      ...data
    })).sort((a, b) => b.quantity - a.quantity);

    return {
      revenue,
      tax,
      totalOrders: receipts.length,
      topSellers: salesArray.slice(0, 3),
      lowestSellers: salesArray.slice(-3).reverse()
    };
  }, [receipts]);

  if (loading) return <div className="text-center py-10">{t('loadingReports')}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('reportsDashboard')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">{t('totalRevenue')}</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">${stats.revenue.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">{t('totalTaxCollected')}</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">${stats.tax.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-gray-500 text-sm font-medium">{t('totalOrders')}</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalOrders}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">{t('topSellingProducts')}</h2>
          <ul className="divide-y divide-gray-200">
            {stats.topSellers.map((item, i) => (
              <li key={i} className="py-3 flex justify-between">
                <span>{item.name}</span>
                <span className="font-medium">{item.quantity} {t('sold')}</span>
              </li>
            ))}
            {stats.topSellers.length === 0 && <li className="py-3 text-gray-500">{t('noDataAvailable')}</li>}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">{t('lowestSellingProducts')}</h2>
          <ul className="divide-y divide-gray-200">
            {stats.lowestSellers.map((item, i) => (
              <li key={i} className="py-3 flex justify-between">
                <span>{item.name}</span>
                <span className="font-medium">{item.quantity} {t('sold')}</span>
              </li>
            ))}
             {stats.lowestSellers.length === 0 && <li className="py-3 text-gray-500">{t('noDataAvailable')}</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}