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
  let videoElement = React.createRef();

  const startWebcam = () => {
    const constraints = { video: true };
    const webcam = document.getElementById("user_camera");
    navigator.mediaDevices.getUserMedia(constraints).then(video => {
      webcam.srcObject = video;
    });
    return webcam;
  };

  const checkLimage = () => {
    if (itemData.itemUrl !== null) {
      posenet
        .load()
        .then(function(net) {
          const imageScaleFactor = 0.5;
          const flipHorizontal = false;
          const outputStride = 16;
          const pose = net.estimateSinglePose(
            videoElement.current,
            imageScaleFactor,
            flipHorizontal,
            outputStride
          );
          return pose;
        })
        .then(function(pose) {
          console.log(pose);
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
      <button onClick={startWebcam}>OPEN CAMERA</button>
      <img
        onClick={checkLimage}
        id="selected-item"
        src={itemData.itemUrl}
        style={{ width, left, top }}
      />
      <video
        ref={videoElement}
        style={{ width: 800, height: 500, backgroundColor: "black" }}
        autoPlay
        id="user_camera"
      ></video>
      {/* <img
        ref={imageElement}
        id="person_standing"
        src="./images/person_1.jpg"
      /> */}
    </div>
  );
}
