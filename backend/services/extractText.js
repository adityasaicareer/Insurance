import {PDFParse} from "pdf-parse";
import mammoth from 'mammoth';
import fs from 'fs';


export const getText =async (i)=>{
    const buffer=fs.readFileSync(i.path);
    if (i.mimetype == 'application/pdf') {
      const unit = new Uint8Array(buffer);
      console.log(unit)
      const parser=new PDFParse(unit)
      
      const data=await parser.getText();

      return data.text;
    }
    if (i.mimetype =='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const res = await mammoth.extractRawText({ buffer });

      return res.value;
    }
    return "";
}


