import { useEffect } from 'react'
import { ships } from '../../data/mock_ships'
import { IShip } from '../../interfaces/interfaces';
import { useShipStore } from '../../store/ShipStore';

export function ButtonShip() {
  const { pickedShip, setPicketShip, setIsPicketShip} = useShipStore(state => state)
  const handleClickOutside = () => {
    setPicketShip({ id: 0, size: 0, direction: 'horizontal', isPlaces: false });
    setIsPicketShip(false)
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
    
  const handlerSelected = (e: React.MouseEvent<HTMLElement>, ship: IShip) => {
    if (ship.isPlaces) return;
    e.stopPropagation();
    setPicketShip(ship)
    setIsPicketShip(true)
  }

  return (
    <div className='grid grid-cols-2 gap-2 p-4 border border-gray-400'>
      {ships.map((ship) => (
        <div
          key={ship.id}
          className={`flex space-x-1 p-1 cursor-pointer transition-all size-auto ${
            ship.isPlaces ? "pointer-events-none opacity-50" : ""}`
          }
          onClick={(e) => {
            handlerSelected(e, ship);
          }}
        >
          {Array.from({ length: ship.size }).map((_, index) => (
            <div
              key={index}
              className={`w-10 h-10 border border-gray-600 flex items-center justify-center transition-all
                ${
                  ship.isPlaces
                    ? "border-dashed bg-gray-100" 
                    : pickedShip?.id === ship.id
                    ? "bg-blue-500"
                    : "bg-gray-300"
                }`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
    
}
