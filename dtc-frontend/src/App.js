import React from 'react';
import BusList from './components/BusList';
import RouteMap from './components/RouteMap';

function App() {
  return (
    <div className="App">
      <h1>Automated Bus Scheduling and Route Management System</h1>
      <BusList />
      <RouteMap />
    </div>
  );
}

export default App;
