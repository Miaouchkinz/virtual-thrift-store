import React from "react";

export default function Closet({ allClothing, currentUserId, userName }) {
  const itemsOfCurrentUser = (clothingList, userId) => {
    return clothingList
                    .filter(item => item.user_id === userId)
                    .map(item => (
                      <div key={item.id} className="item_image_container">
                        <img
                          className="item_image"
                          src={item.image_url}
                          alt={"Clothing item of: " + userName}
                        ></img>
                      </div>
                    ));
  };

  return (
    <div>
      <div className="items_of_closet_container">
        {itemsOfCurrentUser(allClothing, currentUserId)}
      </div>
    </div>
  );
}
