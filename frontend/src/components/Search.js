import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Search({ name, personality, flavor, scent, price, setName, setPersonality, setFlavor, setScent, setPrice }) {
  let history = useHistory();
  const [displayErrorMessage, setDisplay] = useState(false);

  // function tonewURL = (search, categories, score, sizes, maturity) => {
  function createUrl(name, personality, flavor, scent, price) {
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
      let url = "?name=" + encodeURI(name)
        // + "?personality=" + personality.map(p => encodeURIComponent(p) + ",").substring(0, -1)
        + "&personality1=1&personality2=3&personality3=2&personality4=3&personality5=2&personality6=2&personality7=1&personality8=2"
        + "&flavor=" + encodeURI(flavor)
        + "&scent=" + encodeURI(scent)
        + "&price=" + encodeURI(price)

      history.push({
        pathname: "/result/" + url
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    // turn form values to url params
    createUrl(name, personality, flavor, scent, price);
  }

  return (
    <div className="Search">
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="name"> What is your name? </label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Jane Doe" />
        </div>
        <div class="form-group">
          <label for="personality">Incompleted</label>
          <input
            type="text"
            value={personality}
            onChange={(event) => setPersonality(event.target.value)}
            placeholder="personality" />
        </div>
        <div class="form-group">
          <label for="flavor">Describe your favorite drink (can be non-alcoholic)!</label>
          <input
            type="text"
            value={flavor}
            onChange={(event) => setFlavor(event.target.value)}
            placeholder="Really cold coca-cola during the summer..." />
        </div>
        <div class="form-group">
          <label for="scent">Describe your favorite scent</label>
          <input
            type="text"
            value={scent}
            onChange={(event) => setScent(event.target.value)}
            placeholder="Fresh tangerines..." />
        </div>
        <div class="form-group">
          <label for="price">What is the maximum price you would like to pay?</label>
          <input
            type="text"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="$300" />
        </div>
        <div class="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}