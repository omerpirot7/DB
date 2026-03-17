import { useEffect, useState } from 'react';
import apiClient from '../api/client';
import ProductCard from '../components/ProductCard';
import { useLanguage } from '../context/LanguageProvider';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productsRes, imagesRes] = await Promise.all([
          apiClient.get('/products'),
          apiClient.get('/images')
        ]);
        
        const productsWithImages = productsRes.data.map(p => ({
          ...p,
          images: imagesRes.data.filter(img => img.product_id === p.id)
        }));
        
        setProducts(productsWithImages);
      } catch (err) {
        setError(t('failedFetchProducts'));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-10">{t('loadingProducts')}</div>;
  if (error) return <div className="text-red-500 py-10">{error}</div>;

  return (
    <div>
      <div className="mb-8 rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-[0_12px_30px_-25px_rgba(0,0,0,0.6)]">
        <p className="text-xs font-semibold tracking-[0.25em] text-indigo-700 uppercase mb-2">{t('curatedInventory')}</p>
        <h1 className="text-3xl font-bold text-gray-900">{t('allProducts')}</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}