"use client";

import React from "react";
import LoginModel from "../models/IntialModel";
import RegisterModel from "../models/RegisterModel";
import NewDoc from "../models/NewDoc";
import ShareModel from "../models/Share";
import ManageAccess from "../models/ManageAccess";

export default function ModelsProvider() {
  return (
    <>
      <LoginModel />
      <RegisterModel />
      <NewDoc />
      <ShareModel />
      <ManageAccess />
    </>
  );
}
