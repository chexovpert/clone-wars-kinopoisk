import React from "react"
import './car.css'

export default (props) => (
    <div className='Car'>
        <h1>hello world</h1>
        <p>Car name <strong>{props.name}</strong></p>
        <p>Car year <strong>{props.year}</strong></p>
        <button onClick={props.handler}>click</button>
    </div>
)