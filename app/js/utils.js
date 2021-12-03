export const loadImage = url => {
  return new Promise(function(resolve, reject) {
    let image = new Image( );
    image.onload = event => {resolve(image)};
    image.onerror = event => {reject(event)};
    image.src = url;
  });
}

export const readFile = file => {
  if(file.type.match('image*')) return readImageFile(file);
  if(file.type.match('application/json')) return readJSONFile(file);
  if(file.type.match('application/text')) return readTextFile(file);
  return Promise.reject('cannot load file');
}

const readImageFile = file => {
  return new Promise(function(resolve, reject) {
    let reader = new FileReader( );
    reader.onload = event => {
      resolve(loadImage(event.target.result))
    }
    reader.onerror = event => {
      reject(event)
    }
    reader.readAsDataURL(file)
  });
}

const readJSONFile = file => {
  return new Promise(function(resolve, reject) {
    let reader = new FileReader( );
    reader.onload = event => {
      let object = JSON.parse(event.target.result);
      resolve(object);
    }
    reader.onerror = event => {
      reject(event);
    }
    reader.readAsText(file);
  });
}

const readTextFile = file => {
  return new Promise(function(resolve, reject) {
    let reader = new FileReader( );
    reader.onload = event => {
      resolve(event.target.result);
    }
    reader.onerror = event => {
      reject(event);
    }
    reader.readAsText(file);
  });
}

export const getResource = url => {
  return new Promise(function(resolve, reject) {
    $.get(url).done(resolve).fail(reject)
  });
}
