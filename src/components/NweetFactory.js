import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import {v4 as uuidv4} from "uuid";

const NweetFactory =({userObj})=>{
    //Nweets 생성담당
    const [nweet,setNweet]=useState("");
    const [attachment,setAttachment]=useState("");
    const onSubmit=async(event)=>{
        event.preventDefault();
        let attachmentUrl="";
        if(attachment!==""){
            const attachmentRef=storageService.ref().child(`${userObj.uid}/${uuidv4()}`);//파일에 대한 reference
            const response=await attachmentRef.putString(attachment,"data_url");//string data를 reference에게 보냄
            attachmentUrl=await response.ref.getDownloadURL();// 사진을 볼 수 있는 url을 줌 
        }
        const nweetObj={
            text:nweet, //document의 key
            createdAt: Date.now(),
            creatorId:userObj.uid,
            attachmentUrl,
        }
        
        await dbService.collection("nweets").add(nweetObj);//document ID를 자동으로 부여하며 새로운 document 추가 
        setNweet("");
        setAttachment("");
    };
    const onChange=(event)=>{// event안의 target안의 value를 주는 것 
        //const {taget:{value},}=event; == event.target.value
        setNweet(event.target.value);
     
    }
    const onFileChange=(event)=>{
        const {target:{files},}=event;//event가 target안의 files 가리킴
        const theFile=files[0];
        const reader=new FileReader();
        reader.onloadend=(finishedEvent)=>{//event listner : 파일 로딩이 끝날 때 finishedEvent가짐 
            const {currentTarget:{result},}=finishedEvent;
            setAttachment(result)
        };
        reader.readAsDataURL(theFile);
    };
    const onClearAttachment =()=>setAttachment(""); //사진 clear시킴
    return(
        <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="file" accept="image/*" onChange={onFileChange}/>
        <input type="submit" value="Nweet" />
        {attachment && (
            <div>
                <img src={attachment} width="50px" height="50px" />
                <button onClick={onClearAttachment}>Clear Photo</button>
            </div>    
            
        )}

    </form>
    );
    
};


export default NweetFactory;