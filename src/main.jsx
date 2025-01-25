import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'

import { Provider } from 'react-redux'
import store from './redux/store.js'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { AuthProvider } from './context/AuthContext.jsx'

const client = new ApolloClient({
  uri: `${import.meta.env.VITE_DJANGO_BE}/graphql/`,
  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>,
)
