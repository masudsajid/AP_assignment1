import path from "path";
import fs from "fs";

export default function handler(req, res) {
  const p = path.join(process.cwd(), "data", "data.json");
  const arr = fs.readFileSync(p);
  const Data = JSON.parse(arr);
  const genres = Data.genres;
  if (req.method === "GET") {
    res.status(200).json(genres);
  }
}
