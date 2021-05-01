import React,{useEffect, useState} from 'react';
import {dbService,storageService} from "fbase";
import Nweet from "../components/Nweet";
import NweetFactory from 'components/NweetFactory';
const Home= ({userObj})=>{
    const [nweets,setNweets]=useState([]);

    const getNweets=async()=>{
        const dbNweets=await dbService.collection("nweets").get();
        dbNweets.forEach((document)=>{
            //dbNweets에 있는 모든 document에 대해 setNweets에서 함수를 사용하고 있는데 배열을 리턴, 이 배열에서 첫 번째 요소는 가장 최근 documet이고, 그 뒤로 이전 documet를 붙임  
            const nweetObject={
                ...document.data(),//...: spread attribute 기능 -> 데이터를 가져와서 풀어냄
                id:document.id,
                
            };
            setNweets(prev=>[nweetObject, ...prev]);//set을 쓰는 함수에서 값 대신에 함수를 전달할 수 있음 -> 만약 함수를 전달하면 리액트는 이전 값에 접근할 수 있게 해줌 
        });
        /*dbNweets는 QueryDocumentSnapshot 형태이므로 
        dbNweets.forEach(document=> console.log(document.data()))를 이용해야
        document들 확인 가능 
        */
    };
    useEffect(()=>{
        //getNweets();
        //getNweets나 snapshot 모두 nweets를 얻는 것은 동일하므로 한가지만 사용하면 됨
        dbService.collection("nweets").onSnapshot(snapshot=>{//onSnapshot은 지우거나 업데이트 등 무언가를 하면 실행됨
            const nweetArray=snapshot.docs.map(doc =>({id:doc.id, ...doc.data(),}));
            setNweets(nweetArray);
        })
    },[]);
    
    return (
        <div className="container">
            <NweetFactory userObj={userObj}/>
            <div  style={{ marginTop: 30 }}>
                {nweets.map((nweet)=>(
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId===userObj.uid} />
                ))}    
            </div>

        </div>
    );
};
export default Home;