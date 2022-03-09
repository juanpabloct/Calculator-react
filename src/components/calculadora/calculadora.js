import { useEffect, useState } from "react";
import { Numero } from "../numeros/Numero";
import "./calculadora.css";

const OPERATORS = {
  "/": (a, b) => a / b,
  X: (a, b) => a * b,
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
};
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
export default function Calculadora() {
  const [operations, setOperations] = useState([]);
  const [cambiando, setCabiando] = useState(false);
  const onKeydown = (e) => {
    console.log(e.key);
    if (numbers.includes(e.key)) {
      setOperations((current) => [...current, e.key]);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", onKeydown);
    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, [operations]);

  useEffect(() => {}, [cambiando]);

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
        >
          =
        </div>
        {["+", "-", "X"].map((value) => (
          <div
            className="grid"
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
        ))}
      </div>
    </div>
  );
}
