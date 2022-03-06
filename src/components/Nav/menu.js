import React from "react";
import clsx from "clsx";
import { useState } from "react";
import "./menu.css";

function Menu() {
  const arrayGeneros = [
    "Accion",
    "Terror",
    "Ciencia Ficcion",
    "Aventura",
    "Comedia",
    "Fantasia",
  ];
  const [hover, setShow] = useState(false);
  const generos = arrayGeneros.map((value) => <span key={value}>{value}</span>);
  console.log(hover);
  return (
    <>
      <div className="menu">
        <div>Home</div>
        <div
          className="c-peliculas"
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          Peliculas
          <div className={clsx("peliculas", hover ? "show" : "")}>
            {generos}
          </div>
        </div>
        <div>Series</div>
      </div>
    </>
  );
}

export default Menu;
