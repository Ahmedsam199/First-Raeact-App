const express = require("express");
const app = express();
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let Todos = [
  {
    id: 0,
    task: "clean house",
  },
  {
    id: 1,
    task: "clean room",
  },
];
app.listen(8000);
app.set("view engine", "ejs");

app.get("/test", (req, res) => {
  res.send(Todos);
});
app.post("/add", (req,res) => {
    
 let newid1 = Todos.map(function (ele) {
   return ele.id ;
 });
if(newid1.length>0){
  newid1.sort();
  ID = newid1[newid1.length - 1] + 1;
}else{
    ID=0;
}
    Todos.push({
        id:ID,
   task:req.body.task
    })
   res.send(req.body);
   
    console.log(Todos);
  
});
app.get("/all", (req, res) => {
  res.send(Todos);
});
app.get("/id/:id", (req, res) => {
  const find = Todos.find((x) => x.id == req.params.id);
  res.send(find);
});
app.get("/delete/:id", (req, res) => {
   const find = Todos.findIndex((x) => x.id == req.params.id);
   
   Todos.splice(find,1)
   res.send(Todos);
   

});
app.post('/update/:id',(req,res)=>{
    const find = Todos.findIndex((x) => x.id == req.body.id);
    Todos[find]={
      id: req.body.id,
      task:req.body.task
    };
    res.send(Todos);
})
app.get('/deleteall',(req,res)=>{
    Todos=[];
    res.send(Todos);
})