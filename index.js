const express=require('express');

const app=express();

const port=8086;
app.listen(port,()=>{
    console.log(`server is running at port: ${port}`);
})

app.use(express.json());


const users=[
    {id: 1,
firstName: "Anshika",
lastName: "Agarwal",
hobby:"Teaching"},
    {id: 2,
firstName: "Ritik",
lastName: "Agarwal",            
hobby:"Travelling"},
    {id: 3,
firstName: "Ankit",
lastName: "Agarwal",            
hobby:"Reading"},



  
];

app.use((req, res, next) => {
    console.log(
        `Method: ${req.method}, 
        URL: ${req.originalUrl}, 
        Status: ${res.statusCode}
        ip:${req.ip},
        Time: ${new Date().toISOString()}, 
        `
    );
    next();
});



app.get("/",(req,res)=>{
    console.log("Home page accessed")
    res.status(200).send("Welcome to the Home page");
  
    
})


//logic for get method
app.get("/users",(req,res)=>{
    try{
        console.log("User list accessed")
        return res.status(200).json(users)
    }
    catch(err)
    {
        res.status(500).json({message:err.message})
    }
        
})

//logic for get method by id
app.get("/users/:id",(req,res)=>{

    try{
        const id=req.params.id;
        const user =users.find((user)=> id==user.id) 
        if(!user)
            return res.status(404).json("user not found");
        else
        return res.status(200).json(user)
    }
    catch(err)
    {
        res.status(500).json({message:err.message})
    }
    

})

//middleware for post method

function validation(req,res,next)
{
 const{id,firstName,lastName,hobby}=req.body;
if(!id){
    return res.status(400).json("Id is required");
}
const idexists=users.find((user)=>user.id==id)
if(idexists && req.method==="POST")
{
    return res.status (400).json("Id already exists");
    
}
if(!firstName){
    return res.status(400).json("First name is required");
}
else  if(!lastName){
    return res.status(400).json("Last name is required");
} else  if(!hobby){
    return res.status(400).json("Hobby is required");
}

 next();

}

// logic for post method

app.post("/user",validation,(req,res)=>{

    try{
        users.push(req.body);
        res.status(201).json("user added successfully");
    }

    catch(err)
    {
        res.status(500).json({message:err.message})
    }
    
})



//logic for put method to change the entire object

app.put("/user/:id",validation,(req,res)=>{
   

    try{
            const id=req.params.id;

          const index=  users.findIndex((user)=>user.id==id)


        if(index==-1)
            return res.status(404).json("user not found");
        else
        {
            users[index]={id:id,...req.body};
            res.status(200).json("user details updated successfully");
        }
            
    }
    catch(err){
      return   res.status(500).json({message:err.message})
    }


})

//logic for delete method

app.delete("/user/:id",(req,res)=>{

try{

       const id=req.params.id;


       const index= users.findIndex((user)=>id==user.id)
       if (index==-1)
        return res.status(404).json("message : user not found");
    else{
       users.splice(index,1);
       res.status(200).json("user deleted successfully");
    }


}
catch(err){
   return  res.status(500).json({message:err.message}) 
}
 
})