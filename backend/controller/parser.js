import { getText } from "../services/extractText.js"
import { chunkText } from "../services/chunks.js";
import {embedChunks} from "../services/embeding.js"
import { getvectors } from "../services/RetriveData.js";
import { llmans } from "../services/llmquery.js";

export const parser=async (req,res)=>{

    console.log(req.body);
    const {policynumber,reason,datae}=req.body
    console.log(req.files);
    let text="";
    for(let i of req.files)
    {
      const t=await getText(i);
      text+=t+"\n"
    }
    console.log(typeof(text))
    text=text+String(policynumber)+String(reason)
    const chunks=chunkText(text)
    console.log(chunks)

    let newchunks=chunks.join(" ")

    console.log(newchunks)
    console.log(typeof(newchunks))
    const embedings=await embedChunks(newchunks)
    console.log(embedings)

    const context=await getvectors(embedings);
    console.log("llm")
    const ans=await llmans(context);
    console.log("llm ans")
    console.log(ans.content)
    console.log("finished")
    res.json({"result":ans.content})


}
