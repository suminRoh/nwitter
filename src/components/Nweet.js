import { dbService, storageService } from "fbase";
import React,{useState} from "react";

const Nweet=({nweetObj,isOwner})=>{
    const [editing,setEditing]=useState(false);// edit mode인지 알려줌 
    const [newNweet,setNewNweet]=useState(nweetObj.text); //input에 입력된 text를 update
    const onDeleteClick=async()=>{
        const ok=window.confirm("Are you sure you want to delte this nweet?");
        if(ok){
            await dbService.doc(`nweets/${nweetObj.id}`).delete(); //delte id
            await storageService.refFromURL(nweetObj.attachmentUrl).delete(); //delete photo
        }
    };
    const toggleEditing=()=>{setEditing((prev)=> !prev)};
    const onSubmit=async(event)=>{
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text:newNweet
        });
        setEditing(false);
    };
    const onChange=(event)=>{
        const {target:{value},}=event;
        setNewNweet(value);
    };
    return (
        <div>
          {editing ? (
            <>
              {isOwner && <> 
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Edit your nweet"
                  value={newNweet}
                  required
                  onChange={onChange}
                />
                <input type="submit" value="Update Nweet" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
              </>}
            </>
          ) : (
            <>
              <h4>{nweetObj.text}</h4>
              {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} widh="50px" height="50px"/>}
              {isOwner && (
                <>
                  <button onClick={onDeleteClick}>Delete Nweet</button>
                  <button onClick={toggleEditing}>Edit Nweet</button>
                </>
              )}
            </>
          )}
        </div>
      );
};

export default Nweet;