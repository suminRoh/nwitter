import React,{useEffect, useState} from 'react';
import {dbService} from "fbase";

const Home= ()=>{
    const [nweet,setNweet]=useState("");
    const [nweets,setNweets]=useState([]);
    const getNweets=async()=>{
        const dbNweets=await dbService.collection("nweets").get();
        dbNweets.forEach((document)=>{
            //dbNweets에 있는 모든 document에 대해 setNweets에서 함수를 사용하고 있는데 배열을 리턴, 이 배열에서 첫 번째 요소는 가장 최근 documet이고, 그 뒤로 이전 documet를 붙임  
            setNweets(prev=>[document.data(), ...prev]);//set을 쓰는 함수에서 값 대신에 함수를 전달할 수 있음 -> 만약 함수를 전달하면 리액트는 이전 값에 접근할 수 있게 해줌 
        });
        /*dbNweets는 QueryDocumentSnapshot 형태이므로 
        dbNweets.forEach(document=> console.log(document.data()))를 이용해야
        document들 확인 가능 
        */
    };
    useEffect(()=>{
        getNweets();
    },[]);
    const onSubmit=async(event)=>{
        event.preventDefault();
        await dbService.collection("nweets").add({//document ID를 자동으로 부여하며 새로운 document 추가 
            nweet, //document의 key
            createdAt: Date.now(),
        });
        setNweet("");
    };
    const onChange=(event)=>{// event안의 target안의 value를 주는 것 
        //const {taget:{value},}=event; == event.target.value
        setNweet(event.target.value);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
        </div>
    );
};
export default Home;