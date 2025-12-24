"use client";
import {useState,useCallback} from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
function Body()
{
    const [policynumber,setpolicynumber]=useState("");
    const [reason,setreason]=useState("");
    const [files,setfiles]=useState([]);
    const [date,setdate]=useState();
    const onDrop=useCallback((acceptedfiles)=>{
        setfiles(prevFiles=>[...prevFiles,...acceptedfiles])
    },[]);
    const {getRootProps,getInputProps,isDragActive}=useDropzone({
        onDrop,
        multiple:true,
    })
    function checkvalues(e)
    {
        e.preventDefault();
        console.log(policynumber,reason,files);
    }
    async function handlesubmit()
    {
        const formData=new FormData();
        files.forEach((i)=> formData.append("files",i))
        formData.append("policynumber",policynumber);
        formData.append("reason",reason);
        formData.append("date",date);

        try{
            const response=await fetch("http://localhost:3002/upload",{method:"POST",body:formData})
            console.log(await response.json())
            if(response.ok)
            {
                console.log("Success");
            }
            else{
                console.log("failed")
            }
        }
        catch(err)
        {
            console.log(err);
        }

    }
    return (
        <div>

             <div className="p-3 flex">

                <div className="w-[50%] flex flex-col items-center border-r-4 border-dashed border-blue-600">
                    <div {...getRootProps()} className="w-[100%]">
                        <div className="cursor-pointer font-bold w-[90%] h-[100px] border-2 border-dotted border-blue-600 bg-blue-300 opacity-85 rounded-xl flex justify-center items-center">
                        
                        <input {...getInputProps()} />
                        
                        {isDragActive? <p>Drop the files</p>:<p>Drag and Drop or click to upload</p>}
                        </div>
                        <div>
                            {files.length!=0 && files.map((i,index)=>{
                            return (
                                <div key={i.name} className="px-4 py-2 bg-blue-600 m-1 rounded-xl">
                                    <p key={index}>{`${i.name} ${i.size} Bytes size`}</p>
                                </div>
                                
                            )
                        })}

                        </div>
                        
                        
                    </div>


                </div>
                <div className="w-[50%] p-4">
                    <form onSubmit={checkvalues} className="flex text-2xl flex-col [&>*]:mt-5">
                        <label>Policy Number:</label>
                        <input type="text" onChange={(e)=>setpolicynumber(e.target.value)} className="w-[100%] p-3 border-2 text-2xl border-blue-600 rounded-xl"/>
                        <label>Damage Type:</label>
                        <select value={reason} onChange={(e)=>{setreason(e.target.value)}} className="text-2xl p-3 border-2 border-blue-600 rounded-xl">
                            <option value="Self">Self Damage</option>
                            <option value="Road">Road Accident</option>
                            <option value="Natural">Natural Calamity</option>
                        </select>
                        <label>Date of Incident:</label>
                        <input onChange={(e)=>setdate(e.target.value)} type="date" className="text-2xl p-3 focus:ring-blue-700  border-2 border-blue-600 rounded-xl" />
                        {/* <div className="flex justify-end">
                            <button className="px-4 py-2 bg-blue-600 rounded-xl font-bold hover:opacity-40 active:opacity-100">Submit</button>
                        </div> */}
                    </form>
                </div>
            </div>
            <div onClick={()=>handlesubmit()} className="flex justify-center px-4">
                <button className=" py-3 px-8 w-[200px] font-bold rounded-xl hover:opacity-50 active:opacity-100  bg-blue-600">Submit</button>
            </div>

        </div>
        
       

    )
}

export default Body;