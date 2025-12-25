const express=require('express');

const app=express();

const port=5081;

const users=[
    {id: "1",
firstName: "Anshika",
lastName: "Agarwal",
hobby:"Teaching"},
    {id: "2",
firstName: "Ritik",
lastName: "Agarwal",            
hobby:"Travelling"},
    {id: "3",
firstName: "Ankit",
lastName: "Agarwal",            
hobby:"Reading"},



  
];

app.listen(port,()=>{
    console.log(`server is running at port: ${port}`);
})

app.get("/",(req,res)=>{
  
    
})

app.get("/users",(req,res)=>{
        res.send(users);
})


app.get("/users/:id",(req,res)=>{
const id=req.params.id;
// const user=users.find((usr)=>usr.id===id);
// res.send(user);
users.forEach((user)=>{
    if(user.id==id)
        res.send(user);
})

});





app.post("/user",(req,res)=>{
    user.push(req.body);
    res.send("user added successfully");
})



app.put("/user/:id",()=>{
   
    const id=req.params.id;
    users.forEach(()=>{
        if(user.id==id)
        {
            user.firstName=req.body.firstName;
            user.lastName=req.body.lastName;
            user.hobby=req.body.hobby;
            res.send("user details updated successfully");
        }
    })

})

app.delete("/user/:id",(req,res)=>{

    const id=req.params.id;

    users.forEach((user)=>{
        if(user.id==id)
        {
            const index=users.indexOf(user);
            users.splice(index,1);
            res.send("user deleted successfully");
        }
    
        })
})