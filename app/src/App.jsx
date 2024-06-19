import React from 'react'
import { useState } from 'react'
import './index.css'
import Die from "./components/Die"
import { nanoid } from "nanoid"

export default function App() {
	const [diceData, setDiceData] = useState(generateRandomDice(1,6,10))
	const numDice = 10
	const diceElements = diceData.map(die => {
		return <Die 
			key={die.id}
			value={die.value}
			isHeld={die.isHeld}
			holdDice={() => holdDice(die.id)}
			/>
	})

	function generateRandomDice(min, max, numDice) {
		const rolls = []
		for (let i=0; i<numDice; i++){
			let randomNum = Math.floor(Math.random() * max) + 1
			const diceObject = {
				id: nanoid(),
				value: randomNum,
				isHeld: false
			}
			rolls.push(diceObject)
		}
		return rolls
	}

	function generateNewDie() {
		let randomNum = Math.floor(Math.random() * 6) + 1
		return {
			id: nanoid(),
			value: randomNum,
			isHeld: false
		}
	}

	function handleReroll() {
		setDiceData(oldDice => oldDice.map(die => {
			return die.isHeld ? 
				die : generateNewDie()
		}))
	}

	function holdDice(id) {
		setDiceData(oldDice => oldDice.map(die => {
			return die.id === id ? 
				{...die, isHeld: !die.isHeld} : die
		}))
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

