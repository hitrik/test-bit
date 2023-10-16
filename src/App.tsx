import React from 'react';
import {TableContainer} from "./containers/TableContainerComponent";
import {Provider} from "react-redux";
import store from './store';
import './App.css';

function App() {
  return (
      <Provider store={store}>
        <div className="App">
          <TableContainer />
        </div>
      </Provider>
  );
}

export default App;
