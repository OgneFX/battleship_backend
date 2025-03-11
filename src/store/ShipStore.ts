import { create } from "zustand";
import { IShip } from "../interfaces/interfaces";
import { Phase } from "../interfaces/interfaces";

interface ShipStore {
  pickedShip: IShip | null,
  setPicketShip: (pickedShip: IShip) => void,
  isPicketShip: boolean,
  setIsPicketShip: (isPicketShip: boolean) => void,
  gamePhase: Phase,
  setGamePhase: (gamePhase: Phase) => void,

}

export const useShipStore = create<ShipStore>((set) => ({
  pickedShip: null,
  setPicketShip: (pickedShip: IShip) => {
    set({ pickedShip })
  },

  isPicketShip: false,
  setIsPicketShip: (isPicketShip) => {
    set({ isPicketShip })
  },

  gamePhase: 'placement',
  setGamePhase: (gamePhase :Phase) => {
    set ({ gamePhase })
  }

}))
