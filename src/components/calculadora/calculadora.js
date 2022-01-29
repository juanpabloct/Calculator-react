import { useState } from "react";
import { Numero } from "./Numero";

const OPERATORS = {
  "/": (a, b) => a * b,
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
};
console.log(OPERATORS);
export default function Calculadora() {
  const [operations, setNumbers] = useState([]);
  console.log(operations);
  return (
    <div className="calculadora">
      <div className="pantalla">{operations}</div>
      <div className="teclas">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((number, i) => (
          <Numero
            key={i}
            onClick={() => {
              setNumbers([...operations, number]);
            }}
          >
            {number}
          </Numero>
        ))}
        <div
          className="grid"
          onClick={() => {
            const total = operations.join("");
            const valor = total.replaceAll(",");
            const resultado = eval(valor);
            setNumbers(resultado);
          }}
        >
          =
        </div>
        {[
          { value: "+", label: "suma" },
          { value: "-", label: "resta" },
          { value: "*", label: "X" },
        ].map(({ label, value }) => (
          <div
            className="grid"
            key={value}
            onClick={() => {
              const key = operations.length - 1;
              const last = operations[key];
              console.log(last);
              if (last in OPERATORS) {
                operations[key] = value;
                setNumbers(operations.slice());

                return;
              }
              setNumbers([...operations, value]);
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
