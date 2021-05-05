import React, { useEffect, useState } from 'react';
import logo from '../styles/logo.jpg';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import wine from "../styles/wine.png";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

export default function Result({ pm, wm, ls, newWM, setNewWM, likedWine, setLikedWine }) {
  const URLParams = new URLSearchParams(window.location.search);
  const [isDisabled, setDisable] = useState(false);
  // const [canPost, setCanPost] = useState(false);

  useEffect(() => {
    if (Object.keys(newWM).length === 0) {
      setDisable(false);
    }
  }, [newWM]);

  function displayTraitTags(tags) {
    let result = [];

    for (let tag of tags) {
      result.push(
        <div className="trait-tag">
          <p>{tag}</p>
        </div>
      )
    }
    return result;
  }
  function displayPM() {
    let result = [];

    if (pm.length > 0) {
      result.push(
        <>
          <p className="title">Based on your personality...</p>
          <div className='pm'>
            <div className='pm-intro'>
              <img src={wine} />
              <div className="pm-intro-info">
                <p>best match</p>
                <h4>{pm[0].score + '%'}</h4>
                <p>wine</p>
                <h4 className="bottom">{pm[0].wine}</h4>
              </div>
            </div>
            <div className="pm-body">
              <div className="trait">
                <p>Key Similarities:</p>
                {displayTraitTags(pm[0].key_descriptions)}
              </div>
              <p>{pm[0].description}</p>
              {/* <div className="RadarChart">
              <RadarChart wine={ls[pm[0].wine]} />
            </div> */}
            </div>
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
          <p className="title">
            These particular <span>{wm[0].top_wine + 's'}</span> will fit your
              taste!
          </p>
          <p>
            Not satisfied with your matches? Like the wine(s), then we will generate new matches for you.{' '}
          </p>
        </div >
      );
    }
  }

  function displayLike(wm, i) {
    if (likedWine[wm[i].doc_id]) {
      return (
        <div onClick={() => setLikedWine({ ...likedWine, [wm[i].doc_id]: false })}>
          <AiFillHeart class="like-button" />
        </div>
      );
    } else {
      return (
        <div onClick={() => setLikedWine({ ...likedWine, [wm[i].doc_id]: true })}>
          <AiOutlineHeart class="like-button" />
        </div>
      )
    }

  }

  function displayWM(wines, start) {
    let result = [];
    if (wines.length > 0) {
      for (let i = start; i < wines.length; i += 2) {
        result.push(
          <div className='wm'>
            <div className="wm-intro">
              <h5>{wines[i].wine}</h5>
              <div className="wm-intro-info">
                <p>{'$' + wines[i].price}, {wines[i].score}% Match</p>
                {displayLike(wines, i)}
              </div>
            </div>
            <div className="wm-body">
              <p>{wines[i].description}</p>
            </div>
          </div>
        );
      }
    }
    return result;
  }

  function newDisplayWM(wines, start) {
    let result = [];
    if (wines.length > 0) {
      for (let i = start; i < wines.length; i += 2) {
        result.push(
          <div className='wm'>
            <div className="wm-intro">
              <h5>{wines[i].wine}</h5>
              <div className="wm-intro-info">
                <p>{'$' + wines[i].price}</p>
              </div>
            </div>
            <div className="wm-body">
              <p>{wines[i].description}</p>
            </div>
          </div>
        );
      }
    }
    return result;
  }

  function displayPO() {
    let result = [];
    if (pm.length > 0) {
      for (let match of pm.slice(1)) {
        result.push(
          <>
            <div className='pm'>
              <div className='pm-intro'>
                <img src={wine} />
                <div className="pm-intro-info">
                  <p>match</p>
                  <h4>{match.score + '%'}</h4>
                  <p>wine</p>
                  <h4 className="bottom">{match.wine}</h4>
                </div>
              </div>
              <div className="pm-body">
                <div className="trait">
                  <p>Key Similarities:</p>
                  {displayTraitTags(pm[0].key_descriptions)}
                </div>
                <p>{pm[0].description}</p>
                {/* <div className="RadarChart">
           <RadarChart wine={ls[pm[0].wine]} />
         </div> */}
              </div>
            </div>
          </>
        );
      }
    }
    return result;
  }

  function displayNewMatch() {
    if (isDisabled) {
      return (
        <div className="wine-new-match">
          <p className="title">Here are your new matches!</p>
          <div className='wine-match'>
            <div className='col left'>{newDisplayWM(newWM, 0)}</div>
            <div className='col right'>{newDisplayWM(newWM, 1)}</div>
          </div>
        </div>
      )
    } else {
      return (
        <center>
          <button
            disabled={isDisabled}
            onClick={() => handleSubmit()}
            class='btn btn-dark new-button'>
            Generate New Matches!
        </button>
        </center>
      );
    }
  }

  function handleSubmit() {
    setDisable(true);
    let postData = {};
    let flavor = URLParams.get('flavor');
    let scent = URLParams.get('scent');
    let price = URLParams.get('price');
    postData['flavor'] = flavor;
    postData['scent'] = scent;
    postData['price'] = price;
    postData['wine_match'] = wm;
    postData['variety'] = pm[0].wine;
    postData['likedWines'] = likedWine;
    // if (canPost) {
    axios.post(`/api/rocchio`, postData).then(
      (response) => {
        var result = response.data;
        setNewWM(result['new_wine_match']);
      },
      (error) => {
        console.log(error);
      }
    );
    // }
    // setCanPost(false);
  }

  return (
    <div className='Result'>
      <a href='/'>
        <img className='logo' src={logo} />
      </a>
      <div className='personality-match'>{displayPM()}</div>
      {displayIntro()}
      {wm.length > 0 ? (
        <>
          <div className='wine-match'>
            <div className='col left'>{displayWM(wm, 0)}</div>
            <div className='col right'>{displayWM(wm, 1)}</div>
          </div>
          {displayNewMatch()}
        </>

      ) : (
          <div className='wine-no-result'>
            <p className="title">
              Based on your flavor and scent preferences...
            </p>
            <p>
              A surprise to be sure, but a welcome one. It appears that
              no specific bottle of wine is special enough to match your unique
              flavor and scent preferences! Take pride in the fact that there is
              no one like you!
          </p>
          </div>
        )}
      <div className='personality-other'>
        <p className="title">Your other matches...</p>
        {displayPO()}
      </div>
    </div>
  );
}
