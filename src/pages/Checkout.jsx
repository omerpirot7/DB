import { useState, useMemo } from 'react';
import { useStore } from '../context/StoreProvider';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';
import { useLanguage } from '../context/LanguageProvider';

export default function Checkout() {
  const { cart, removeFromCart, clearCart } = useStore();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0); // flat amount or percentage could be used. Let's use simple logic.
  const [loading, setLoading] = useState(false);

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cart]);

  const applyDiscount = () => {
    // Mock simple discount logic
    if (discountCode.toUpperCase() === '10OFF') {
      setDiscountApplied(10);
    } else if (discountCode.toUpperCase() === 'SUMMER20') {
      setDiscountApplied(20);
    } else {
      alert(t('invalidCode'));
      setDiscountApplied(0);
    }
  };

  const tax = (subtotal - discountApplied) * 0.09;
  const total = Math.max(0, subtotal - discountApplied + tax);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setLoading(true);

    const receipt = {
      id: Date.now().toString(),
      total,
      tax,
      date: new Date().toISOString(),
      line_items: cart.map(item => ({
        product_id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        discount: discountApplied > 0 ? (discountApplied / cart.length).toFixed(2) : 0
      }))
    };

    try {
      await apiClient.post('/receipts', receipt);
      clearCart();
      alert(t('checkoutSuccess'));
      navigate('/');
    } catch (err) {
      console.error(err);
      alert(t('checkoutFailed'));
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">{t('yourCartEmpty')}</h2>
        <button onClick={() => navigate('/')} className="text-indigo-600 hover:text-indigo-800">{t('browseProducts')}</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('checkout')}</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{t('orderSummary')}</h2>
        <ul className="divide-y divide-gray-200">
          {cart.map(item => (
            <li key={item.id} className="py-4 flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">{t('qty')}: {item.quantity} x ${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-sm">{t('remove')}</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-end gap-4 mb-6 pb-6 border-b border-gray-200">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('discountCode')}</label>
            <input 
              type="text" 
              value={discountCode}
              onChange={e => setDiscountCode(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm border p-2 focus:ring-indigo-500 focus:border-indigo-500" 
              placeholder="e.g. 10OFF"
            />
          </div>
          <button 
            onClick={applyDiscount}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            {t('apply')}
          </button>
        </div>

        <div className="space-y-3 mb-6 text-gray-700">
          <div className="flex justify-between">
            <span>{t('subtotal')}</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {discountApplied > 0 && (
            <div className="flex justify-between text-green-600">
              <span>{t('discount')}</span>
              <span>-${discountApplied.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>{t('tax9')}</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
            <span>{t('total')}</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button 
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-indigo-600 text-white rounded-md py-3 font-semibold hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? t('processing') : t('completePurchase')}
        </button>
      </div>
    </div>
  );
}