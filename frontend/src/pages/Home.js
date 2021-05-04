import React, { useEffect, useState } from 'react';
import Landing from '../components/Landing.js';
import Search from '../components/Search.js';
import '../styles/App.css';

export default function Home() {
  const [name, setName] = useState('');
  const [personality, setPersonality] = useState({
    personality1: '',
    personality2: '',
    personality3: '',
    personality4: '',
    personality5: '',
    personality6: '',
    personality7: '',
    personality8: '',
  });
  const [flavor, setFlavor] = useState('');
  const [scent, setScent] = useState('');
  const [price, setPrice] = useState('');

  return (
    <div className='Home'>
      <Landing />
      <Search
        name={name}
        personality={personality}
        flavor={flavor}
        scent={scent}
        price={price}
        setName={setName}
        setPersonality={setPersonality}
        setFlavor={setFlavor}
        setScent={setScent}
        setPrice={setPrice}
      />
    </div>
  );
}
