import React from 'react'
import './index.css'
import Die from "./components/Die"

export default function App() {
	const diceData = [1,2,3,4,5,6,1,2,3,4]
	const diceElements = diceData.map(die => {
		return <Die value={die} />
	})
	
	return (
    <main className="game-container">
		<div className="dice-container">
			{diceElements}
		</div>
    </main>
  )
}

