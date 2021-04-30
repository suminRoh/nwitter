import React,{useEffect, useState} from "react";
import AppRouter from "./Router";
import {authService} from "fbase";

function App() {
  const [init,setInit]=useState(false);//아직 초기화되지않음 
  const [isLoggedIn,setIsLoggedIn]=useState(false);//currentUser:로그인 여부 판단 method
  useEffect(()=>{//변화가 있는가를 감지
    authService.onAuthStateChanged((user)=>{
      if(user){
       setIsLoggedIn(true);
      
      }else{//user가 없으면 
        setIsLoggedIn(false);
      }
      setInit(true); 
    });
  },[]);
  return (
    <>
      {init?<AppRouter isLoggedIn={isLoggedIn}/>:"Initializing.."}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );//isLoggedIn 이라는 props를 Router에 전달
}

export default App;
