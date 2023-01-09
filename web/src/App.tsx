import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default';
import { GlobalStyles } from './styles/global';
import { Router } from './routes/Router';
import { CyclesContextProvider } from './contexts/CyclesContext';

export function App() {
   return (
      <ThemeProvider theme={defaultTheme}>
         <BrowserRouter>
            <CyclesContextProvider>
               <Router />
            </CyclesContextProvider>
         </BrowserRouter>
         <GlobalStyles />
      </ThemeProvider>
   );
}
