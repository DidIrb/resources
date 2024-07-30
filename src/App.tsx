
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider.tsx';
import Router from '@/router/routes';
import { Toaster } from 'sonner';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <Toaster position="top-center" />
    </ThemeProvider>
  );
}

export default App;
