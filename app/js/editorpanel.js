import {getResource} from './utils.js';

let sourceHTML;

const EditorPanel = function(html) {

  let scale = 1;

  const getContext = ( ) => {
    const ctx = $('canvas', html)[0].getContext('2d');
    ctx.imageSmoothingEnabled = false;
    return ctx;
  }

  const resize = (width, height) => {
    $(html).css({width: width, height: height})
    $('svg', html).css({width: width, height: height})
    $('canvas', html)[0].width = width;
    $('canvas', html)[0].height = height;
  }

  const updateScale = num => {
    scale += num;
    if(scale < 0.5) scale = 0.5
    if(scale > 5) scale = 5;
    $(html).css('transform', `scale(${scale})`);
    return scale;
  }

  const drawImage = (image, clip) => {
    clip = clip ? clip : {x:0, y:0, w: image.width, h: image.height};
    let ctx = getContext( );
    resize(clip.w, clip.h);
    ctx.drawImage(image, clip.x, clip.y, clip.w, clip.h, 0, 0, clip.w, clip.h);
  }

  const appendTo = element => {
    element.append(html);
  }

  return {
    drawImage: drawImage,
    resize: resize,
    getContext: getContext,
    appendTo: appendTo,
    updateScale: updateScale,
    get body( ) {return html}
  }

}

export const create = function(width, height) {
  if(!sourceHTML) throw 'Editor Panel is not initialized';
  let container = document.createElement('div');
  $(container).addClass('editorpanel');
  $(container).html(sourceHTML)
  let panel = new EditorPanel(container);
  panel.resize(width, height);
  return panel;
}

export const init = ( ) => {
  return getResource('/editorpanel').then(html => {sourceHTML = html});
}
