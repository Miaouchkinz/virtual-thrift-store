import React, { useState, useEffect } from "react";
import * as posenet from "@tensorflow-models/posenet";

export default function DressingRoom({ selectedItemForTrying }) {
  const [width, setWidth] = useState("");
  const [left, setLeft] = useState("");
  const [top, setTop] = useState("");

  let modelStanding = React.createRef();
  let selectedItem = React.createRef();

  useEffect(() => {
    activateTrying();
  }, [selectedItemForTrying.itemUrl]);

  const activateTrying = () => {
    if (selectedItemForTrying.itemUrl !== null) {
      posenet
        .load()
        .then(function(net) {
          const pose = net.estimateSinglePose(modelStanding.current, {
            flipHorizontal: false
          });
          return pose;
        })
        .then(function(pose) {
          console.log(pose);

          const leftShoulder = pose.keypoints[6].position.x;
          const rightShoulder = pose.keypoints[5].position.x;

          const leftOffsetPercent = selectedItemForTrying.itemLeft;
          const rightOffsetPercent = selectedItemForTrying.itemRight;
          const topOffsetPercent = selectedItemForTrying.itemTop;

          const leftOffset = selectedItem.current.width * leftOffsetPercent;
          const rightOffset = selectedItem.current.width * rightOffsetPercent;
          // const topOffset = selectedItem.current.height * topOffsetPercent;

          const distBetweenShoulderItem =
            selectedItem.current.width - leftOffset - rightOffset;

          const distBetweenShoulderModel = rightShoulder - leftShoulder;

          const scalingRatio =
            distBetweenShoulderItem / distBetweenShoulderModel;

          const width = selectedItem.current.width / scalingRatio;
          const distBetweenLeftAndLeftShoulderOfItem =
            width * leftOffsetPercent;

          const leftOffsetOfItemOnModel =
            leftShoulder - distBetweenLeftAndLeftShoulderOfItem;

          const topLeftOfShoulder = pose.keypoints[6].position.y;
          // const topRightOfShoulder = pose.keypoints[5].position.y;

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
        ref={selectedItem}
        className="trying_item"
        position="absolute"
        src={selectedItemForTrying.itemUrl}
        width={width}
        style={{ left: left, top: top }}
      />
      <img
        ref={modelStanding}
        id="person_standing"
        src="./images/ariana_standing.jpg"
      />
    </div>
  );
}
