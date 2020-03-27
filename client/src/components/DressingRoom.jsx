import React, { useState } from "react";
import posenet from "@tensorflow-models/posenet";

export default function DressingRoom() {
  // const net = await posenet.load();

  // var imageElement = document.getElementById("gollum");
  // posenet
  //   .load()
  //   .then(function(net) {
  //     const pose = net.estimateSinglePose(imageElement, {
  //       flipHorizontal: false
  //     });
  //     return pose;
  //   })
  //   .then(function(pose) {
  //     console.log(pose);
  //     // person's shoulder position
  //     const leftShoulder = pose.keypoints[6].position.x;
  //     const rightShoulder = pose.keypoints[5].position.x;

  //     // clothing img
  //     const gollumShirt = document.querySelector("#gollum_shirt");

  //     // these values will be saved into the database after we manually find the positions
  //     // 1. Find shoulder position on x,y axis on CodePen using CSS top/right/left classes
  //     // 2. Find width and height of image (https://www.w3schools.com/jsref/prop_img_width.asp)
  //     // 3. Divide xPosition/width to find % point for left/right offset
  //     // 4. Divide yPosition/width to find % point for topoffset (in this case just one because we only accounted for a straight image )
  //     const leftOffsetPercent = 0.21; // `left` CSS value / img.width
  //     const rightOffsetPercent = 0.275; // (img.width - `right` CSS value) / img.width

  //     // offset = how much distance between shirt's img edge and shirt shoulder
  //     const leftOffset = gollumShirt.width * leftOffsetPercent;
  //     const rightOffset = gollumShirt.width * rightOffsetPercent;
  //     const topOffset = gollumShirt.height * 0.37;

  //     // apply offsets to set the shirt's img width
  //     const leftPos = leftShoulder - leftOffset;
  //     const rightPos = rightShoulder + rightOffset;
  //     const width = rightPos - leftPos;

  //     // person's shoulder position on y axis
  //     const topLeftOfShoulder = pose.keypoints[6].position.y;
  //     const topRightOfShoulder = pose.keypoints[5].position.y;

  //     // average distance from top of img to shoulders
  //     const topDistance =
  //       (topLeftOfShoulder + topRightOfShoulder) / 2 - topOffset;

  //     // set styling for shirt image to position the x, y axis and width
  //     gollumShirt.style.left = `${leftPos}px`;
  //     gollumShirt.style.width = `${width}px`;
  //     gollumShirt.style.top = `${topDistance}px`;
  //   });

  return (
    <div class="images">
      <img
      // HERE IMAGE OF CHOSEN T-SHIRT
      />
      <img
      // HERE PICTURE OF PERSON STANDING
      />
    </div>
  );
}
