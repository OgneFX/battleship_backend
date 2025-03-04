import {useState} from 'react'
import GameBoard from './gameBoard'
import ButtonShip from './buttonShip'

export default function game() {

    const[size, setSize] = useState(0)
    const[direction, setDirection] = useState("")
    const[isSelected, setSelected] = useState(false)

    const shipInfo = (size: number, direction: string, isSelected:boolean) => {
        setSize(size)
        setDirection(direction)
        setSelected(isSelected)
    }

  return (
    <div>
        <ButtonShip shipInfo={shipInfo}/>
        <GameBoard size={size} direction={direction} isSelected={isSelected}/>
    </div>
  )
}
