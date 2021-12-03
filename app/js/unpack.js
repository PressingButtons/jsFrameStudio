const framesFrom = (start, end) => {
  let frames = new Array(end - start);
  frames.map((x, i) => {return {index: start + i, onFrame: null}})
}

const getSize = object => {
  for(let key in object.frames) {
    return object.frames[key].sourceSize;
  }
}

const parseAseFrames = object => {
  let frames = [];
  for(let key in object.frames) {
    const frameData = object.frames[key];
    const frame = { clip: frameData.frame, duration: frameData.duration, boxes: null };
    frames.push(frame);
  }
  return frames;
}

const parseAnimations = object => {
  let animations = { };
  for(let key in object.frameTags) {
    animations[key] = { onAnimationEnd: false };
    animations[key].frames = framesFrom(object.from, object.to);
  }
}

export const unpackAseprite = results => {
  let image = results[0], aseobject = results[1];
  return {
    image: image,
    data: {
      frames: parseAseFrames(aseobject),
      animations: parseAnimations(aseobject),
      meta: {
        spritesheet: {width: aseobject.meta.size.w, height: aseobject.meta.size.h},
        cellsize: getSize(aseobject)
      }
    }
  }
}
