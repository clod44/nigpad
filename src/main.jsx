import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react';
import ErrorBoundary from './components/ErrorBoundary.jsx';

createRoot(document.getElementById('root')).render(

    <StrictMode>
        <NextUIProvider>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </NextUIProvider>
    </StrictMode>
)
