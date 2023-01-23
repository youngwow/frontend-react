import React from 'react';
import './App.css';
import { Route, Routes} from 'react-router-dom'
import {BrokersPage} from "./pages/BrokersPage";
import {Navigation} from "./components/Navigation";
import {StocksPage} from "./pages/StocksPage";
import {SettingsPage} from "./pages/SettingsPage";

function App() {
  return (
      <>
          <Navigation></Navigation>
          <Routes>
              <Route path="/brokers" element={ <BrokersPage />}></Route>
              <Route path="/stocks" element={ <StocksPage />}></Route>
              <Route path="/settings" element={ <SettingsPage />}></Route>
          </Routes>
      </>
  );
}

export default App;
