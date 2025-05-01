import fs from 'node:fs'
import path from 'path';
export default function handler(req, res) {
    if(req.method === 'GET'){
        const p = path.join(process.cwd(), 'data', 'data.json');
        const fileData = fs.readFileSync(p);
        const arr = JSON.parse(fileData);
        // assuming the movies with 8.6 or higher rating are trending one
        const trendyMovies = arr.movies.filter((item,index)=>item.rating >= 8.6)
        res.status(200).json(trendyMovies);
    }
  }