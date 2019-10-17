import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux'
import { Redirect } from "react-router-dom";
import { signOut } from "../../actions/actions"; 

export default function Logout(){
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(signOut());
  }, [dispatch])

  return <Redirect to="/login" />
}