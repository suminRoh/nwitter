import { authService } from "fbase";
import React, { useState } from "react";

const AuthForm=()=>{
    const [email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[newAccount,setnewAccount]=useState(true);
    const[error,setError]=useState("");
    const onChange=(event)=>{
        const {target:{name,value},}=event; //값의 변경이 발생한 부분
        if(name==="email"){ 
            setEmail(value)
        }
        else if(name==="password"){
            setPassword(value);        }

    };
    const onSubmit=async(event)=>{
        event.preventDefault();//누군가 form을 submit했을 때 기본 행위가 실행되지 않고 개발자가 컨트롤할 수 있게 해줌 (새로고침 안됨)
        
        try{
            let data;
            if(newAccount){//create account
                const data=await authService.createUserWithEmailAndPassword(email,password);
            }
            else{//login
                const data=await authService.signInWithEmailAndPassword(email,password);
            }
        }

        catch(error){
            setError(error.message);
        }
    };
const toggleAccount=()=>setnewAccount(prev=>!prev);
    return(
        <>
             <form onSubmit={onSubmit} className="container">
                <input
                name="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={onChange}
                className="authInput"
                />
                <input
                name="password"
                type="password"
                placeholder="Password"
                required
                value={password}
                className="authInput"
                onChange={onChange}
                />
                <input
                type="submit"
                className="authInput authSubmit"
                value={newAccount ? "Create Account" : "Sign In"}
                />
               
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">
                {newAccount?"SIgn in":"Create Account" }
            </span>
        </>

    );
};

export default AuthForm;