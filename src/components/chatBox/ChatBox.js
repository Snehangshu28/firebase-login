import React,{useEffect, useState} from 'react';
import { ref, onValue, set, push } from "firebase/database";
import {  db } from "../Firebase";
import { useLocalStorage } from '../../hooks/useLocalStorage';




export default function ChatBox() {

    const [user] = useLocalStorage();
    const [users, setUsers] = useState([]);
    const [openBox, setOpenBox] = useState(true);

    
    useEffect(() => {
        const recentRef = ref(db, 'userLogin')
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



    const personalChat = (userId) =>{
        const chanel = {
            users:[
                userId,
                user.uid
            ]
        }

        const chListRef = ref(db, 'chanel');
        const newChRef = push(chListRef);
        set(newChRef, chanel).then((res)=>{
            console.log(newChRef);
        })
        
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
    <div className="chat-box2">
        
            </div>
    </>
  )
}
