import React, { useEffect, useState } from 'react';
import Landing from './components/Landing.js';
import Search from './components/Search.js';

import './styles/App.css';

export default function App() {
  return (
    <div>
      <Landing />
      <Search />
    </div>
  );
}
