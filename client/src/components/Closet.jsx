import React from "react";

export default function Closet({ allClothing, userId }) {
  const itemsOfCurrentUser = allClothing
    .filter(item => item.user_id === userId)
    .map(item => <div>TEST 1-2!!!{item.user_id}</div>);
  console.log("ETAT DU STATE:", allClothing);
  return (
    <div>
      <h1>This is Closet</h1>
      {itemsOfCurrentUser}
    </div>
  );
}
