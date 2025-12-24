"use client"
import {useEffect, useState} from "react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import {auth} from "../firebase";
function Navigation()
{
    const router=useRouter();
    const [open,setopen]=useState(false);
    const [user,setuser]=useState(null);

    useEffect(()=>{
        const getuser=auth.currentUser;
        setuser(getuser);
    },[])
    function handlemenu()
    {
        setopen(!open);
    }
    async function signout()
    {
        try{

            console.log("signout initialted");
            await signOut(auth);
            router.replace("/signin");
        }
        catch(err){
            console.log(err);
        }
       
    }
    return (
        <div className="flex justify-center w-[100vw]">
            <div className="w-[95%] bg-blue-500 rounded-xl px-4 py-1 flex justify-between items-center">
                <div className="flex items-center">
                    <img src="insurancelogo1.png" className="w-[60px]"/>
                    <p className="text-3xl "><span className="font-mono bg-gradient-to-tl from-green-600 via-lime-300 to-zinc-400 bg-clip-text text-transparent">Insurence</span><span className="ml-1.5 font-mono bg-gradient-to-tl from-red-600 via-red-800 to-zinc-400 bg-clip-text text-transparent">eye</span></p>
                </div>
                <div onClick={()=>handlemenu()} className="cursor-pointer flex justify-center items-center relative">
                    <img src="user.png" className="w-[50px]"/>
                    <p className={`pl-2 text-2xl font-mono font-bold bg-gradient-to-r
from-lime-300
via-lime-500
to-lime-400
bg-clip-text
text-transparent`}>{user!=null? user.email:"Username"}</p>
                </div>
                {open && <div className="absolute flex flex-col w-[200px] right-10 top-15 bg-blue-100 p-4 rounded">
                    <div onClick={()=>signout()} className="w-[100%] hover:bg-red-500 p-2 rounded-xl cursor-pointer font-bold">
                        <p>Signout</p>
                    </div>
                </div> }
                
            </div>
        </div>
    )
}

export default Navigation;