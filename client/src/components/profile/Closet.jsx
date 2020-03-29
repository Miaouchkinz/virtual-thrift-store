import React from "react";

export default function Closet({ allClothing, userId, userName }) {
  const itemsOfCurrentUser = (clothingList, userIdentity) => {
    let result = null;
    if (clothingList) {
      result = clothingList
        .filter(item => item.user_id === userIdentity)
        .map(item => (
          <div clasName="item_image_container">
            <img
              className="item_image"
              key={item.id}
              src={item.image_url}
              alt={"Clothing item of: " + userName}
            ></img>
          </div>
        ));
    }
    return result;
  };

  return (
    <div>
      <div className="items_of_closet_container">
        {itemsOfCurrentUser(allClothing, userId)}
      </div>
    </div>
  );
}
