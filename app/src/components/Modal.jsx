import React from "react"
import { useState } from "react"
import "./Modal.css"

export default function Modal(props) {
    return (
        <div className="modal--background">
            <div className="modal--container">
                <div>
                </div>
                <div className="modal--title">
                    <h1>Top Scores</h1>
                </div>
                <div className="modal--body">
                    <p>Body</p>
                    <button onClick={props.closeModal}>X</button>
                </div>
            </div>
        </div>
    )
}