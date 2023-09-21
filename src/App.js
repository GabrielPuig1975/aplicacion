import { useState } from "react";
import Header from "./components/Header";
import { Data } from "./components/Data.jsx";
import Cards from "./components/Cards.js";
import Carousel from "./components/Carousel.js";
import "./estilos/app.css";

function App() {
  //Lógica añadir al carrito
  const [allProducts, setAllProducts] = useState([]);
  //Lógica de los totales
  const [total, setTotal] = useState(0);
  //lógica de contar los artículos
  const [countProducts, setCountProducts] = useState(0);

  return (
    <div>
      <Header
        Data={Data}
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
      />
      <Cards
        Data={Data}
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
      />
      <Carousel />
    </div>
  );
}

export default App;
