import React, { useEffect, useState } from 'react';

export default function Result({ pm, wm }) {
  return (
    <div>
      {pm.map(x =>
        <p>
          {x}
        </p>)}
      {wm.map(x =>
        <p>
          {x}
        </p>)}
    </div>
  );
}