import path from 'path';
import {fileURLToPath} from 'url';
//
const converToPath = url => {return path.join(path.dirname(fileURLToPath(import.meta.url)), url)}
//
const getEditorPanel = (req, res) => {
  let path = converToPath('../views/html/editorpanel.html');
  res.sendFile(path);
}

const getHome = (req, res) => {
  res.render('home', {layout: 'app'});
}

const getPrompt = (req, res) => {
  res.render(req.params.type, {layout: 'prompt'})
}

const getWorkspace = (req, res) => {
  const type = req.params.type || 'frames';
  res.render(type, {layout: 'editor'})
}

const send404 = (req, res) => {
  res.render('404');
}

export default function (app, express) {
  app.get('/', getHome);
  app.get('/prompt/:type', getPrompt);
  app.get('/workspace/:type', getWorkspace);
  app.get('/editorpanel', getEditorPanel);
  app.get('*', send404);
}
