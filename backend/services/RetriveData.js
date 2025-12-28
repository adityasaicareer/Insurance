import {Pinecone} from "@pinecone-database/pinecone";


const pc = new Pinecone({
  apiKey:
    'pcsk_3FpDER_DmFD7byqVnEGHyUYvsu4RcvQzjqxQczrL7RGeeorsgdTtG1Mwv2D9mBq2WjYSYD',
});

const index=pc.Index("insurancenew")
async function queryresponse(em)
{
    const queryresponse = await index.query({
      vector: em.values,
      topK: 2,
      includeMetadata: true,
    });

    return queryresponse;

}

export const getvectors=async (embeding)=>{
  console.log("querysearch")
  const matches=[];
  
  for(let embed of embeding)
  {
    let tempq=await queryresponse(embed)
    for(let i of tempq.matches.slice(0,3))
    {
      let temptext=i.metadata.text;
      console.log(temptext)
      matches.push(temptext)
    }
    //console.log(JSON.stringify(tempq.matches.metadata))

  }
  console.log(matches)
  
  console.log("query search was successful");
  const context=matches.join("\n\n")
  console.log(context)
  console.log("end of context")
  return context;
}
