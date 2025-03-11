export type IDirection = 'horizontal' | 'vertical';

export interface IShip {
  id: number,
  size: number;
  direction: IDirection;
  position?: number[];
  isPlaces: boolean;
}

export type Phase = 'placement' | 'battle' | 'gameOver';
