import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Search from '../components/Search.js';
import Result from '../components/Result.js';
import '../styles/App.css';

export default function ResultPage() {
  const URLParams = new URLSearchParams(window.location.search);
  const [personality, setPersonality] = useState({});
  const [flavor, setFlavor] = useState('');
  const [scent, setScent] = useState('');
  const [price, setPrice] = useState('');
  const [PM, setPM] = useState([]);
  const [WM, setWM] = useState([]);
  const [LS, setLS] = useState({});
  const [newWM, setNewWM] = useState({});
  const [likedWine, setLikedWine] = useState({});

  useEffect(() => {
    let obj = {}
    for (let i = 1; i <= 8; i++) {
      obj["personality" + i] = URLParams.get("personality" + i);
    }
    setPersonality(obj);
    setFlavor(URLParams.get('flavor'));
    setScent(URLParams.get('scent'));
    setPrice(URLParams.get('price'));

    axios({
      method: 'GET',
      url: `/api/search`,
      // url: `http://localhost:5000/search`,
      params: URLParams,
    })
      .then((response) => {
        setPM(response.data.personality_match);
        setWM(response.data.wine_match);
        setLS(response.data.legend_score);
      })
      .catch((err) => console.log(err));
  }, [window.location.search]);

  return (
    <div className='ResultPage'>
      <Result
        pm={PM}
        wm={WM}
        ls={LS}
        newWM={newWM}
        setNewWM={setNewWM}
        likedWine={likedWine}
        setLikedWine={setLikedWine}
      />
      <Search
        personality={personality}
        flavor={flavor}
        scent={scent}
        price={price}
        newWM={newWM}
        likedWine={likedWine}
        setPersonality={setPersonality}
        setFlavor={setFlavor}
        setScent={setScent}
        setPrice={setPrice}
        setNewWM={setNewWM}
        setLikedWine={setLikedWine}
      />
    </div>
  );
}
