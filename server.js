const express=require("express");
const cors=require("cors");
const app=express();
const movies=require("./Movie data/data.json");
app.use(cors());
function Movies(title,posterPath,overview){
    this.title=title,
    this.posterPath=posterPath,
    this.overview=overview,
    this.allMovies.push(this)
}
Movies.allMovies=[];
function handleNotFound(){
    return {
    status:404,
    responeText:"Sorry, Page Not found"
    }
}
function handleServerErorr(){
    return {
        status:500,
        responeText:"Sorry something went wrong"
    }
}
app.get('/',(req,res)=>{
    try{
        res.send(movies);
    }catch{
        let error=handleServerErorr();
        res.status(error.status).send(error.responeText); 
    }
})
app.get('/favorite',(req,res)=>{
    try{
        res.send("welcome to favorite page")
    }catch{
        let error=handleServerErorr();
        res.status(error.status).send(error.responeText)
    }
})
app.get('*',(req,res)=>{
    let error=handleNotFound();
    res.status(error.status).send(error.responeText)
})
app.listen(5000,()=>{
    console.log("listening on 5000")
})