import { create } from "zustand";
import { Phase, Grid } from "../interfaces/interfaces";
import { GRID_SIZE } from '../data/conatants';

const makeGrid = () => {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => ({
      hasShip: false,
      hit: false,
      isHelpView: false,
      isPlace: true,
    }))
  );
};

interface GameStore {
  gamePhase: Phase,
  setGamePhase: (gamePhase: Phase) => void,
  grid: Grid,
  setGridSM: (grid: Grid) => void
  enemyGrid: Grid,
  setEnemyGrid: (enemyGrid: Grid) => void
  turn: boolean,
  setTurn: (turn: boolean) => void
}

export const useGameStore = create<GameStore>((set) => ({
  gamePhase: null,
  setGamePhase: (gamePhase :Phase) => {
    set ({ gamePhase })
  },

  grid: makeGrid(),
  setGridSM: (grid: Grid) => {
    set({ grid })
  },

  enemyGrid: makeGrid(),
  setEnemyGrid: (enemyGrid: Grid) => {
    set({ enemyGrid })
  },

  turn: false,
  setTurn: (turn) => {
    set ({ turn })
  }
  
}))