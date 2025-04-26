import { PrismaClient } from "../generated/prisma";
import  express,{Request,Response,ErrorRequestHandler } from "express";
import cors from "cors";

// Initializations
const app = express();
const prisma = new PrismaClient();
//cors
app.use(cors());
// Additional middlewares 
app.use(express.json());
// All Active server Detials
app.get("/active",async (req:Request,res:Response) =>{
    const response = await prisma.server.findMany();
    res.json({
        message: "Active Servers Fetch Successfull",
        data: response
    });
});
// Individual Server Details
app.get("/server", async (req:Request,res:Response)=>{
    //@ts-ignore
    let id:string = req.query.id;
    const p_id:number = +id;
    const response = await prisma.server.findUnique({
        where: {
            id: p_id
        }
    });
    if(response) {
        res.json({
            message: "Server is Active",
            data: response
        }); 
    } else {
        res.json({
            message: "Server is Inactive OR Invalid Server if"
        })
    }
});
// Server Log-On
app.post("/entry", async(req:Request,res:Response) =>{
    const name:string = req.body.name;
    const service:string = req.body.service;
    const response = await prisma.server.create({
        data: {
            name,
            service
        }
    });
    const message = response ? "Server Successfully Registered" : "There was some issue SERVER not Registered";
    res.json({
        message: message,
        data: response
    });

});
// Server Log-Of
app.delete("/remove",async(req:Request,res:Response)=>{
    //@ts-ignore
    let id:string = req.query.id;
    const p_id:number = +id;
    const response = await prisma.server.delete({
        where: {
            id: p_id
        }
    });
    const message = response ? "Server Details removed" : "There was some issue SERVER not removed";
    res.json({
        message:message
    });
})
//Global Catches
app.use((err:ErrorRequestHandler,req:Request,res:Response)=>{
    res.json({
        message: "Whoops Server died"
    });
});

app.listen(3000);

console.log(`Port Runnning on ${3000}`);