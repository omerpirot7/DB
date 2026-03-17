import { useState } from 'react';
import apiClient from '../api/client';
import { useLanguage } from '../context/LanguageProvider';

export default function Returns() {
  const [formData, setFormData] = useState({ receiptId: '', productId: '', reason: '', condition: 'unopened' });
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiClient.post('/returns', {
        ...formData,
        date: new Date().toISOString(),
        status: 'pending'
      });
      alert(t('returnSubmitted'));
      setFormData({ receiptId: '', productId: '', reason: '', condition: 'unopened' });
    } catch (err) {
      alert(t('returnSubmitError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('processReturn')}</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('receiptId')}</label>
          <input required type="text" value={formData.receiptId} onChange={e => setFormData({...formData, receiptId: e.target.value})} className="w-full border-gray-300 rounded-md border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('productId')}</label>
          <input required type="text" value={formData.productId} onChange={e => setFormData({...formData, productId: e.target.value})} className="w-full border-gray-300 rounded-md border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('condition')}</label>
          <select value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value})} className="w-full border-gray-300 rounded-md border p-2">
            <option value="unopened">{t('unopened')}</option>
            <option value="opened_good">{t('openedGood')}</option>
            <option value="damaged">{t('damaged')}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('reasonForReturn')}</label>
          <textarea required rows="4" value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} className="w-full border-gray-300 rounded-md border p-2"></textarea>
        </div>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          {loading ? t('submitting') : t('submitRequest')}
        </button>
      </form>
    </div>
  );
}