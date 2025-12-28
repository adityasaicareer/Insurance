export const chunkText=(text,overlap=150,chunksize=300)=>{

  const chunks=[];
  let i=0;
  while(i<text.length)
  {
    let chunk=text.slice(i,i+chunksize)
    chunks.push(chunk)
    i=i+(chunksize-overlap)
  }

  return chunks

}