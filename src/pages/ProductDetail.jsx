import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../api/client';
import { useStore } from '../context/StoreProvider';
import { useLanguage } from '../context/LanguageProvider';

function LoanRequestForm({ productId, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const { t } = useLanguage();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newLoan = {
        product_id: productId,
        user_id: `user-${Date.now()}`,
        userName,
        status: "pending",
        request_date: new Date().toISOString(),
        return_date: null
      };
      await apiClient.post('/loans', newLoan);
      setUserName('');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      alert(t('loanSubmitFail'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 border-t border-gray-200 pt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{t('requestToBorrow')}</h3>
      <div className="flex gap-3">
        <input 
          type="text"
          required
          placeholder={t('yourName')}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="flex-1 border-gray-300 rounded-md shadow-sm border p-2 focus:ring-indigo-500 focus:border-indigo-500 max-w-xs"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md disabled:bg-gray-400"
        >
          {loading ? t('submitting') : t('requestLoan')}
        </button>
      </div>
    </form>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const { t } = useLanguage();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const [productRes, imagesRes] = await Promise.all([
          apiClient.get(`/products/${id}`),
          apiClient.get(`/images?product_id=${id}`)
        ]);
        setProduct(productRes.data);
        setImages(imagesRes.data);
        if (imagesRes.data.length > 0) {
          setActiveImage(imagesRes.data[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-10">{t('loadingProductDetails')}</div>;
  if (!product) return <div className="text-center py-10 text-red-500">{t('productNotFound')}</div>;

  return (
    <div className="max-w-5xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
      >
        &larr; {t('back')}
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
        {/* Gallery */}
        <div className="w-full md:w-1/2 p-6 flex flex-col items-center">
          <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
             {activeImage ? (
               <img src={activeImage.url} alt={activeImage.alt_text} className="w-full h-full object-contain bg-gray-50" />
             ) : (
               <div className="w-full h-full flex items-center justify-center text-gray-400">{t('noImage')}</div>
             )}
          </div>
          {images.length > 1 && (
            <div className="flex w-full gap-2 overflow-x-auto pb-2">
              {images.map(img => (
                <button 
                  key={img.id}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 flex-shrink-0 border-2 rounded-md overflow-hidden ${activeImage?.id === img.id ? 'border-indigo-500' : 'border-transparent'}`}
                >
                  <img src={img.url} alt={img.alt_text} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="w-full md:w-1/2 p-6 md:border-l border-gray-200 flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-gray-900 mb-6">${product.price.toFixed(2)}</p>
          
          <div className="prose max-w-none text-gray-600 mb-8">
            <p>{product.description}</p>
          </div>

          <div className="mt-auto">
             <button
                onClick={() => addToCart(product)}
                className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-medium rounded-md shadow-sm transition-colors mb-4"
              >
                {t('addToCart')}
              </button>
              <LoanRequestForm productId={product.id} onSuccess={() => alert(t('loanSubmittedSuccess'))} />
          </div>
        </div>
      </div>
    </div>
  );
}