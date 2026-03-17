import { LanguageProvider } from './context/LanguageProvider';
import MarketDashboard from './dashboard/MarketDashboard';

function App() {
  return (
    <LanguageProvider>
      <MarketDashboard />
    </LanguageProvider>
  );
}

export default App;