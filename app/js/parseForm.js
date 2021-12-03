import {readFile} from './utils.js';
import {unpackAseprite} from './unpack.js'

export const parseImport = function(formData) {
  let promises = [];
  for(const value of formData.values()) {
    promises.push(readFile(value))
  }
  return Promise.all(promises).then(unpackAseprite);
}
