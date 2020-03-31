import React, { useState } from "react";
import * as posenet from "@tensorflow-models/posenet";

export default function DressingRoom({ selectedItemForTrying }) {
  const [width, setWidth] = useState();
  const [left, setLeft] = useState("");
  const [top, setTop] = useState("");

  let imageElement = React.createRef();
  let selectedItem = React.createRef();
  const checkLimage = () => {
    if (selectedItemForTrying.itemUrl !== null) {
      posenet
        .load()
        .then(function(net) {
          const pose = net.estimateSinglePose(imageElement.current, {
            flipHorizontal: false
          });
          return pose;
        })
        .then(function(pose) {
          console.log(pose);

          const leftShoulder = pose.keypoints[6].position.x; // 152
          const rightShoulder = pose.keypoints[5].position.x; // 272

          const leftOffsetPercent = Number(selectedItemForTrying.itemLeft); // 0.26
          const rightOffsetPercent = Number(selectedItemForTrying.itemRight); // 0.29
          const topOffsetPercent = Number(selectedItemForTrying.itemTop); // 0.14

          const leftOffset = selectedItem.current.width * leftOffsetPercent; // 500 * 0.26 = 130 ??
          const rightOffset = selectedItem.current.width * rightOffsetPercent; // 500 * 0.29 = 145 ??
          const topOffset = selectedItem.current.height * topOffsetPercent; // 500 * 0.14 = 70

          const spaceBetweenShouldersItem =
            selectedItem.current.width - leftOffset - rightOffset; // 500 - 130 - 145 = 225
          console.log(spaceBetweenShouldersItem);
          const spaceBetweenShouldersModel = rightShoulder - leftShoulder; // 272 - 152 = 120
          console.log(spaceBetweenShouldersModel);

          const scalingRatio =
            spaceBetweenShouldersItem / spaceBetweenShouldersModel; // 1.875

          console.log(scalingRatio);
          // const width = rightPos - leftPos; // 417 - 22 = 395
          const width = selectedItem.current.width / scalingRatio; // 500 / 1.875 = 266.66px
          console.log(width);
          const distBetweenLeftAndLeftShoulderOfItem =
            width * leftOffsetPercent; // 70px
          console.log(distBetweenLeftAndLeftShoulderOfItem);
          //This is what we call Apalachian Case

          const leftOffsetOfItemOnModel =
            leftShoulder - distBetweenLeftAndLeftShoulderOfItem;
          console.log(leftOffsetOfItemOnModel);
          // const leftPos = leftShoulder - leftOffset; // 152 - 130 = 22
          // const rightPos = rightShoulder + rightOffset; // 272 + 145 = 417

          const topLeftOfShoulder = pose.keypoints[6].position.y;
          const topRightOfShoulder = pose.keypoints[5].position.y;

          // const topDistance = (topLeftOfShoulder + topRightOfShoulder) / 2 - topOffset;
          const topDistance = topLeftOfShoulder - width * topOffsetPercent;

          setWidth(`${width}px`);
          setLeft(`${leftOffsetOfItemOnModel}px`);
          setTop(`${topDistance}px`);
        });
    }
  };

  return (
    <div className="images">
      <img
        onClick={checkLimage}
        ref={selectedItem}
        className="trying_item"
        position="absolute"
        src={selectedItemForTrying.itemUrl}
        width={width}
        style={{ left: left, top: top }}
      />
      <img
        ref={imageElement}
        id="person_standing"
        src="./images/person_1.jpg"
      />
    </div>
  );
}
