"use client";
import {useState,useCallback} from "react";
// import { useDropzone } from "react-dropzone";
import {useRef} from "react"
import axios from "axios";
function Body()
{
    const [policynumber,setpolicynumber]=useState("");
    const [reason,setreason]=useState("");
    const [files,setfiles]=useState([]);
    const [date,setdate]=useState();
    const filebuttonref=useRef(null);
    const [displayfiles,setdisplayfiles]=useState([]);
    const [analysis,setanalysis]=useState("");
    const [result,setresult]=useState(false)
    const [loading,setloading]=useState(false);  

    // const onDrop=useCallback((acceptedfiles)=>{
    //     setfiles(prevFiles=>[...prevFiles,...acceptedfiles])
    // },[]);
    // const {getRootProps,getInputProps,isDragActive}=useDropzone({
    //     onDrop,
    //     multiple:true,
    // })
    function checkvalues(e)
    {
        e.preventDefault();
        console.log(policynumber,reason,files);
    }
    async function handlesubmit()
    {
        const formdata=new FormData();

        formdata.append("policynumber",policynumber);
        formdata.append("reason",reason);
        formdata.append("date",date);
        for(let i of displayfiles)
        {
            formdata.append("files",i);
        }

        try{
            setresult(false)
            setloading(true)
            const res = await axios.post('http://localhost:3001/analyze',formdata);
            setloading(false)
            setresult(true)
            setanalysis(res.data.result)
            console.log(res.data.result)
        }
        catch(err)
        {
            console.log(err);
        }


    }
    function handleaddfile()
    {

        filebuttonref.current.click();
    }

    function handlefilechange(e)
    {
        console.log(e.target.files)
         setdisplayfiles(Array.from(e.target.files))
    }
    return (
      <div className="relative">
        <div className="p-3 flex">
          <div className="w-[50%] flex flex-col items-center border-r-4 border-dashed border-blue-600">
            <div>
              <input
                onChange={handlefilechange}
                type="file"
                multiple
                hidden
                ref={filebuttonref}
              />
              <button
                onClick={handleaddfile}
                className="p-3 bg-red-500 font-bold text-2xl text-white font-mono rounded hover:opacity-45 active:opacity-100"
              >
                Add Files
              </button>
            </div>
            <div className="w-[100%]">
              <div className="grid grid-cols-3">
                {displayfiles.map((file, index) => {
                  return (
                    <div
                      key={index}
                      className="w-[80%] bg-green-400 p-3 mt-2 gap-1 rounded-2xl text-white font-bold font-mono m-1"
                    >
                      <img src="/fileicon.png" />
                      <p>{file.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="w-[50%] p-4">
            <form
              onSubmit={checkvalues}
              className="flex text-2xl flex-col [&>*]:mt-5"
            >
              <label>Policy Number:</label>
              <input
                type="text"
                onChange={(e) => setpolicynumber(e.target.value)}
                className="w-[100%] p-3 border-2 text-2xl border-blue-600 rounded-xl"
              />
              <label>Damage Type:</label>
              <select
                value={reason}
                onChange={(e) => {
                  setreason(e.target.value);
                }}
                className="text-2xl p-3 border-2 border-blue-600 rounded-xl"
              >
                <option value="Self">Self Damage</option>
                <option value="Road">Road Accident</option>
                <option value="Natural">Natural Calamity</option>
              </select>
              <label>Date of Incident:</label>
              <input
                onChange={(e) => setdate(e.target.value)}
                type="date"
                className="text-2xl p-3 focus:ring-blue-700  border-2 border-blue-600 rounded-xl"
              />
              {/* <div className="flex justify-end">
                            <button className="px-4 py-2 bg-blue-600 rounded-xl font-bold hover:opacity-40 active:opacity-100">Submit</button>
                        </div> */}
            </form>
          </div>
        </div>
        <div
          onClick={() => handlesubmit()}
          className="flex justify-center px-4"
        >
          <button className=" py-3 px-8 w-[200px] font-bold rounded-xl hover:opacity-50 active:opacity-100  bg-blue-600">
            Submit
          </button>
        </div>
        <div>
          {result && (
            <div className="flex justify-center mt-3">
              <div className="w-[80%] border-2 border-blue-500 bg-blue-400 rounded p-3">
                <p>{analysis}</p>
              </div>
            </div>
          )}
        </div>
        {loading && (
          <div className="absolute top-0 w-[100%] h-[100vh] bg-gray-400 flex justify-center items-center opacity-50">
            <div className="w-[50px] h-[50px] border-4 border-blue-700 rounded-full border-t-transparent animate-spin opacity-100"></div>
          </div>
        )}
      </div>
    );
}

export default Body;