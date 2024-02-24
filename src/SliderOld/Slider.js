import './Slider.css';
import React, { useState, useEffect, useRef } from 'react';

function Slider(props) {

  const [isKeyDown, setIsKeyDown] = useState(false);

  const inputRef = useRef()

  let className = 'slider'


  if (props.lighted) className += ` slider_lighted`

  if (props.disabled) className += ` slider_disabled`

  if (isKeyDown) className += ` slider_selected`


  const onMouseMove = e => {
    if (isKeyDown) {
        console.log(parseFloat(inputRef.current.value));
        let newValue = parseFloat(inputRef.current.value) - e.movementY * (props.step ? props.step : (props.max - props.min) / 200)
        if (newValue < props.min) newValue = props.min
        if (newValue > props.max) newValue = props.max


        inputRef.current.value = newValue
        props.onChange(parseFloat(inputRef.current.value))

    }
  }

  const onKeyDown = e => {
    if (e.repeat) return
    if (e.code === props.hotkey) setIsKeyDown(true)
  }

  const onKeyUp = e => {
    if (e.code === props.hotkey) setIsKeyDown(false)
  }

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
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
        className={className}
        type="range"
        min={props.min}
        max={props.max}
        value={props.value}
        step={props.step ? props.step : "any"}
        onInput={e => {
          props.onChange(e.target.value)
        }}
        />
    </div>

  );
}

export default Slider;
