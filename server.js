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
function Movie(id,title,relase_date,poster_path,overview){
    this.id=id,
    this.title=title,
    this.poster_path=poster_path,
    this.relase_date=relase_date,
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
      axios.get(`${url}trending/all/week?api_key=${key}`)
      .then((resp)=>resp.data)
      .then(data=>{
        data=data.results;
        for(let i=0;i<data.length;i++){
        new Movie(data[i].id,data[i].title,data[i].relase_date,data[i].poster_path,data[i].overview);
        }
        res.send(Movie.allMovies)
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