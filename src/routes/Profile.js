import { authService, dbService } from 'fbase';
import React, { useState } from 'react';
import {useHistory} from "react-router-dom";

export default ({userObj,refreshUser})=>{
    const history=useHistory();
    const [newDisplayName,setNewDisplayName]=useState(userObj.displayName);
    const onLogOutClick=()=>{
        authService.signOut();
        history.push("/");//home으로 갈 수 있는 hooks 이용 방법
    };
    const onChange=(event)=>{
        const {target:{value},}=event;
        setNewDisplayName(value);
    };
    const onSubmit=async(event)=>{
        event.preventDefault();
        if(userObj.displayName!==newDisplayName){
            await userObj.updateProfile({
                displayName:newDisplayName,
            });
            refreshUser();
        }
    };

 
    return (
    <>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" placeholder="Display Name" value={newDisplayName}/>
            <input type="submit" value="Update Profile" />
            
        </form>
        <button onClick={onLogOutClick}>Log Out</button>
    </>
    );

};