import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './contexts/authContext';
import { LotteryContextProvider } from './contexts/lotteryContext';
import { SearchContextProvider } from './contexts/searchContext';
import { ThisLotteryDetailContextProvider } from './contexts/thisLotteryDetailContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <LotteryContextProvider>
          <ThisLotteryDetailContextProvider>
            <App />
          </ThisLotteryDetailContextProvider>
        </LotteryContextProvider>
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
