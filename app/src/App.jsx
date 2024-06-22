import React from 'react'
import { useState, useEffect } from 'react'
import './index.css'
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import CurrentScore from './components/CurrentScore'

export default function App() {
	const numDice = 10
	const [diceData, setDiceData] = useState(generateRandomDice(1,6,10))
	const [winCondition, setWinCondition] = React.useState(false)
	
	//***** CURRENT SCOREBOARD LOGIC *****/
	const [count, setCount] = React.useState(1)
	const [time, setTime] = useState(0)
	const [isRunning, setIsRunning] = useState(false)

	// Continuously runs the timer until isRunning is toggled
	useEffect(() => {
		let interval; 
		if (isRunning) {
			interval = setInterval(() => setTime(time + 1), 10);
		}
		else {
			clearInterval(interval)
		}
		return () => clearInterval(interval)
	}, [isRunning, time])

	const minutes = Math.floor((time % 360000) / 6000)
	const seconds = Math.floor((time % 6000) / 100)

	function toggleTimer() {
		setIsRunning(!isRunning)
	}

	function resetScoreBoard() {
		setTime(0)
		setCount(0)
	}

	useEffect(() => {
		const allHeldAndSame = diceData.every(die => die.isHeld && die.value === diceData[0].value)
		if (allHeldAndSame) {
			setWinCondition(true)
			toggleTimer()
		} 
	}, [diceData])
	
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
		if (!winCondition) {
			setCount(prevCount => prevCount + 1)
			setDiceData(oldDice => oldDice.map(die => {
				return die.isHeld ? 
					die : generateNewDie()
			}))
		} else { //Win Game
			setWinCondition(false)
			setDiceData(generateRandomDice(1,6,10))
			resetScoreBoard()
		}
	}

	function holdDice(id) {
		if (!isRunning) { toggleTimer() }
		setDiceData(oldDice => oldDice.map(die => {
			return die.id === id ? 
				{...die, isHeld: !die.isHeld} : die
		}))
	}

	return (
    <main className="game-container">
		{winCondition && <Confetti/>}
		<h1>Tenzies</h1>
		<p className="instruction--body"><span className="instruction--heading">Instructions: </span>Click on a die to save it. To win the game, roll the dice until you have saved the same number onto each die.</p>
		<CurrentScore 
			count={count}
			minutes={minutes}
			seconds={seconds}
		/>
		<div className="dice-container">
			{diceElements}
		</div>
		<button className="roll" onClick={handleReroll}>{winCondition ? "New Game" : "Roll"}</button>
    </main>
  )
}

