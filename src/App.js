import { useState } from "react";
import Button from "./components/Button";
import Menu from "./components/Nav/menu";
import Calculadora from "./components/calculadora/calculadora";

function App() {
  const [contador, setContador] = useState(0);
  return (
    <>
      <Menu />
      <div>
        <Button name="Sumar" onClick={() => setContador(contador + 1)} />
        <Button name="Restar" onClick={() => setContador(contador - 1)} />
      </div>
      <div>{contador}</div>
      <Calculadora />
    </>
  );
}

export default App;
