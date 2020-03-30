import React, { useState, useEffect } from "react";
import * as posenet from "@tensorflow-models/posenet";

export default function DressingRoom({ itemData }) {
  const [width, setWidth] = useState("");
  const [left, setLeft] = useState("");
  const [top, setTop] = useState("");

  useEffect(() => {
    if (!itemData.itemUrl) return;
    checkLimage();
  }, [itemData.itemUrl]);

  let imageElement = React.createRef();

  const checkLimage = () => {
    if (itemData.itemUrl !== null) {
      posenet
        .load()
        .then(function(net) {
          const pose = net.estimateSinglePose(imageElement.current, {
            flipHorizontal: false
          });
          return pose;
        })
        .then(function(pose) {
          const leftShoulder = pose.keypoints[6].position.x;
          const rightShoulder = pose.keypoints[5].position.x;

          const leftOffsetPercent = itemData.itemLeft;
          const rightOffsetPercent = itemData.itemRight;
          const topOffsetPercent = itemData.itemTop;

          const selectedItem = document.getElementById("selected-item");

          const leftOffset = selectedItem.width * leftOffsetPercent;
          const rightOffset = selectedItem.width * rightOffsetPercent;
          const topOffset = selectedItem.height * topOffsetPercent;

          const leftPos = leftShoulder - leftOffset;
          const rightPos = rightShoulder + rightOffset;
          const width = rightPos - leftPos;

          const topLeftOfShoulder = pose.keypoints[6].position.y;
          const topRightOfShoulder = pose.keypoints[5].position.y;

          const topDistance =
            (topLeftOfShoulder + topRightOfShoulder) / 2 - topOffset;

          setWidth(`${width}px`);
          setLeft(`${leftPos}px`);
          setWidth(`${width}px`);
          setTop(`${topDistance}px`);
        });
    }
  };

  return (
    <div className="images">
      <img
        onClick={checkLimage}
        id="selected-item"
        src={itemData.itemUrl}
        style={{ width, left, top }}
      />
      <img
        ref={imageElement}
        id="person_standing"
        src="./images/person_1.jpg"
      />
    </div>
  );
}
