import AuthForm from 'components/AuthForm';
import { authService, firebaseInstance } from 'fbase';
import React from 'react';

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
    return(
        <div>
            <AuthForm />
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    );  
};


export default Auth; //자동으로 import 할 수 있게 해줌 