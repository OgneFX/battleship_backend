import { FC } from 'react';
import { useGameStore } from '../../store/GameStore.ts';
import { useGameReset } from '../../utils/useGameReset.ts';

interface GameOverModalProps {
  disconnectSocket: any,
}

export const GameOverModal: FC<GameOverModalProps> = ({disconnectSocket}) => {
  const { winner, gamePhase } = useGameStore();
  const { resetGame } = useGameReset(disconnectSocket);
  if (gamePhase !== 'gameOver') return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold text-black">
          {winner ? "ВЫ ВЫИГРАЛИ! 🎉" : "ВЫ ПРОИГРАЛИ! 😢"}
        </h2>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
          onClick={resetGame}
        >
          Играть снова
        </button>
      </div>
    </div>
  )}

