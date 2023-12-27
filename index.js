import express from "express";
import bodyParser from "body-parser";
import { writeFile } from "node:fs";
import { Buffer } from 'node:buffer';
import { readFile } from 'node:fs';

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

let tasks = [];
  // read file
  
  readFile('message.txt', "utf8", (err, tasks) => {
    if (err) throw err;
    tasks = tasks.split('\n').filter(task => task.trim() !== '');
    console.log("ok read file is ready");
  }); 

  // wirte
  function writeFilefunction (tasks) {
    let taskString = tasks.join("\n");                    // array to string
    const data = new Uint8Array(Buffer.from(taskString));
    writeFile('message.txt', data, (err) => {
    if (err) throw err;
    console.log('write file is ready');
  }); 

  }

app.get("/", (req, res) =>{
    const date = new Date();
    const data = {
        tasks : tasks,
        today : date,
    }     
    res.render("index.ejs", { data });
});

app.post("/add", (req, res) =>{
    
    let task = req.body["todo-text"];
    tasks.push(task);
   
    writeFilefunction(tasks);

    res.render("index.ejs",{
    tasks : tasks})
   });

app.post("/delete", (req, res) => {
    const index = req.body["index"];
    if ( index ) {
      tasks.splice(index, 1);
      
    } 
    
    writeFilefunction(tasks);
    res.render("index.ejs", {tasks});
     
});  //pending
 
app.listen(port, () => {
    console.log(`server is listening on the port ${port}`)
});

//index >= 0 && index < tasks.length