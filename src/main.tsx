import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { MenuAndOffersProvider } from './context/MenuAndOffersContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <MenuAndOffersProvider>
        <App />
      </MenuAndOffersProvider>
    </AuthProvider>
  </StrictMode>,
);
