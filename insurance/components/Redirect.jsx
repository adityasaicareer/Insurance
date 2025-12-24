"use client";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {auth} from "../firebase";
function Redirect()
{
    const router=useRouter();
    useEffect(()=>{
        const user=auth.currentUser;
        if(user)
        {
            router.replace("/home");
        }
        else{
            router.replace("/signin");
        }
    },[])

    return null;
}

export default Redirect;