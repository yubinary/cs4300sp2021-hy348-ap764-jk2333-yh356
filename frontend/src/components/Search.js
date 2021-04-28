import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Search() {
  const [name, setName] = useState('');
  const [personality, setPersonality] = useState('');
  const [flavor, setFlavor] = useState('');
  const [scent, setScent] = useState('');
  const [price, setPrice] = useState('');

  let history = useHistory();
  const [displayErrorMessage, setDisplay] = useState(false);

  // function tonewURL = (search, categories, score, sizes, maturity) => {
  function newURL(name, personality, flavor, scent, price) {
    const params = new URLSearchParams()

    // check for empty inputs
    const nameEmpty = name === null || name === ""
    const perEmpty = personality === null || personality === ""
    // const perEmpty = personality === null || personality.length === 0
    const flavorEmpty = flavor === null || flavor === ""
    const scentEmpty = scent === null || scent === ""
    const priceEmpty = price === null || price === ""

    if ((nameEmpty && perEmpty && flavorEmpty && scentEmpty && priceEmpty)) {
      setDisplay(true);
    }
    else {
      let url = "?name=" + encodeURIComponent(name)
        // + "?personality=" + personality.map(p => encodeURIComponent(p) + ",").substring(0, -1)
        + "&personality1=1&personality2=3&personality3=2&personality4=3&personality5=2&personality6=2&personality7=1&personality8=2"
        + "&flavor=" + encodeURIComponent(flavor)
        + "&scent=" + encodeURIComponent(scent)
        + "&price=" + encodeURIComponent(price)

      history.push({
        pathname: "/result/" + url
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    // turn form values to url params
    newURL(name, personality, flavor, scent, price);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="John Doe" />
        <input
          type="text"
          value={personality}
          onChange={(event) => setPersonality(event.target.value)}
          placeholder="Personality example" />
        <input
          type="text"
          value={flavor}
          onChange={(event) => setFlavor(event.target.value)}
          placeholder="Flavor example" />
        <input
          type="text"
          value={scent}
          onChange={(event) => setScent(event.target.value)}
          placeholder="Scent example" />
        <input
          type="text"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          placeholder="$300" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}