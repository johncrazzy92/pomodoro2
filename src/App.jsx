import React, { useRef, useState, useEffect } from "react";
import gear from "./assets/gear.svg";
import "./App.css";

function App() {
  const [minutosVal, setMinutosVal] = useState(15);
  const [segundosVal, setSegundosVal] = useState(0);
  const [edit, setEdit] = useState(true);
  const [countStart, setCountStart] = useState(false);

  const refMinutos = useRef(0);
  const refSegundos = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (countStart) {
      intervalRef.current = setInterval(() => {
        if (segundosVal > 0) {
          setSegundosVal((prevSegundos) => prevSegundos - 1);
        } else if (minutosVal > 0) {
          setMinutosVal((prevMinutos) => prevMinutos - 1);
          setSegundosVal(59);
        } else {
          clearInterval(intervalRef.current);
          setCountStart(false);
        }
      }, 1000);
    }

    return () => clearInterval(intervalRef.current); // Limpiar el intervalo al desmontar el componente
  }, [countStart, segundosVal, minutosVal]);

  const handleStart = () => {
    setCountStart(!countStart);
  };

  const handleMinutes = (event) => {
    setMinutosVal(event.target.value);
  };

  const handleSegundos = (event) => {
    let nuevoValor = event.target.value;

    // Asegurarse de que el valor sea un número y esté entre 0 y 59
    nuevoValor = Math.min(Math.max(parseInt(nuevoValor) || 0, 0), 59);

    // Formatear el valor para siempre tener dos dígitos
    nuevoValor = nuevoValor < 10 ? `0${nuevoValor}` : nuevoValor.toString();

    setSegundosVal(nuevoValor);
  };

  const handleEdit = () => {
    setEdit(!edit);
    if (edit) {
      refMinutos.current.valueOf = minutosVal;
      refSegundos.current.valueOf = segundosVal;
    }
  };

  const estiloInput = {
    fontSize: "10vw",
  };

  return (
    <>
      <div className="font-babes h-screen w-screen flex flex-col justify-center items-center bg-black gap-5">
        <div className="flex h-36 items-center justify-center">
          <input
            style={estiloInput}
            className="w-48 h-44 flex text-end text-white bg-black"
            ref={refMinutos}
            type="text"
            onChange={handleMinutes}
            value={minutosVal}
            readOnly={edit}
          />
          <p className="flex  justify-center text-white font-light" style={estiloInput}>:</p>
          <input
            className="w-48 h-44 placeholder-text-white text-white text-start bg-black"
            style={estiloInput}
            ref={refSegundos}
            type="text"
            onChange={handleSegundos}
            value={segundosVal}
            placeholder="00"
            readOnly={edit}
          />
        </div>
        <p
          onClick={() => handleStart()}
          className="cursor-pointer text-slate-500 font-extrabold tracking-widest text-3xl hover:text-white"
        >
          START
        </p>
        <img
          className="cursor-pointer"
          src={gear}
          onClick={handleEdit}
          alt="Edit Icon"
        />
      </div>
    </>
  );
}

export default App;
