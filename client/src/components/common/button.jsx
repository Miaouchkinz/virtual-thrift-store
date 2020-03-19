import React from 'react';

export default function Button({ primary, secondary, fullWidth, onClick, label, type }) {
  let classList = [];
  if (primary) classList.push('primary');
  else if (secondary) classList.push('secondary');

  if (fullWidth) classList.push('full-width')

  return (
    <button className={`btn ${classList.join(' ')}`} type={type} onClick={onClick}>{label}</button>
  );  
};