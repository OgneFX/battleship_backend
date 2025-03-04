import {useState, useEffect} from 'react'
import mock from '../data/mock_ships'


type buttonShipProps = {
  shipInfo:(size: number, direction: string, isSelected:boolean) => void;
}




export default function buttonShip({shipInfo}:buttonShipProps) {

    const [selectedShip, setSelectedShip] = useState<number | null>(null);
    
    const handleClickOutside = () => {
      setSelectedShip(null);
    };

    console.log(selectedShip)

    useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);
    

    const ships = mock;
    const handlerSelected = (id:number, size: number, direction: string) => {
         setSelectedShip(id)
         
         shipInfo(size, direction, true)
    }

    console.log(ships)
    

      
      return (
        <div className="flex flex-col space-y-2 p-4 border border-gray-400">
          {ships.map((ship) => 

              <div
                key={ship.id}
                className={`flex space-x-1 p-1 cursor-pointer backdrop-opacity-0 `}
                onClick={(e) => {
                  e.stopPropagation();
                  handlerSelected(ship.id, ship.size, ship.direction);
                  
                }}
                
              >
                {Array.from({ length: ship.size }).map((_, index) => (
                  <div key={index} className={`w-10 h-10 border border-gray-600 
                    ${selectedShip === ship.id ? "bg-blue-500" : "bg-gray-300"}`
                  }></div>
                ))}
              </div>
            
          )}
        </div>
      );
}
