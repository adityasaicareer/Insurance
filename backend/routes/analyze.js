import {Router} from "express";
import {analyzer} from "../controller/analyzer.js";
import {parser} from "../controller/parser.js";
import upload from '../multer.js';
const route=Router();

route.get("/",analyzer)
route.post("/",upload.array("files"),parser);
export default route;