import express, {Express, Request, Response} from "express";
import bodypar from "body-parser";
import cors from "cors";
import { TodoItem } from "./item.model";

const items: TodoItem[] = [];
const port = 30;

const app: Express = express();
app.use(cors()),
app.use(bodypar.json()),

app.get("/items", (req: Request,res:Response) => {
    res.status(200).send(items);
});

app.get("/items", (req: Request,res:Response) => {
    if(!req.body) return res.status(400).send("No body provided");
    
    const item: TodoItem = req.body;
    
    if(!item.email){
        item.email = req.body;
    }
    items.push(item);
    res.status(200).send(items);
});

app.listen(port, () => {
    console.log('Now listening on port: ' + port);
});
