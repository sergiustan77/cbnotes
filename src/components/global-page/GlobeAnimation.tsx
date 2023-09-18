"use client";
import React from "react";
import Lottie from "lottie-react";
import globeAnimation from "./../../../public/0w4BiUctti.json";

type Props = {};

const GlobeAnimation = (props: Props) => {
  return <Lottie className="w-24" animationData={globeAnimation}></Lottie>;
};

export default GlobeAnimation;
