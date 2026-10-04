import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Theme } from '@radix-ui/themes'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-700.css'
import '@radix-ui/themes/styles.css'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme appearance="light" accentColor="indigo" grayColor="slate" radius="large" scaling="100%">
      <App />
    </Theme>
  </StrictMode>,
)
