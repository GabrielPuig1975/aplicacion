// imageImporter.js
function importAllImages(r) {
    let images = {};
    r.keys().forEach((key) => (images[key] = r(key)));
    return images;
  }
  
  const images = importAllImages(require.context('../assets/images/', false, /\.(png|jpe?g|gif|svg|webp)$/));
  
  export default images;
  