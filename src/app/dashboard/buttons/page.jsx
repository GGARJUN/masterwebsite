"use client";

import React, { useState } from "react";
import Button1 from "./_components/Button1";
import Button2 from "./_components/Button2";
import Button3 from "./_components/button3";
import Button4 from "./_components/Button4";
import Button5 from "./_components/Button5";
import Button6 from "./_components/Button6";
import Button7 from "./_components/Button7";
import Button8 from "./_components/Button8";
import Button9 from "./_components/Button9";
import Button10 from "./_components/Button10";
import Button11 from "./_components/Button11";
import Button12 from "./_components/Button12";
import Button13 from "./_components/Button13";
import Button14 from "./_components/Button14";
import Button15 from "./_components/Button15";
import Button16 from "./_components/Button16";
import Button17 from "./_components/Button17";
import Button18 from "./_components/Button18";
import Button19 from "./_components/Button19";
import Button20 from "./_components/Button20";
import Button21 from "./_components/Button21";
import Button22 from "./_components/Button22";
import Button23 from "./_components/Button23";
import Button24 from "./_components/Button24";
import Button25 from "./_components/Button25";
import Button26 from "./_components/Button26";
import Button27 from "./_components/Button27";
import Button28 from "./_components/Button28";
import Button29 from "./_components/Button29";
import Button30 from "./_components/Button30";




const Buttons = () => {

  const navbar = [
    {
      id: 1,
      path: <Button1 />,
    },
    {
      id: 2,
      path: <Button2 />,
    },
    {
      id: 3,
      path: <Button3 />,
    },
    {
      id: 4,
      path: <Button4 />,
    },
    {
      id: 5,
      path: <Button5 />,
    },
    {
      id: 6,
      path: <Button6 />,
    },
    {
      id: 7,
      path: <Button7 />,
    },
    {
      id: 8,
      path: <Button8 />,
    },
    {
      id: 9,
      path: <Button9 />,
    },
    {
      id: 10,
      path: <Button10 />,
    },
    {
      id: 11,
      path: <Button11 />,
    },
    {
      id: 12,
      path: <Button12 />,
    },
    {
      id: 13,
      path: <Button13 />,
    },
    {
      id: 14,
      path: <Button14 />,
    },
    {
      id: 15,
      path: <Button15 />,
    },
    {
      id: 16,
      path: <Button16 />,
    },
    {
      id: 17,
      path: <Button17 />,
    },
    {
      id: 18,
      path: <Button18 />,
    },
    {
      id: 19,
      path: <Button19 />,
    },
    {
      id: 20,
      path: <Button20 />,
    },
    {
      id: 21,
      path: <Button21 />,
    },
    {
      id: 22,
      path: <Button22 />,
    },
    {
      id: 23,
      path: <Button23 />,
    },
    {
      id: 24,
      path: <Button24 />,
    },
    {
      id: 25,
      path: <Button25 />,
    },
    {
      id: 26,
      path: <Button26 />,
    },
    {
      id: 27,
      path: <Button27 />,
    },
    {
      id: 28,
      path: <Button28 />,
    },
    {
      id: 29,
      path: <Button29 />,
    },
    {
      id: 30,
      path: <Button30 />,
    },
  ];

  return (
    <div className="grid grid-cols-1  gap-8 w-full p-10 bg-gradient-to-r from-black-50 to-white/10 min-h-screen ">
      {navbar.map((item) => (
        <div
        key={item.id}
        className=" relative flex flex-col justify-center items-center h-36 w-full bg-white/20 border border-neutral-400 rounded-xl shadow-md overflow-hidden "
        >
          {item.path}
          {/* <h1 className="bg-emerald-100 text-xl rounded-full  absolute z-50 left-0 -top-10">{item.num}</h1> */}
        </div>
      ))}
    </div>
  );
};

export default Buttons;
