import React from "react";
const Distance = ({ distance, metric }) => {
  let distanceString = "";
  if (metric === "metric") {
    distanceString = distance.toFixed(2) + " km";
  } else {
    const distanceMi = distance * 0.621371;
    distanceString = distanceMi.toFixed(2) + " mi";
  }
  return <span>{distanceString}</span>;
};

export default Distance;
