import { useEffect, useState, useCallback } from "react";
import { Numero } from "../numeros/Numero";
import buttonDelete from "../../assets/img/buttonDelete.svg";
import "./calculadora.css";

const OPERATORS = {
  "÷": (a, b) => a / b,
  X: (a, b) => a * b,
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
};

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

export default function Calculadora() {
  const [operations, setOperations] = useState([]);
  const [cambiando, setCabiando] = useState(false);
  const eliminar = (current) => current.slice(0, current.length - 1);
  const onKeydown = useCallback((e) => {
    if (numbers.includes(e.key)) {
      setOperations((current) => [...current, e.key]);
    } else {
      if (e.key === "Backspace") {
        setOperations((current) => eliminar(current));
      }
    }
  }, []);

  useEffect(() => {
    console.log(234234);
    document.addEventListener("keydown", onKeydown);
    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, [onKeydown]);

  return (
    <div className="calculadora">
      <div className="pantalla">
        <div>{operations}</div>
      </div>
      <div className="teclas">
        {numbers.map((number, i) => (
          <Numero
            key={i}
            onClick={() => {
              setOperations([...operations, number]);
            }}
          >
            {number}
          </Numero>
        ))}
        {["+", "-", "x", "÷"].map((value) => (
          <div
            className="grid"
            id="operadores"
            key={value}
            onClick={() => {
              const key = operations.length - 1;
              const last = operations[key];
              if (last in OPERATORS) {
                operations[key] = value;
                setOperations(operations.slice());

                return;
              }
              setOperations([...operations, value]);
            }}
          >
            {value}
          </div>
        ))}{" "}
        <img
          src={buttonDelete}
          alt="eliminar"
          id="eliminar"
          onClick={() => {
            setOperations((current) => eliminar(current));
          }}
        />
        <div
          className="grid"
          onClick={() => {
            setCabiando(!cambiando);
            let groupA = "";
            let groupB = "";
            let operator = "";
            const getTotal = () =>
              (operator && OPERATORS[operator](+groupA, +groupB)) || groupA;
            for (const operation of operations) {
              if (operation in OPERATORS) {
                if (operator) {
                  groupA = String(getTotal());
                  groupB = "";
                }
                operator = operation;
              } else {
                if (operator) {
                  groupB += operation;
                } else groupA += operation;
              }
            }
            setOperations([getTotal()]);
          }}
          id="igual"
        >
          =
        </div>
      </div>
    </div>
  );
}
