import fs from "node:fs";
import path from "path";
export default function handler(req, res) {
    const p = path.join(process.cwd(),'data','data.json')
    const data = fs.readFileSync(p)
    const allMovies = JSON.parse(data);
  if (req.method === "GET") {
    res.status(200).json(allMovies.movies);
  } else if (req.method === "POST") {
    const  id  = req.body.id
    const movie = allMovies.movies.find((m)=>m.id===id);
    res.status(200).json(movie);
  }
}
