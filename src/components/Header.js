import React, { useState } from "react";
import logos from "./logoImporter";
import SVGComponent from "./searchSvg";
import "../estilos/header.css";

const Header = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const [productosEnModal, setProductosEnModal] = useState([]);

  const deleteProduct = (producto) => {
    const updatedProducts = allProducts.map((item) => {
      if (item.id === producto.id) {
        if (item.cantidad > 1) {
          return { ...item, cantidad: item.cantidad - 1 };
        } else {
          return null;
        }
      }
      return item;
    });

    const filteredProducts = updatedProducts.filter((item) => item !== null);

    setProductosEnModal(filteredProducts);

    if (filteredProducts.length === 0) {
      setAllProducts([]);
      setTotal(0);
      setCountProducts(0);
    } else {
      setAllProducts(filteredProducts);
      setTotal(total - producto.precio);
      setCountProducts(countProducts - 1);
    }
  };

  const clearAllProducts = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
    setProductosEnModal([]);
  };

  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="container-md">
      <header className="header d-flex">
        <div className="images-title d-flex">
          <img src={logos["./logo.png"]} alt="logotipo de celulares" />
          <div className="head-title">
            <h1>CelAllTech</h1>
          </div>
        </div>
        {/*Formulario de Búsqueda */}
        <div className="formulario-md">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Busca tu artículo!!!"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
            >
              <SVGComponent searchValue={searchValue} 
                
              />
            </button>
          </div>
        </div>
        <div className="carrito d-flex-md">
          <i
            className="fa-brands fa-opencart"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            onClick={() => setProductosEnModal([...allProducts])}
          ></i>
          {countProducts > 0 && (
            <div className="superIndiceCarrito d-flex">
              <div>{countProducts}</div>
            </div>
          )}
        </div>
      </header>
      {/*-----------MODAL------------- */}
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
               Tus Productos
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {/*----------Modal Body-header--------------*/}
            <div className="modal-body">
              {productosEnModal.map((producto) => (
                <div className="mod-head-cont d-flex" key={producto.id}>
                  <div className="mod-head-cant">{producto.cantidad}</div>
                  <div className="img-modal">
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="carrito"
                    />
                  </div>
                  <div className="mod-head-desc">{producto.desc}</div>
                  <div className="mod-head-precio"> ${producto.precio}</div>
                  {/* Delete product */}
                  <div className="mod-head-botones">
                    <i
                      className="fa-solid fa-xmark"
                      onClick={() => {
                        deleteProduct(producto);
                      }}
                    ></i>
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <div className="total">
                <div className="mod-foot-desc-total">
                  Valor total de la compra:
                </div>
              </div>
              <div className="mod-foot-cantidad">
                <div>$ {total}</div>
              </div>
              <div className="mod-foot-bots d-flex">
                <div className="mod-foot-cierre">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                </div>
                <div className="mod-foot-save">
                  <button type="button" className="btn btn-primary">
                    Guardar
                  </button>
                </div>
              </div>
            </div>
            <div className="vaciarCarrito d-flex">
              <button onClick={clearAllProducts}>Vaciar Carrito</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
