import * as EditorPanel from './editorpanel.js';
import * as svgLib from './svglib.js';

let ep;
let image;
let currentFrame = null;
let currentRect;
let scale = 1;

let drawing = false, startPos = {x:0, y:0}, endPos = {x: 0, y: 0};

const onInit = ( ) => {
  ep = EditorPanel.create( );
  //$('#editor').append(ep.body);
  ep.appendTo($('#editor'));
  sendRequest('image|frames');
  $('#listenerRect', ep.body).mousedown(onEPMouse);
  $('#listenerRect', ep.body).mouseup(onEPMouse);
  $('#listenerRect', ep.body).mousemove(onEPMouse);
  document.addEventListener('wheel', onResizeWorkspace, {passive:false});
}

const sendRequest = property => {
  document.dispatchEvent(new CustomEvent('projectRequest', {detail: property}));
}

const onEPMouse = function(event) {
  const rect = event.target.getBoundingClientRect( );
  const pos = {x: (event.clientX - rect.x) | 0, y: (event.clientY - rect.y) | 0};
  if(event.type == 'mousedown') {
    startPos.x = (pos.x/scale) | 0;
    startPos.y = (pos.y/scale) | 0;
    drawing = true;
  } else if (event.type == 'mousemove' && drawing) {
    endPos.x = (pos.x/scale) | 0;
    endPos.y = (pos.y/scale) | 0;
    if(!currentRect){
      currentRect = generateRect(startPos, endPos);
      $('g', ep.body).append(currentRect);
    }
    else updateRect(currentRect, startPos, endPos);
  }else if(event.type == 'mouseup') {
    endPos.x = (pos.x/scale) | 0;
    endPos.y = (pos.y/scale) | 0;
    drawing = false;
    if(currentRect) {
      svgLib.setProperties(currentRect, {fill: '#FF000030'})
    }
    currentRect = null;
  }
}

const generateRect = (start, end) => {
  let sx = Math.min(start.x, end.x), sy = Math.min(start.y, end.y),
      ex = Math.max(start.x, end.x), ey = Math.max(start.y, end.y);
  return svgLib.createSVG('rect', {x: sx, y: sy, width: ex - sx, height: ey - sy, "stroke-width": 0.5,  stroke: '#F00', fill:"none"});
}

const updateRect = (rect, start, end) => {
  let sx = Math.min(start.x, end.x), sy = Math.min(start.y, end.y),
      ex = Math.max(start.x, end.x), ey = Math.max(start.y, end.y);
  svgLib.setProperties(currentRect, {x: sx, y: sy, width: ex - sx, height: ey - sy});
}

const onFrameClick = function(e) {
  currentFrame = $(this).index( );
  sendRequest(`frame.${currentFrame}`);
}

const onRespone = ev => {
  const response = ev.detail;
  if(response.image) image = response.image;
  if(response.frame) selectFrame(response.frame);
  if(response.frames) initalizeFrames(response.frames);
}

const onResizeWorkspace = function(event) {
  event.preventDefault( );
  if(event.deltaY < 0 ) scale = ep.updateScale(-0.1)
  else scale =ep.updateScale(0.1);
}

const selectFrame = frame => {
  ep.drawImage(image, frame.clip);
}

const initalizeFrames = frames => {
  $('.frames .content').html('');
  for(let i = 0; i < frames.length; i++) {
    const frame = drawCanvas(image, frames[i]);
    frame.id = 'frame_' + i;
    $('.frames > .content').append(frame);
    $(frame).click(onFrameClick);
  }
}

const drawCanvas = (image, frame) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const aspect = frame.clip.w / frame.clip.h;
  const size = 120;
  if(aspect > 0 ) {
    canvas.width = size;
    canvas.height = size * (frame.clip.h / frame.clip.w);
  } else {
    canvas.height = size;
    canvas.width = size * aspect;
  }
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = '#AAA';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.drawImage(image, frame.clip.x, frame.clip.y, frame.clip.w, frame.clip.h, 0, 0, canvas.width, canvas.height);
  return canvas;
}

const onReady = ( ) => {
  EditorPanel.init( ).then(onInit);
  $(document).on('projectResponse', onRespone);
}

$(document).ready(onReady);
