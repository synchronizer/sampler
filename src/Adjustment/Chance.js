
import React, { useState, useEffect } from 'react';
import Slider from '../Slider/Slider.js';



function Chance(props) {

  const {stepPressed, selectedTrack, change} = props

  const initialValue = 1,
        initialArray = new Array(12).fill(initialValue)

  const [value, setValue] = useState(initialArray);

  const onChange = value => {
      setValue(prevValue => {
        const newValue = [...prevValue]
        newValue[selectedTrack] = parseFloat(value)
        return newValue
      })
  }

  useEffect(() => {
    change(value)
  }, [value])

  return (
    <Slider
    key={`Chance${selectedTrack}`}
      hotkey='KeyX'
      checked={value[selectedTrack] !== initialValue}
      min={0}
      max={1}
      value={value[selectedTrack]}
      caption={`Chance`}
      caption2={`${Math.round(value[selectedTrack]*100)}%`}
      onChange={onChange}/>
  );
}

export default Chance;
