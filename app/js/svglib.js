const namespace = "http://www.w3.org/2000/svg";

export const createSVG = (type, properties) => {
  const svg = document.createElementNS(namespace, type);
  setProperties(svg, properties);
  return svg;
}

export const setProperties = (svgElem, properties) => {
  for(const property in properties) {
    svgElem.setAttributeNS(null, property, properties[property]);
  }
}
