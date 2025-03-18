import  { useWebSocket }  from "../../utils/socket.ts";

function ConnectButton() {
  // const { connectSocket } = useWebSocket();


  return (
    <div >
      { <button /*onClick={ connectSocket }*/>Подключение</button> }
    </div>
  );
}

export default ConnectButton;
