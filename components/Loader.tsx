"use client";
import { ClockLoader } from "react-spinners";

import React from "react";

export default function Loader() {
  return (
    <div
      className='
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center
      z-50
    '
    >
      <ClockLoader color='#36d7b7' />
    </div>
  );
}
