import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Show = ({all}) => {
  // const [all, setAll] = useState([]);


  return (
    <div>
      {all.length === 0 ? (
        <p>Nothing in this ~</p>
      ) : (
        all.map((mes, index) => (
          <div key={index}>{mes.message}</div>
        ))
      )}
    </div>
  );
};

export default Show;
