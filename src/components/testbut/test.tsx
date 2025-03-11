import React from "react";
import  socket  from '../../utils/socket.ts';

function Test() {
  const sendMessage = () => {
    socket.send(JSON.stringify({ type: "shoot", message: "Выстрел в клетку (2,3)" }));
  };

  return (
    <div >
      
      <button onClick={sendMessage}>Отправить выстрел</button>
    </div>
  );
}

export default Test;
