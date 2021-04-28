import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Search from "../components/Search.js";
import Result from "../components/Result.js";
import "../styles/App.css";

export default function ResultPage() {
  const URLParams = new URLSearchParams(window.location.search);
  const [name, setName] = useState('');
  const [personality, setPersonality] = useState("");
  const [flavor, setFlavor] = useState('');
  const [scent, setScent] = useState('');
  const [price, setPrice] = useState('');
  const [PM, setPM] = useState([]);
  const [WM, setWM] = useState([]);

  useEffect(() => {
    setName(URLParams.get("name"));
    // setPersonality(URLParams.get("personality"));
    setFlavor(URLParams.get("flavor"));
    setScent(URLParams.get("scent"));
    setPrice(URLParams.get("price"));

    axios({
      method: 'GET',
      url: `http://localhost:5000/search`,
      params: URLParams
    })
      .then((response) => {
        setPM(response.data.personality_match);
        setWM(response.data.wine_match);
      })
      .catch(err =>
        console.log(err)
      );
  }, [window.location.search])

  return (
    <div className="ResultPage">
      <Search
        name={name} personality={personality} flavor={flavor} scent={scent} price={price}
        setName={setName} setPersonality={setPersonality} setFlavor={setFlavor} setScent={setScent} setPrice={setPrice}
      />
      <Result pm={PM} wm={WM} />
    </div>
  );
}
