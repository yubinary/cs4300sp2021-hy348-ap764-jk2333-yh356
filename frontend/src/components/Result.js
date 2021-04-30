import React, { useEffect, useState } from 'react';
import logo from "../styles/logo.jpg"

export default function Result({ pm, wm }) {
  function displayPM() {
    let result = [];

    if (pm.length > 0) {
      result.push(
        <>
          <p>Based on personality...</p>
          <h3>You are <u>{pm[0].top_wine_percent + "%"}</u> match with <i>{pm[0].top_wine}</i></h3>
          <div class="pm top">
            <div className="pm-intro">
              <h4 className="score">{pm[0].score + "%"}</h4>
              <h4><i>{pm[0].wine}</i></h4>
            </div>
            <p>{pm[0].description}</p>
          </div>
        </>
      )
    }
    return result;
  }

  function displayIntro() {
    if (wm.length > 0) {
      return (
        <p className="wine-match-intro">
          We believe these particular {wm[0].top_wine + "s"} will fit your taste
        </p>
      )
    }
  }

  function displayWMLeft() {
    let result = [];
    if (wm.length > 0) {
      for (let i = 0; i < wm.length; i += 2) {
        result.push(
          <div class="wm">
            <h5><i>{wm[i].wine}</i></h5>
            <p>{"$" + wm[i].price}</p>
            <p>{wm[i].description}</p>
          </div>
        )
      }
    }
    return result;
  }

  function displayWMRight() {
    let result = [];
    if (wm.length > 0) {
      for (let i = 1; i < wm.length; i += 2) {
        result.push(
          <div class="wm">
            <h5><i>{wm[i].wine}</i></h5>
            <p>{"$" + wm[i].price}</p>
            <p>{wm[i].description}</p>
          </div>
        )
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
      )
      for (let match of pm.slice(1)) {
        result.push(
          <div class="pm">
            <div className="pm-intro">
              <h4 className="score">{match.score + "%"}</h4>
              <h4><i>{match.wine}</i></h4>
            </div>
            <p>{match.description}</p>
          </div>
        )
      }
    }
    return result;
  }

  return (
    <div className="Result">
      <a href="/">
        <img className="logo" src={logo} /></a>
      <div className="personality-match">
        {displayPM()}
      </div>
      {displayIntro()}
      <div className="wine-match">
        <div className="col left">
          {displayWMLeft()}
        </div>
        <div className="col right">
          {displayWMRight()}
        </div>
      </div>
      <div className="personality-other">
        {displayPO()}
      </div>
    </div>
  );
}