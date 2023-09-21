import React, { useState, useEffect } from "react";
import { Data } from "./Data.jsx";
import "../estilos/cards.css";

function Cards({ allProducts, setAllProducts, setCountProducts, setTotal }) {
  const productos = Data;

  const [contenidoModal, setContenidoModal] = useState("");
  const [contenidoModal2, setContenidoModal2] = useState("");

  const mostrar = (e) => {
    const contenido = e.target.getAttribute("src");
    const contenido2 = e.target.getAttribute("descext");
    setContenidoModal(contenido);
    setContenidoModal2(contenido2);
    console.log("Información:", e.target.id);
    console.log(contenido2);
  };

  // Añadir al carrito
  const addProducts = (producto) => {
    const productInCart = allProducts.find((item) => item.id === producto.id);
    if (productInCart) {
      const updatedProducts = allProducts.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setAllProducts(updatedProducts);
      setTotal((prevTotal) => prevTotal + producto.precio);
    } else {
      const newProduct = { ...producto, cantidad: 1 };
      setAllProducts([...allProducts, newProduct]);
      setTotal((prevTotal) => prevTotal + newProduct.precio);
    }
    setCountProducts((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("carrito")) || [];
    setAllProducts(storedCart);

    const initialTotal = storedCart.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );
    setTotal(initialTotal);
    const initialCount = storedCart.reduce(
      (acc, item) => acc + item.cantidad,
      0
    );
    setCountProducts(initialCount);
  }, [setAllProducts, setCountProducts, setTotal]);

  useEffect(() => {
    const updateLocalStorage = () => {
      localStorage.setItem("carrito", JSON.stringify(allProducts));
    };
    updateLocalStorage();
  }, [allProducts]);

  return (
    <>
      <div className="container cards d-grid">
        {productos.map((producto) => (
          <div className="card" key={producto.id}>
            <div className="card-img">
              <img
                id={producto.id}
                src={producto.imagen}
                alt={producto.alt}
                descext={producto.descExt}
                data-bs-toggle="modal"
                data-bs-target="#openThisModal"
                onClick={mostrar}
              />
            </div>
            <div className="descrip-gen">
              <div className="desc-precio">
                <p>&#36;{producto.precio}</p>
              </div>
              <div className="desc-texto">
                <p>{producto.desc}</p>
              </div>
              <div className="carrito-cont">
                <i className="fas fa-plus mas"></i>
                <i
                  className="fab fa-opencart carrito-card"
                  onClick={() => addProducts(producto)}
                ></i>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/*---------------- Modal --------------------- */}

      <div
        class="modal fade "
        id="openThisModal"
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
                Producto
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {/*---------------- Modal Body--------------------- */}
            <div class="modal-body d-flex">
              {contenidoModal && (
                <div className="imagen-modal">
                  <img src={contenidoModal} alt="Imagen del producto" />
                </div>
              )}
              {contenidoModal2 && (
                <div className="descripcion-modal">
                  <p>{contenidoModal2}</p>
                </div>
              )}
            </div>
            <div class="modal-footer">
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
