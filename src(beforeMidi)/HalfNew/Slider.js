import './Slider.css';
import React, { useState, useEffect, useRef } from 'react';

function Slider(props) {

  const [isActive, setIsActive] = useState(false);

  const inputRef = useRef()

  let className = 'slider'


  if (props.lighted) className += ` slider_lighted`

  if (props.disabled) className += ` slider_disabled`

  if (isActive) className += ` slider_selected`


  const onMouseMove = e => {
    if (isActive) {
        console.log(parseFloat(inputRef.current.value));
        let newValue = parseFloat(inputRef.current.value) - e.movementY * (props.step ? props.step : (props.max - props.min) / 200)
        if (newValue < props.min) newValue = props.min
        if (newValue > props.max) newValue = props.max


        // inputRef.current.value = newVa lue
        props.onChange(newValue)

    }
  }

  const onKeyDown = e => {
    if (e.repeat) return
    if (e.code === props.hotkey) setIsActive(true)
  }

  const onKeyUp = e => {
    if (e.code === props.hotkey) setIsActive(false)
  }

  const onWinKeyUp = e => {
    setIsActive(false)
  }


  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('mouseup', onWinKeyUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('mouseup', onWinKeyUp)
    }
  })

  return (
    <div>
      <div className="hotkey">{props.hotkey || ' '}</div>
      <input
        ref={inputRef}
        disabled={props.disabled}
        caption={props.caption}
        caption2={props.caption2}
        className="slider__input"
        type="range"
        min={props.min}
        max={props.max}
        value={props.value}
        step={props.step ? props.step : "any"}
        onInput={e => {
          props.onChange(e.target.value)
        }}

        />
        <div
          className="slider__knob"
          onMouseDown={()=>{
            setIsActive(true)
          }}
          style={{
            transform: `rotate(${(props.value - props.min) / (props.max - props.min) * 270 - 45}deg)`
          }}
        >
        <div className="slider__mark"/>
        </div>
    </div>

  );
}

export default Slider;
