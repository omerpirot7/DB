import { useEffect, useState } from 'react';
import apiClient from '../../api/client';
import ImageUploader from '../../components/ImageUploader';
import { useLanguage } from '../../context/LanguageProvider';

export default function AdminNotesEditor() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await apiClient.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (product) => {
    try {
      await apiClient.put(`/products/${product.id}`, product);
      alert(t('productUpdated'));
    } catch (err) {
      console.error(err);
      alert(t('productUpdateFailed'));
    }
  };

  if (loading) return <div className="py-10">{t('loadingProductsSimple')}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('editProductNotesDescriptions')}</h1>
      <div className="space-y-6">
        {products.map(product => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">{product.name}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('description')}</label>
                <textarea 
                  className="w-full border-gray-300 rounded-md border p-2 focus:ring-indigo-500 focus:border-indigo-500" 
                  rows="3"
                  value={product.description}
                  onChange={e => setProducts(products.map(p => p.id === product.id ? { ...p, description: e.target.value } : p))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('adminNotesInternal')}</label>
                <textarea 
                  className="w-full border-gray-300 rounded-md border p-2 focus:ring-indigo-500 focus:border-indigo-500 bg-yellow-50" 
                  rows="2"
                  value={product.notes || ''}
                  onChange={e => setProducts(products.map(p => p.id === product.id ? { ...p, notes: e.target.value } : p))}
                />
              </div>
              <button 
                onClick={() => updateProduct(product)}
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
              >
                {t('saveChanges')}
              </button>
              
              <div className="pt-4 mt-4 border-t border-gray-200">
                <ImageUploader productId={product.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}