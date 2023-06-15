import React,{useEffect, useState} from 'react';
import { ref, onValue, set, child, get } from "firebase/database";
import {  database } from "../Firebase";
import { useLocalStorage } from '../../hooks/useLocalStorage';




export default function ChatBox() {

    const [user] = useLocalStorage();
    const [users, setUsers] = useState([]);
    const [openBox, setOpenBox] = useState(true);


    // const dbRef = ref(getDatabase());
    // get(child(dbRef, `users/${userId}`)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     console.log(snapshot.val());
    //   } else {
    //     console.log("No data available");
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });
    
    useEffect(() => {
        const recentRef = ref(database, 'userLogin')
        onValue(recentRef, (snapshot) => {
            if(snapshot.exists()) {
                const res = snapshot.val()
                const data = Object.keys(res).map(id => {
                    return {
                        id,
                        email: res[id].email
                    }
                })
                setUsers(data)
            }
        });
    }, []);


    const listedUser = () =>{
        console.log("click");
        setOpenBox(false)
    }

    const personalChat = (userId) =>{

        console.log("click", userId, user);
    }


  return (
    <>
    <div >
         {
                    users?.length && users.map((user) => (
                        <div onClick={()=>personalChat(user.id)}  key={user.id}>{user.email}</div>
                    ))
         }
    </div>
    <div className={openBox? 'chat-box1' : "chat-box2"}>
                <button onClick={()=>{setOpenBox(true)}}>-</button>
            </div>
    </>
  )
}
