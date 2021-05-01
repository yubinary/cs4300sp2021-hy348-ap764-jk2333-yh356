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
    </div>
  );
}