import React, { useEffect, useState } from 'react';
import logo from "../styles/logo.jpg"

export default function Landing() {
  return (
    <div className="Landing">
      <a href="/">
        <img className="logo" src={logo} /></a>
      <div className="text">
        <h1>Find your perfect wine match!</h1>
        <p>We recommend optimal wine pairings based on your personality, flavor, and scent preferences.</p>
      </div>
      <div className="footer">
        <p>Sofia Yoon (hy348), Ashley Park (ap764), Junho Kim-Lee (jk2333), Yubin Heo (yh356)</p>
        <a href="https://perfectwinematch-v1.herokuapp.com/">prototype 1</a>
        <a href="https://perfectwinematch-p04.herokuapp.com/">prototype 2</a>
      </div>
    </div>
  );
}