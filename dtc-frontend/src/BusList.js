import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BusList = () => {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    axios.get('/api/buses')
      .then(response => setBuses(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Bus List</h2>
      <ul>
        {buses.map(bus => (
          <li key={bus._id}>{bus.busNumber} - {bus.dutyType}</li>
        ))}
      </ul>
    </div>
  );
};

export default BusList;
