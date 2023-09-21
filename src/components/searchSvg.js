import { Data } from "./Data";
import { useState, useEffect } from "react";
import "../estilos/searchSvg.css";

const SVGComponent = ({ searchValue }) => {
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  const palabrasClave = searchValue.split(" ");

  const handleSearch = () => {
    console.log("SearchValue:", searchValue);

    const filtrados = Data.filter(
      (producto) =>
        searchValue.toUpperCase() === producto.descExt ||
        palabrasClave.some(
          (palabra) =>
            producto.descExt.includes(palabra) ||
            producto.desc.includes(palabra)
        )
    );

    setProductosFiltrados(filtrados);

    console.log(filtrados);
  };

  useEffect(() => {
    console.log(productosFiltrados);
  }, [productosFiltrados]);

  return (
    <>
      <i
        className="fa-solid fa-magnifying-glass"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        onClick={handleSearch}
      ></i>
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Tu Búsqueda:
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {productosFiltrados.length > 0 ? (
                <ul>
                  {productosFiltrados.map((producto) => (
                    <li key={producto.id}>
                      <div>
                        <img src={producto.imagen} alt={producto.alt} />
                      </div>
                      <div>
                        <p>{producto.descExt}</p>
                        <p>Precio: ${producto.precio}</p>
                        <p>Stock: {producto.stock}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No se encontraron resultados para "{searchValue}"</p>
              )}
            </div>
            <div class="modal-footer"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SVGComponent;
