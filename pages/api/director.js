import fs from 'node:fs'
import path from 'path';
export default function handler(req,res){
    const p = path.join(process.cwd(),'data','data.json')
    const data = fs.readFileSync(p)
    const arr = JSON.parse(data);
    const directors = arr.directors;
    const movies = arr.movies;
    if(req.method==='POST')
    {
        const id = req.body.id;
        // find the director id from the movie's id
        const directorId = movies.find((m)=>m.id===id).directorId;
        // find the director through the director id found above
        const director = directors.find((i)=>i.id===directorId)
        res.status(200).json(director)
    }
    else if(req.method==='GET'){
        directors.map((director,index)=>{
            
        })
        res.status(200).json(directors);
    }
}