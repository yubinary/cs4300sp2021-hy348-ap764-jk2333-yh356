import React, { useEffect, useState } from 'react';
import Landing from "./components/Landing.js";
import Result from "./components/Result.js";
import Search from "./components/Search.js";
import axios from 'axios';
import "./styles/App.css";

export default function App() {
  const [name, setName] = useState('');
  const [personality, setPersonality] = useState([]);
  const [flavor, setFlavor] = useState('');
  const [scent, setScent] = useState('');
  const [price, setPrice] = useState('');

  const [PM, setPM] = useState([]);
  const [WM, setWM] = useState([]);

  function fetchResults() {
    const URLParams = new URLSearchParams(window.location.search);
    setName(URLParams.get("name"));
    setPersonality(URLParams.getAll("personality"));
    setFlavor(URLParams.get("flavor"));
    setScent(URLParams.get("scent"));
    setPrice(URLParams.get("price"));

    axios({
      method: 'GET',
      url: `http://localhost:5000/search`,
      params: URLParams
    })
      .then((response) => {
        console.log(response);
        setPM(response.data.personality_match);
        setWM(response.data.wine_match);
      })
      .catch(err =>
        console.log(err)
      );
  }

  function handleSubmit() {
    fetchResults()
  }

  return (
    <div>
      <Landing />
      <Result pm={PM} wm={WM} />

      <Search />
      <button onClick={() => { handleSubmit() }}>Submit</button>

    </div>
  );
}
