import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Search({ name, personality, flavor, scent, price, setName, setPersonality, setFlavor, setScent, setPrice }) {
  let history = useHistory();
  const [displayErrorMessage, setDisplay] = useState(false);
  const [page, setPage] = useState(1);

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
      let personalityUrl = "";
      for (const key in personality) {
        personalityUrl += "&" + key + "=" + personality[key];
      }

      let url = "?name=" + encodeURI(name)
        + personalityUrl
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

  function displayRadio(i) {
    return (
      <>
        <div className="scale">
          <p>no</p>
          <p></p>
          <p>neutral</p>
          <p></p>
          <p>yes</p>
        </div>
        <div className="radios">
          <input className="radio" type="radio" name={i} value="1" checked={personality[i] === "1"} onChange={(event) => setPersonality({ ...personality, [i]: event.target.value })} />
          <input className="radio" type="radio" name={i} value="2" checked={personality[i] === "2"} onChange={(event) => setPersonality({ ...personality, [i]: event.target.value })} />
          <input className="radio" type="radio" name={i} value="3" checked={personality[i] === "3"} onChange={(event) => setPersonality({ ...personality, [i]: event.target.value })} />
          <input className="radio" type="radio" name={i} value="4" checked={personality[i] === "4"} onChange={(event) => setPersonality({ ...personality, [i]: event.target.value })} />
          <input className="radio" type="radio" name={i} value="5" checked={personality[i] === "5"} onChange={(event) => setPersonality({ ...personality, [i]: event.target.value })} />
        </div>
      </>
    )
  }

  function displayForm(page) {
    if (page === 1) {
      return (
        <>
          <div class="form-group">
            <label for="name"> What is your name? </label>
            <input name="name" class="form-control" placeholder="Jane Doe" value={name} onChange={(event) => setName(event.target.value)} />
          </div>
          <div class="form-group">
            <label for="flavor">Describe your favorite drink (can be non-alcoholic)!</label>
            <textarea name="flavor" class="form-control" rows="3" value={flavor} onChange={(event) => setFlavor(event.target.value)}
              placeholder="Really cold coca-cola during the summer..." />
          </div>
          <div class="form-group">
            <label for="scent">Describe your favorite scent</label>
            <textarea name="scent" class="form-control" value={scent} onChange={(event) => setScent(event.target.value)}
              placeholder="Fresh tangerines..." />
          </div>
          <div class="form-group">
            <label for="price">What is the maximum price you would like to pay?</label>
            <input name="flavor" class="form-control" value={price} onChange={(event) => setPrice(event.target.value)}
              placeholder="$300"></input>
          </div>
          <div class="form-group">
            <button class="btn btn-outline-dark float-right" onClick={() => setPage(2)}>Next</button>
          </div>
        </>
      )
    } else if (page === 2) {
      return (
        <>
          <p>Rate how well the following statements describe you</p>
          <div class="form-group">
            <label for="personality">You are the life of a party</label>
            {displayRadio("personality1")}
          </div>
          <div class="form-group">
            <label for="personality">People near you often rally around you</label>
            {displayRadio("personality2")}
          </div>
          <div class="form-group">
            <label for="personality">You will do whatever it takes to succeed, no matter what</label>
            {displayRadio("personality3")}
          </div>
          <div class="form-group">
            <label for="personality">Your friends come to you for fashion advice</label>
            {displayRadio("personality4")}
          </div>
          <div class="form-group">
            <button class="btn btn-outline-dark float-left" onClick={() => setPage(1)}>Previous</button>
            <button class="btn btn-outline-dark float-right" onClick={() => setPage(3)}>Next</button>
          </div>
        </>
      )
    } else if (page === 3) {
      return (
        <>
          <div class="form-group">
            <label for="personality">Life is not fair, and that means you have to look out for yourself first and foremost.</label>
            {displayRadio("personality5")}
          </div>
          <div class="form-group">
            <label for="personality">You don't like making a plan because you often end up deviating from it anyways.</label>
            {displayRadio("personality6")}
          </div>
          <div class="form-group">
            <label for="personality">You see many relationships in your life as transactional.</label>
            {displayRadio("personality7")}
          </div>
          <div class="form-group">
            <label for="personality">You have high standards of living, and you'll go the extra mile to attain that.</label>
            {displayRadio("personality8")}
          </div>
          <div class="form-group mb-0">
            <button class="btn btn-outline-dark float-left" onClick={() => setPage(2)}>Previous</button>
            <button type="submit" class="btn btn-dark float-right">Submit</button>
          </div>
        </>
      )
    }
  }

  return (
    <div className="Search">
      <form onSubmit={handleSubmit}>
        {displayForm(page)}
      </form>
    </div >
  );
}