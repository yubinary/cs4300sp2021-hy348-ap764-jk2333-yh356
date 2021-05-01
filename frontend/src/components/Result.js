import React, { useEffect, useState } from 'react';
import logo from '../styles/logo.jpg';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Result({ pm, wm }) {
  // const [likedWine, setLikedWine] = useState({});
  const URLParams = new URLSearchParams(window.location.search);
  const [likedWine, setLikedWine] = useState({});
  const [isDisabled, setDisable] = useState(false);
  const [canPost, setCanPost] = useState(false);
  const [newWM, setNewWM] = useState({});

  // setLikedWine(wineDict);

  function displayPM() {
    let result = [];

    if (pm.length > 0) {
      result.push(
        <>
          <p>Based on personality...</p>
          <h3>
            You are <u>{pm[0].top_wine_percent + '%'}</u> match with{' '}
            <i>{pm[0].top_wine}</i>
          </h3>
          <div class='pm top'>
            <div className='pm-intro'>
              <h4 className='score'>{pm[0].score + '%'}</h4>
              <h4>
                <i>{pm[0].wine}</i>
              </h4>
            </div>
            <p>
              Your key similarities with this variety:{' '}
              <b>{pm[0].key_descriptions}</b>
            </p>
            <p>{pm[0].description}</p>
          </div>
        </>
      );
    }
    return result;
  }

  function displayIntro() {
    if (wm.length > 0) {
      return (
        <div className='wine-match-intro'>
          <h5>
            <u>
              We believe these particular {wm[0].top_wine + 's'} will fit your
              taste
            </u>
          </h5>
          <p>
            Not satisfied with your matches? Click like on the wine(s) that you
            like and submit at the bottom, then we will generate new (hopefully
            perfect) matches for you!{' '}
          </p>
        </div>
      );
    }
  }

  function displayLike(wm, i) {
    return (
      <button
        class={
          likedWine[wm[i].doc_id]
            ? 'btn btn-dark w-100'
            : 'btn btn-outline-dark w-100'
        }
        value={wm[i].doc_id}
        onClick={(event) => {
          if (likedWine[event.target.value]) {
            // wineDict[event.target.value] = false;
            // setLikedWine(wineDict);
            setLikedWine({ ...likedWine, [event.target.value]: false });
          } else {
            // wineDict[event.target.value] = true;
            // setLikedWine(wineDict);
            setLikedWine({ ...likedWine, [event.target.value]: true });
          }
        }}
      >
        {likedWine[wm[i].doc_id] ? 'Unlike' : 'Like'}
      </button>
    );
  }
  function displayWMLeft(wines) {
    let result = [];
    if (wines.length > 0) {
      for (let i = 0; i < wines.length; i += 2) {
        result.push(
          <div className='wm'>
            <h5>
              <i>{wines[i].wine}</i>
            </h5>
            <p>{'$' + wines[i].price}</p>
            <p>{wines[i].description}</p>
            {displayLike(wines, i)}
          </div>
        );
      }
    }
    return result;
  }

  function displayWMRight(wines) {
    let result = [];
    if (wines.length > 0) {
      for (let i = 1; i < wines.length; i += 2) {
        result.push(
          <div className='wm'>
            <h5>
              <i>{wines[i].wine}</i>
            </h5>
            <p>{'$' + wines[i].price}</p>
            <p>{wines[i].description}</p>
            {displayLike(wines, i)}
          </div>
        );
      }
    }
    return result;
  }

  function displayPO() {
    let result = [];

    if (pm.length > 0) {
      result.push(
        <>
          <h3>Your other matches...</h3>
        </>
      );
      for (let match of pm.slice(1)) {
        result.push(
          <div className='pm'>
            <div className='pm-intro'>
              <h4 className='score'>{match.score + '%'}</h4>
              <h4>
                <i>{match.wine}</i>
              </h4>
            </div>
            <p>
              Your key similarities with this variety:{' '}
              <b>{match.key_descriptions}</b>
            </p>
            <p>{match.description}</p>
          </div>
        );
      }
    }
    return result;
  }

  function handleSubmit() {
    // console.log('handleSubmit called');
    // let postData = {};
    // let flavor = URLParams.get('flavor');
    // let scent = URLParams.get('scent');
    // let price = URLParams.get('price');
    // postData['flavor'] = flavor;
    // postData['scent'] = scent;
    // postData['price'] = price;
    // postData['wine_match'] = wm;
    // postData['variety'] = pm[0].wine;
    // postData['likedWines'] = likedWine;
    // // if (canPost) {
    // // axios.post(`http://localhost:5000/rocchio`, postData).then(
    // //   (response) => {
    // //     var result = response.data;
    // //     console.log(result);
    // //     setNewWM(result['new_wine_match']);
    // //   },
    // //   (error) => {
    // //     console.log(error);
    // //   }
    // // );
    // // }
    // setCanPost(false);
    // setDisable(true);
  }

  return (
    <div className='Result'>
      <a href='/'>
        <img className='logo' src={logo} />
      </a>
      <div className='personality-match'>{displayPM()}</div>
      {displayIntro()}
      {wm.length > 0 ? (
        <div>
          <div className='wine-match'>
            <div className='col left'>{displayWMLeft(wm)}</div>
            <div className='col right'>{displayWMRight(wm)}</div>
          </div>
          <center>
            <button
              disabled={!isDisabled}
              onClick={handleSubmit()}
              class='btn btn-secondary'
            >
              Click Here for New Matches based on your likes
            </button>
          </center>
          {/* 
          {isDisabled ? ( */}
          <div className='wine-match'>
            <div className='col left'>{displayWMLeft(newWM)}</div>
            <div className='col right'>{displayWMRight(newWM)}</div>
          </div>
          {/* ) : null} */}
          <br></br>
        </div>
      ) : (
        <div className='wine-match'>
          <p>
            Based on your flavor and scent preferences... <br></br>
            <br></br> A surprise to be sure, but a welcome one. It appears that
            no specific bottle of wine is special enough to match your unique
            personality! Take pride in the fact that there is no one like you!
          </p>
        </div>
      )}
      <div className='personality-other'>{displayPO()}</div>
    </div>
  );
}
