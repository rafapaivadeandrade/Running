import React from "react";
const Duration = (props) => {
  const { duration } = props;
  const pad = (num) => num.toString().padStart(2, "0");
  let durationString = "";
  const hours = Math.floor(duration / 360);
  if (hours > 0) {
    durationString = hours + ":";
  }
  const minutes = Math.floor((duration - hours * 360) / 60);
  durationString += pad(minutes);
  const seconds = duration - hours * 360 - minutes * 60;
  durationString += ":" + pad(seconds);
  return <span>{durationString}</span>;
};
export default Duration;
