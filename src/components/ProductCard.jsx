import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreProvider';
import { useLanguage } from '../context/LanguageProvider';

export default function ProductCard({ product }) {
  const { addToCart } = useStore();
  const { t } = useLanguage();

  return (
    <div className="bg-white/90 rounded-2xl border border-gray-200 shadow-[0_12px_28px_-22px_rgba(0,0,0,0.55)] overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-1">
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img 
            src={product.images[0].url} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            {t('noImage')}
          </div>
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <div className="space-x-2 flex">
             <Link 
              to={`/product/${product.id}`}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md transition-colors"
            >
              {t('details')}
            </Link>
            <button
              onClick={() => addToCart(product)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors"
            >
              {t('add')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}