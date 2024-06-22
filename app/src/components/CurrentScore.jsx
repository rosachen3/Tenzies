import React from "react"
import { useState, useEffect } from 'react'

export default function CurrentScore(props) {
    return (
        <div className="stats--container">
            <div className="score">
                <p>Rolls: {props.count}</p>
                <p>Time: {props.minutes.toString().padStart(2,"0")}:{props.seconds.toString().padStart(2,"0")}</p>
            </div>
        </div>
    )
}