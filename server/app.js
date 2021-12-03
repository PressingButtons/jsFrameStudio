import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const Project = {
  name: null,
  width: null,
  height: null,
  frames: {length: 0, width: 0, height: 0}
}

//methods
const createFrames = data => {
  let rows = data.imageHeight / data.frameHeight;
  let cols = data.imageWidth / data.frameWidth;
  for(let i = 0; i < rows; i++) {
    for(let j = 0; i < cols; j++) {
      
    }
  }
}

//namepace
const gets = { }, posts = { };
//methods
const converToPath = url => {
  return path.join(path.dirname(fileURLToPath(import.meta.url)), url);
}

const home = (req, res) => {
  res.render('home')
}

const getFrames = (req, res) => {
  res.send(Project.frame);
}

const postFrame = (req, res) => {
  Project.frames = req.body.frames;
  res.send(Project.frames);
}

const postNew = (req, res) => {
  createFrames(req.body);
}


export default function(app, express) {
  app.get('/', home);
  app.get('/export', gets.export);
  app.get('/frames', getFrames);
  app.post('/import', posts.LLoad);
  app.post('/frames', posts.Frames);
  app.post('/new', posts.New);
}
