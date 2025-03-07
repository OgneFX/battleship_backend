import { create } from "zustand";
import { IShip } from "../interfaces/Ship";

interface ShipStore {
  pickedShip: IShip | null,
  setPicketShip: (pickedShip: IShip) => void;

}

export const useShipStore = create<ShipStore>((set) => ({
  pickedShip: null,
  setPicketShip: (pickedShip: IShip) => {
    set({ pickedShip })
  }
}))
