import { useGameStore } from "../../store/GameStore.ts";


function ConnectButton() {
  
  const { gamePhase} = useGameStore(state => state)


  return (
    <div >
      { <button onClick={  ()=> console.log(gamePhase) }>Подключение</button> }
    </div>
  );
}

export default ConnectButton;
