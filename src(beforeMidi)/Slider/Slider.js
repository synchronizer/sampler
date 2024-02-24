import './Slider.css';
import React, { useState, useEffect, useRef } from 'react';

function Slider(props) {

const {
    initial,
    value,
    disabled,
    step,
    max,
    min,
    onChange,
    hotkey,
    label,
    visibleValue,
  } = props
  const [isSelected, setIsSelected] = useState(false);

  let className = 'slider'


  if (!isNaN(initial) && value != initial) className += ` slider_lighted`

  if (disabled) className += ` slider_disabled`

  if (isSelected) className += ` slider_selected`


  const changeValue = increment => {

      let newValue = value + increment * (step ? step : (max - min) / 200)
      if (newValue < min) newValue = min
      if (newValue > max) newValue = max
      onChange(newValue)
  }

  const onMouseMove = e => {if (isSelected ) changeValue(-e.movementY)}

  const onMouseUp = () => {setIsSelected(false)}

  const onKeyDown = e => {
    if (isSelected && e.code == 'ArrowRight') changeValue(1)
    if (isSelected && e.code == 'ArrowLeft') changeValue(-1)

    if (e.repeat) return
    if (isSelected && !isNaN(initial) && e.code == 'Escape') onChange(initial)
    if (e.code === hotkey && !disabled) setIsSelected(true)

  }

  const onKeyUp = e => {
    if (e.code === hotkey) setIsSelected(false)
  }

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('mouseup', onMouseUp)


    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('mouseup', onMouseUp)
    }
  })




    let dashArray = ''

      if (min >=0)          dashArray = `${(value - min) / (max - min) * 270} 360`
      else if (value >= 0)  dashArray = `0 135 ${value / max * 135} 360`
      else                  dashArray = `0 ${135 - value / min * 135} ${value / min * 135} 360`


  return (
      <div
        className={className}
        onMouseDown={() => {
          if (disabled) return
          setIsSelected(true)
        }}
      >
        <div className="hotkey">{hotkey || ' '}</div>
        <div
          className="slider__knob"
          style={{
            transform: `rotate(${(value - min) / (max - min) * 270 - 45}deg)`
          }}
        >
        <div className="slider__mark"/>
        </div>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="slider__track" >
        <circle cx="50" cy="50" r="40" pathLength="360" strokeDasharray='270 90' className="slider__track-bg"/>
          <circle cx="50" cy="50" r="40" pathLength="360" strokeDasharray={dashArray} className="slider__track-scale"/>
        </svg>
        <div className="slider__label">{label}</div>
        {(visibleValue != undefined) && <div className="slider__value">{visibleValue}</div>}
      </div>


  );
}

export default Slider;
