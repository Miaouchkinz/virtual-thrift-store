import React, { useState } from "react";
import * as posenet from "@tensorflow-models/posenet";

export default function DressingRoom({ selectedItemForTrying }) {
  const [width, setWidth] = useState("");
  const [left, setLeft] = useState("");
  const [top, setTop] = useState("");

  let imageElement = React.createRef();
  let selectedShirt = React.createRef();
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

          const leftOffset = selectedShirt.current.width * leftOffsetPercent;
          const rightOffset = selectedShirt.current.width * rightOffsetPercent;
          const topOffset = selectedShirt.current.height * 0.37;

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
        ref={selectedShirt}
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
      <button onClick={checkLimage}> TRY ME </button>
    </div>
  );
}

// const getImage = elem => {
//   let imageElement = elem;
//   return imageElement;
// };

// const pose = estimatePoseOnImage(imageElement.current);

// const checkLimage = () => {
//   posenet.load().then(function(net) {
//     const pose = estimatePoseOnImage(imageElement.current, {
//       flipHorizontal: false
//     });
//     pose.then(res => res);
//     console.log(pose);
//     return pose;
//   });

//   // pose.then(res => console.log(res));
// };

// let imgElement = imageElement.current;
// posenet
//   .load()
//   .then(function(net) {
//     const pose = net.estimateSinglePose(imgElement, {
//       flipHorizontal: false
//     });
//     return pose;
//   })
//   .then(function(pose) {
//     console.log(pose);
//   });
