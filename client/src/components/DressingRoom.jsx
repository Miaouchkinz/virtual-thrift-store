import React, { useState } from "react";
import * as posenet from "@tensorflow-models/posenet";

export default function DressingRoom({ selectedItemForTrying }) {
  const [width, setWidth] = useState("");
  const [left, setLeft] = useState("");
  const [top, setTop] = useState("");

  let imageElement = React.createRef();
  let selectedItem = React.createRef();
  const checkLimage = () => {
    if (selectedItemForTrying.selectedItemUrl !== null) {
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

          const leftShoulder = pose.keypoints[6].position.x;
          const rightShoulder = pose.keypoints[5].position.x;

          const leftOffsetPercent = 0.21;
          const rightOffsetPercent = 0.275;
          const topOffsetPercent = 0.37;

          const leftOffset = selectedItem.current.width * leftOffsetPercent;
          const rightOffset = selectedItem.current.width * rightOffsetPercent;
          const topOffset = selectedItem.current.height * topOffsetPercent;

          const leftPos = leftShoulder - leftOffset;
          const rightPos = rightShoulder + rightOffset;
          const width = rightPos - leftPos;

          const topLeftOfShoulder = pose.keypoints[6].position.y;
          const topRightOfShoulder = pose.keypoints[5].position.y;

          const topDistance =
            (topLeftOfShoulder + topRightOfShoulder) / 2 - topOffset;

          setWidth(`${width}px`);
          setLeft(`${leftPos}px`);
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
        src={selectedItemForTrying.selectedItemUrl}
        width={width}
        style={{ left: left, top: top }}
      />
      <img
        ref={imageElement}
        id="person_standing"
        src="./images/person_1.jpg"
      />
      <button type="button" className="try_button" onClick={checkLimage}>
        {" "}
        TRY ME{" "}
      </button>
    </div>
  );
}
