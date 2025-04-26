import express,{Request,Response} from "express";
import axios from 'axios';
// ID
let id = 0;
let ser_name = "";
let ser_service = "";
// Express App
const app = express();
// Body-parsing middleware
app.use(express.json());
// Log-On
app.post("/activate",async (req:Request,res:Response)=>{
    const name = req.body.name;
    const service = req.body.service;
    const response = await axios.post("http://localhost:3000/entry",{
        name: name,
        service: service
    });
    //@ts-ignore
    id = response.data.id;
    ser_name = name;
    ser_service = service;
    res.json({
        message: response.data
    });
});
// Log-Off
app.delete("/deactivate", async (req:Request,res:Response) =>{
    const id = req.body.id;
    const response = await axios.delete(`http://localhost:3000/remove?id=${id}`);
    const message = response ? "Server Deactivated Successfull" : "Issue Occured while deactivating Server";
    res.json({
        message: message
    });
})
// Server Details
app.get("/",(req:Request,res:Response)=>{
    res.json({
        message: "Server Details",
        name: ser_name,
        service: ser_service
    });
});
// Requesting Another server details
app.get("/server",async (req:Request,res:Response)=>{
    const id = req.body.id;
    const response = await axios.get(`http://localhost:3000/server?id=${id}`);
    !(response.data==null) ? res.json({message:"Server details fetched successfully", data: response.data}) : res.json({message:"The server dosen't exist"}); 
})
app.listen(3001);
console.log(`The Server is running on ${3001}`);