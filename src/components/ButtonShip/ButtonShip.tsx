import { useState, useEffect } from 'react'
import { ships } from '../../data/mock_ships'
import { IShip } from '../../interfaces/Ship';
import { useShipStore } from '../../store/ShipStore';

type buttonShipProps = {
  shipInfo:(id: number, size: number, direction: string, isSelected:boolean) => void;
}

export function ButtonShip({shipInfo}:buttonShipProps) {

  const [selectedShip, setSelectedShip] = useState<number | null>(null);
  const { pickedShip, setPicketShip } = useShipStore(state => state)
  
  const handleClickOutside = () => {
    setSelectedShip(null);
    shipInfo(0, 0, "horizontal", false)
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
    // setSelectedShip(id)
    setPicketShip(ship)
  }

  console.log(ships)
    

      
  return (
    <div className="grid grid-cols-2 gap-2 p-4 border border-gray-400">
      {ships.map((ship) => (
        <div
          key={ship.id}
          className={`flex space-x-1 p-1 cursor-pointer transition-all ${
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
