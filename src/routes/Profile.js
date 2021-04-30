import { authService } from 'fbase';
import React from 'react';
import {useHistory} from "react-router-dom";

export default ()=>{
    const history=useHistory();
    const onLogOutClick=()=>{
        authService.signOut();
        history.push("/");//home으로 갈 수 있는 hooks 이용 방법
    };
    return (
    <>
        <button onClick={onLogOutClick}>Log Out</button>
    </>
    );

};