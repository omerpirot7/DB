import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreProvider';
import { LanguageProvider } from './context/LanguageProvider';
import Layout from './components/Layout';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Returns from './pages/Returns';
import AdminDashboard from './pages/admin/AdminDashboard';
import ReportsDashboard from './pages/admin/ReportsDashboard';
import LoanAdminPanel from './pages/admin/LoanAdminPanel';
import AdminNotesEditor from './pages/admin/AdminNotesEditor';

function App() {
  return (
    <LanguageProvider>
      <StoreProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<ProductList />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="returns" element={<Returns />} />

              {/* Admin Routes */}
              <Route path="admin">
                <Route index element={<AdminDashboard />} />
                <Route path="reports" element={<ReportsDashboard />} />
                <Route path="loans" element={<LoanAdminPanel />} />
                <Route path="notes" element={<AdminNotesEditor />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </LanguageProvider>
  )
}

export default App;