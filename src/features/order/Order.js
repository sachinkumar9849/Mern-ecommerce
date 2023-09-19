import React, { useState } from "react";
import { createSlice } from "@reduxjs/toolkit";

import { useSelector, useDispatch } from "react-redux";
import { increment, selectCount } from "./orderSlice";

export default function Order() {
  
  const dispatch = useDispatch();

  return (
    <div>
      <div></div>
    </div>
  );
}
