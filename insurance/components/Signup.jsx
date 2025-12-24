"use client";
import {signInWithPopup,GoogleAuthProvider,getAdditionalUserInfo,createUserWithEmailAndPassword} from "firebase/auth"
import {auth} from "../firebase";
import {useRouter} from "next/navigation";
import {useState,useEffect} from "react";
import Link from "next/link";
function Signup()
{
    const router=useRouter();
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [rpassword,setrpassword]=useState("");
    const [check,setcheck]=useState(false);
    useEffect(()=>{

        checkpassword();

    },[password,rpassword])
    function checkpassword()
    {
        if(password=="" || rpassword=="")
        {
            setcheck(false);
        }
        else if(password!=rpassword)
        {
            setcheck(true);
        }
        else{
            setcheck(false);
        }

    }
    async function handleemail(e)
    {
        if(check)
        {
            alert("Confirm password didnt match");
        }
        e.preventDefault();
        console.log("email and password");
        try{
            if(!check)
            {
                const result=await createUserWithEmailAndPassword(auth,email,password);
            }
            console.log(result);

            router.push("/home")

        }
        catch(err)
        {
            console.log(err);
        }
    }
    async function googlesignup()
    {
        console.log("Signup initialted")
        try{

            const googleprovider=new GoogleAuthProvider();
            console.log(googleprovider);
            const result=await signInWithPopup(auth,googleprovider);
            console.log(result);
            const info=getAdditionalUserInfo(result);
            router.push("/home")
        }
        catch(err)
        {
            console.log(err);
        }

    }
    return (
        <div className="h-[100vh] flex">
            <div className="flex justify-center items-center items-center w-[55%] h-[100vh] p-3">
                <img src="signup1.jpg" className="w-[100%] h-[90vh] rounded-xl" />
            </div>
            <div className="flex justify-center w-[45%] items-center">
                <div className="flex justify-center w-[90%] p-4 relative">
                    <div className="absolute bg-transparent p-3 -top-7">
                        <h1 className="text-2xl font-mono">SignUp</h1>
                    </div>
                    <div className="border-2 border-blue-600 rounded-2xl w-[100%] p-3">
                        <form className="w-[100%] mt-5" onSubmit={handleemail}>
                            <div className="flex flex-col">
                                <label>Email:</label>
                                <input onChange={(e)=>setemail(e.target.value)} className="w-[100%] border-2 border-black p-2 rounded-xl" type="email"/>

                            </div> 
                            <div>
                                <label>Password:</label>
                                <input onChange={(e)=>setpassword(e.target.value)} className="w-[100%] border-2 border-black p-2 rounded-xl" type="password"/>

                            </div>
                             <div>
                                <label>Confirm Password:</label>
                                <input onChange={(e)=>setrpassword(e.target.value)} className="w-[100%] border-2 border-black p-2 rounded-xl" type="password"/>
                            </div>
                            <div className="flex justify-end mt-5">
                                <button className="p-5 px-7 bg-cyan-600 transition-all duration-200    hover:rounded-xl hover:shadow-2xl active:shadow font-bold text-xl">Submit</button>
                            </div>
                            {
                                check && <div>
                                    <p className="text-red-500">Password and Confirm password didnt match</p>
                                </div>
                            }
                        
                        </form>
                        <div className="flex flex-col items-center justify-center mt-5 border-t-2">
                            <div onClick={()=>googlesignup()} className=" mt-3 flex w-[90%] p-2 bg-blue-600 rounded-xl flex items-center hover:opacity-20 active:opacity-100">
                                <img src="google.png" className="w-[30px]" />
                                <p className="text-white font-bold ml-2 text-xl">Google</p>
                            </div>
                            <div className="mt-3 hover:opacity-40 active:opacity-100">
                                <Link href="/signin"><p>Already had account Signin</p></Link>
                            </div>

                        </div>


                    </div>
                    
                </div>

            </div>
        </div>
    )
}

export default Signup;