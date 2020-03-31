import React, { useState, useEffect } from "react";
import * as posenet from "@tensorflow-models/posenet";

export default function DressingRoom({ selectedItemForTrying }) {
  const [width, setWidth] = useState("");
  const [left, setLeft] = useState("");
  const [top, setTop] = useState("");

  let videoElement = React.createRef();
  let selectedItem = React.createRef();

  // useEffect(() => {
  //   activateTrying();
  // }, [selectedItemForTrying.itemUrl]);

  const startWebcam = () => {
    const constraints = { video: true };
    const webcam = document.getElementById("user_camera");
    navigator.mediaDevices.getUserMedia(constraints).then(video => {
      webcam.srcObject = video;
    });
    return webcam;
  };

  const activateTrying = () => {
    if (selectedItemForTrying.itemUrl !== null) {
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
      <button onClick={startWebcam}>OPEN CAMERA</button>
      <img
        ref={selectedItem}
        onClick={activateTrying}
        id="selected-item"
        src={selectedItemForTrying.itemUrl}
        style={{ width, left, top }}
      />
      <video
        ref={videoElement}
        style={{ width: 400, height: 500, backgroundColor: "black" }}
        autoPlay
        id="user_camera"
      ></video>
    </div>
  );
}
