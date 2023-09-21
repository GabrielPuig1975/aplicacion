import { Data } from './Data';
import images from './imageImporter';
import "../estilos/carousel.css";

function Carousel() {
  return (
    <div
      id="carouselExampleAutoplaying"
      className="container carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={images['./celu1.jpeg']} className="imagen-carousel" alt={Data.alt} />
        </div>
        <div className="carousel-item">
          <img src={images['./celu2.jpeg']} className="imagen-carousel" alt={Data.alt} />
        </div>
        <div className="carousel-item">
          <img src={images['./celu3.jpeg']} className="imagen-carousel" alt={Data.alt} />
        </div>
      </div>
      
    </div>
  );
}

export default Carousel;
