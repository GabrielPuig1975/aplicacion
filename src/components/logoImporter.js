function importAllLogos(r) {
    let logos = {};
    r.keys().forEach((key) => (logos[key] = r(key)));
    return logos;
  }
  
  const logos = importAllLogos(require.context('../assets/logos/', false, /\.(png|jpe?g|gif|svg|webp)$/));
  
  export default logos;