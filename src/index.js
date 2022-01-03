import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import reportWebVitals from './reportWebVitals';
import {store, persistor} from './store/store'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";
import {PersistGate} from "redux-persist/integration/react";

export const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
          <Provider store={store}>
              <PersistGate persistor={persistor}>
                <App/>
              </PersistGate>
          </Provider>
      </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
