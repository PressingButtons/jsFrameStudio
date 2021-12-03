import * as parseForm from './parseForm.js';

let project = null;

const handleForm = { };

handleForm.iase = function(data) {
  parseForm.parseImport(data).then(loadProject);
}

handleForm.iproject = function(data) {
  perseForm.parseImport(data).then(loadProject);
}

const onContentLoad = ( ) => {
  $('#pageContent')[0].contentDocument.addEventListener('projectRequest', onProjectRequest);
}

const onProjectRequest = e => {
  const requests = e.detail.split('|');
  requests.map(x => x.split('.'));
  let response = parseRequests(requests);
  $('#pageContent')[0].contentDocument.dispatchEvent(new CustomEvent('projectResponse', {detail: response}))
}

const onFormData = jqev => {
  const content = jqev.originalEvent.detail;
  handleForm[content.id](content.data);
}

const parseRequests = requests => {
  if(!project) throw 'Error - no project initalized';
  let response = { };
  for(let request of requests) {
    request = request.split('.');
    let type = request[0]
    let value = request[1] || null;
    response[type] = parseRequest[type](value);
  }
  return response;
}

const parseRequest = { };

parseRequest.image = ( ) => {
  return project.image;
}

parseRequest.frame = index => {
  return project.data.frames[index];
}

parseRequest.frames = ( ) => {
  return project.data.frames;
}

const loadProject = data => {
  project = data;
  loadEditor()
}

const loadEditor = ( ) => {
  $('#pageContent').attr('src', '/workspace/frames');
}

export default function( ) {
  $(document).on('formData', onFormData);
  $('#pageContent').on('load', onContentLoad);
}
