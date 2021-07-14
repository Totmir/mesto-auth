import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
serviceWorker.unregister()
reportWebVitals()
