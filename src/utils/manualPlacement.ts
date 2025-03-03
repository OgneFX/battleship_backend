// const GRID_SIZE = 10;

// export type Cell = {
//   hasShip: boolean;
//   hit: boolean;
// };

// export type Ship = {
//   id: number;
//   size: number;
//   direction: 'horizontal' | 'vertical';
//   positions: { x: number; y: number }[];
// };


// export const canPlaceShip = (
//   grid: Cell[][],
//   x: number,
//   y: number,
//   size: number,
//   direction: 'horizontal' | 'vertical'
// ): boolean => {
//   for (let i = 0; i < size; i++) {
//     let newX = direction === 'horizontal' ? x + i : x;
//     let newY = direction === 'horizontal' ? y : y + i;

//     if (
//       newX >= GRID_SIZE || newY >= GRID_SIZE || grid[newY][newX].hasShip
//     ) {
//       return false; 
//     }
//   }
//   return true;
// };


// export const placeShipManually = (
//   grid: Cell[][],
//   x: number,
//   y: number,
//   size: number,
//   direction: 'horizontal' | 'vertical'
// ): { grid: Cell[][]; ship: Ship | null } => {
//   if (!canPlaceShip(grid, x, y, size, direction)) {
//     return { grid, ship: null };
//   }

//   const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
//   const ship: Ship = { id: Date.now(), size, direction, positions: [] };

//   for (let i = 0; i < size; i++) {
//     let newX = direction === 'horizontal' ? x + i : x;
//     let newY = direction === 'horizontal' ? y : y + i;
//     newGrid[newY][newX].hasShip = true;
//     ship.positions.push({ x: newX, y: newY });
//   }

//   return { grid: newGrid, ship };
// };