const express=require("express");
const cors=require("cors");
const axios=require("axios");
const movieData=require("./Movie data/data.json")
require('dotenv').config()
const PORT=5000;
const app=express();
app.use(cors());
app.use(express.json())
function Movie(title,poster_path,overview){
    this.title=title,
    this.poster_path=poster_path,
    this.overview=overview,
    Movie.allMovies.push(this)
}
Movie.allMovies=[];
function handleNotFound(){
    return {
    status:404,
    responeText:"Sorry, Page Not found"
    }
}
function handleServerErorr(res){
  res.status(500).send("sorry, something went wrong")
}

app.get('/',(req,res,next)=>{
    try{
        let newMovie=new Movie(movieData.title,movieData.poster_path,movieData.overview)
        res.send(newMovie)
    }catch{
        handleServerErorr(res);
    }
})
app.get('/favorite',(req,res,next)=>{
   try{
    res.send("welcome to favorite page")
   }catch{
    handleServerErorr(res);
   }
    
})
app.get('*',(req,res)=>{
    let error=handleNotFound();
    res.status(error.status).send(error.responeText)
})
app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})