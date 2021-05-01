import AuthForm from 'components/AuthForm';
import { authService, firebaseInstance } from 'fbase';
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth= ()=>{
    const onSocialClick=async(event)=>{
        const{
            target:{name},   
        }=event;
    
        if(name==="google"){ //구글 계정으로 로그인
            await authService.signInWithPopup(new firebaseInstance.auth.GoogleAuthProvider(),);
    
    
        }else if(name==="gihub"){//깃허브 계정으로 로그인 
            const data=await authService.signInWithPopup(new firebaseInstance.auth.GithubAuthProvider(),);
        }
    
        
    };
    return (
      <div className="authContainer">
        <FontAwesomeIcon
          icon={faTwitter}
          color={"#04AAFF"}
          size="3x"
          style={{ marginBottom: 30 }}
        />
        <AuthForm />
        <div className="authBtns">
          <button onClick={onSocialClick} name="google" className="authBtn">
            Continue with Google <FontAwesomeIcon icon={faGoogle} />
          </button>
          <button onClick={onSocialClick} name="github" className="authBtn">
            Continue with Github <FontAwesomeIcon icon={faGithub} />
          </button>
        </div>
      </div>
    );
  };


export default Auth; //자동으로 import 할 수 있게 해줌 