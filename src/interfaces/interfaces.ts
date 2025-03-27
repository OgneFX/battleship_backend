export type IDirection = 'horizontal' | 'vertical';

export interface IShip {
  id: number,
  size: number;
  direction: IDirection;
  position?: number[];
  isPlaces: boolean;
}

export interface gridCell {
  hasShip: boolean;
  hit: boolean;
  isHelpView: boolean;
  isPlace: boolean;
}

export interface useGameResetProps {
  disconnectSocket: () => void
}

export type Grid = gridCell[][]

export type Phase = 'placement' | 'battle' | 'gameOver' | null;
