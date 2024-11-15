import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './reducers/rootReducer'; 


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

function RootComponent() {

  return (
    <Provider store={store}> 
      <PersistGate loading={null} persistor={persistor}> 
          <App />
      </PersistGate>
    </Provider>
  );
}

root.render(<RootComponent />);

reportWebVitals();
