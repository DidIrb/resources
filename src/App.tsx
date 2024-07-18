
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider.tsx';
import Router from '@/routes';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
