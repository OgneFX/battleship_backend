import {useState, useEffect} from 'react'
import GameBoard from './gameBoard'
import ButtonShip from './buttonShip'
import mock from '../data/mock_ships'

export default function game() {

    const[size, setSize] = useState(0)
    const[direction, setDirection] = useState("horizontal")
    const[onSelected, setSelected] = useState(false)
    const[shipId, setShipId] = useState(0)

    const shipInfo = (id: number, size: number, direction: string, isSelected:boolean) => {
        setShipId(id)
        setSize(size)
        setDirection(direction)
        setSelected(isSelected)
    }

    const changeSelectedShip = (selected: boolean) => {
        setSelected(selected)
        mock.map(item => {
            if(item.id === shipId)
                return item.isPlaces = !selected
        })
        console.log(mock)
    }

    useEffect(() => {
        const handlerKeyPress = (e: KeyboardEvent) => {
            
            if(onSelected === true && e.key.toLowerCase() === "r") {
                setDirection((prev) => prev === "horizontal" ? "vertical" : "horizontal" )
                console.log(onSelected, direction)
            }
            
        };

        window.addEventListener("keydown", handlerKeyPress);
    
        return () => {
          window.removeEventListener("keydown", handlerKeyPress);
        };
      }, [onSelected]);

  return (
    <div>
        <ButtonShip shipInfo={shipInfo}/>
        <GameBoard size={size} direction={direction} isSelected={onSelected} changeSelectedShip={changeSelectedShip}/>
    </div>
  )
}
