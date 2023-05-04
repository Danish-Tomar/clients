import React from "react";
import { Navigate, Outlet } from "react-router";
import { KEY_ACCESS_TOKEN, getItem } from "../utils/localStorageManager";

function RequireUser() {
  const user = getItem(KEY_ACCESS_TOKEN);
  // console.log(user);
  return(
  
    user ? <Outlet /> : <Navigate to="/login"/>
  ) 
}

export default RequireUser;
