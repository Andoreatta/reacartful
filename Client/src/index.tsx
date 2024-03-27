import React from 'react';
import ReactDOM from 'react-dom';
import '../src/app/layouts/styles.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore'; // import your store from where it's defined

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
