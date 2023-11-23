import React, { useRef, useState, useEffect } from "react";
import gear from "./assets/gear.svg";
import "./App.css";

function App() {
  const [minutosVal, setMinutosVal] = useState(15);
  const [segundosVal, setSegundosVal] = useState("00");
  const [edit, setEdit] = useState(true);
  const [countStart, setCountStart] = useState(false);
  const [end , setEnd] = useState(false)

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
          setEnd(!end)
          setCountStart(false);
        }
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [countStart, segundosVal, minutosVal]);

  const handleStart = () => {
    if(!edit){
      setEdit(!edit)
    }
    setCountStart(!countStart);
  };

  const handleMinutes = (event) => {
    setMinutosVal(event.target.value);
  };

  const handleSegundos = (event) => {
    let nuevoValor = event.target.value;

    nuevoValor = Math.min(Math.max(parseInt(nuevoValor) || 0, 0), 59);
    nuevoValor = nuevoValor < 10 ? `0${nuevoValor}` : nuevoValor.toString();

    setSegundosVal(nuevoValor);
  };

  const handleEdit = () => {
    setEdit(!edit);
    if (edit) {
      refMinutos.current.valueOf = minutosVal;
      refSegundos.current.valueOf = segundosVal;
    }
    if (end){
      setEnd(!end)
    }
  };

  const estiloInput = {
    fontSize: "10vw",
  };

  return (
    <>
      <div className="font-babes h-screen w-screen flex flex-col justify-center items-center bg-[#2c2c32] ">
        <div style={{"background":"radial-gradient(circle, transparent 0%, rgba(0, 0, 0, 1) 100%)"}} className={`flex shadow-2xl shadow-black h-[400px] w-[400px] border-8 border-[${end ?"#f00" : "#2dcb62"}] flex-col p-10 items-center justify-center bg-[#202024] rounded-full`}>
        <div className="flex  items-center justify-center">
          <input
            style={estiloInput}
            className={`w-36 h-36  flex text-end text-white bg-transparent focus:outline-none ${edit ? "" : "border-b" }`}
            ref={refMinutos}
            type="text"
            onChange={handleMinutes}
            value={minutosVal}
            readOnly={edit}
          />
          <p className=" text-white font-light box-border" style={estiloInput}>:</p>
          <input
            className={`w-36 h-36  placeholder-text-white text-white text-start bg-transparent focus:outline-none ${edit ? "" : "border-b" }`}
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
          {!countStart ? "START" : "STOP"}
        </p>
        <img
          className="cursor-pointer"
          src={gear}
          onClick={handleEdit}
          alt="Edit Icon"
        />
      </div>
      </div>
    </>
  );
}

export default App;
