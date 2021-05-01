import React,{useEffect, useState} from "react";
import AppRouter from "./Router";
import {authService} from "fbase";

function App() {
  const [init,setInit]=useState(false);//아직 초기화되지않음 
  const [userObj,setUserObj]=useState(null);

  useEffect(()=>{//변화가 있는가를 감지
    authService.onAuthStateChanged((user)=>{//로그인, 로그아웃, 초기화 될 떄 발생 함수 
      
      if(user){
       setUserObj({//user를 저장해놓음 (user은 방대한 양을 차지하므로 이용하려는 객체들만 가져옴)
        displayName:user.displayName,
        uid:user.uid,
        updateProfile:(args)=>user.updateProfile(args),
       });
       
      }else{
        setUserObj(null);
      }
      setInit(true); 
    });
  },[]);
  const refreshUser=()=>{
    const user=authService.currentUser;
   
    setUserObj({
      displayName:user.displayName,
      uid:user.uid,
      updatePrifile:(args)=>user.updateProfile(args),
     });
  };
  return (
    <>
      {init?<AppRouter refreshUser={refreshUser}isLoggedIn={Boolean(userObj)} userObj={userObj}/>:"Initializing.."}
    
    </>
  );//isLoggedIn 이라는 props를 Router에 전달
}

export default App;
