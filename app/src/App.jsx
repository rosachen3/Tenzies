import React from 'react'
import { useState } from 'react'
import './index.css'
import Die from "./components/Die"

export default function App() {
	const [diceData, setDiceData] = useState(generateRandomDice(1,6,10))
	const numDice = 10
	const diceElements = diceData.map(die => {
		return <Die value={die} />
	})
	
	function generateRandomDice(min, max, numDice) {
		const rolls = []
		for (let i=0; i<numDice; i++){
			let randomNum = Math.floor(Math.random() * max) + 1
			rolls.push(randomNum)
		}
		return rolls
	}

	function handleReroll() {
		setDiceData(generateRandomDice(1,6,numDice))
	}

	return (
    <main className="game-container">
		<div className="dice-container">
			{diceElements}
		</div>
		<button className="roll" onClick={handleReroll}>Roll</button>
    </main>
  )
}

