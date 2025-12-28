import multer from "multer";
import path from "path";
import fs from "fs";

const datadir="data";

if(fs.existsSync(datadir))
{
  console.log("data folder exist")
}
else{
  fs.mkdirSync(datadir)
}

const upload=multer({dest:"data/"})

export default upload;