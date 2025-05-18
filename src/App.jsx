import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

import AppRoutes from './routes/AppRouter';

function App() {
  return (
    <Router>
      <AppProvider>
        <Toaster position="top-right" />
        <AppRoutes />
      </AppProvider>
    </Router>
  );
}

export default App;
