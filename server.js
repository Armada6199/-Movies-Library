const express=require("express");
const cors=require("cors");
const axios=require("axios");
require('dotenv').config()
const PORT=process.env.PORT;
const url=process.env.URL;
const key=process.env.KEY;
const app=express();
app.use(cors());
app.use(express.json())
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
        res.send("dsa");
    }catch{
        let error=handleServerErorr();
        res.status(error.status).send(error.responeText); 
    }
})
app.get('/trending',(req,res)=>{
   
    try{
    //  let movie=await axios.get(`${url}trending/all/week?api_key=${key}`);
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=668baa4bb128a32b82fe0c15b21dd699&callback=test&query=The&page=2&language=en-US`)
      .then((resp)=>{
        console.log(resp)
        res.send(resp.data)
        
    })
     
   
    }catch(err){
        console.log(err)
    }
})

app.get('/search',async(req,res)=>{
    let movieName=req.query;
    
    try{
        let movie=await axios.get(`${url}search/movie?api_key=${key}&language=en-US&query=${movieName}`)
        res.send(movie.data)
    }catch(err){
        console.log(err)
    }
})
app.get('/movie/:id/reviews',async(req,res)=>{
    const movieId=req.params.id;
    let movieRev=await axios.get(`${url}movie/${movieId}/reviews?api_key=${key}&language=en-US`);
    res.send(movieRev.data.results)
})
app.get('/movie/:id/similar',async(req,res)=>{
    let movieId=req.params.id;
    let similarMovie=await axios.get(`${url}movie/${movieId}/similar?api_key=${key}&language=en-US`)
    res.send(similarMovie.data.results)
})

app.get('*',(req,res)=>{
    let error=handleNotFound();
    res.status(error.status).send(error.responeText)
})
app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})