import React from 'react';

export default function Icon(props) {
  const { 
    primary,
    secondary,
    selected,
    onClick,
    large,
    icon,
    label,
    type } = props
  
  let classList = [];
  if (primary) classList.push('primary');
  else if (secondary) classList.push('secondary');

  if (large) classList.push('large')
  if (selected) classList.push('selected');

  const content = icon ? <img src={`/images/${icon}.png`} alt={`${icon} button`} /> : label;

  return (
    <button className={`icon-btn ${classList.join(' ')}`} type={type} onClick={onClick}>{content}</button>
  );  
};