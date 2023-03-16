import React from 'react';
import "../App.css"

function CheckBtn({handleCheck }) {

  return (
    <input type="checkbox" onClick={() => handleCheck()}></input>
  );
}

export default CheckBtn;
