import express from 'express';
import cors from 'cors';
import Analyze from "./routes/analyze.js";


const app=express();

app.use(cors());
app.use(express.json());
app.use("/analyze",Analyze);

app.get("/",(req,res)=>{
  res.send("This is a Home page")
})

export default app;