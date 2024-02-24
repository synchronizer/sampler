
import React, { useState, useEffect } from 'react';
import Slider from '../Slider/Slider.js';

function Delay(props) {

  const defaultValue = 0

  const [value, setValue] = useState([defaultValue, defaultValue, defaultValue, defaultValue, defaultValue, defaultValue, defaultValue, defaultValue, defaultValue, defaultValue, defaultValue, defaultValue, defaultValue] );
  const {stepPressed, selectedTrack, change} = props

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
    key={`Delay${selectedTrack}`}
    hotkey='Period'
    step={.01}
    min={0}
    max={.75}
    value={value[selectedTrack]}
    checked={value[selectedTrack] !== defaultValue}
    caption={`Delay`}
    caption2={`${value[selectedTrack].toString().substring(0,4)}`}
    onChange={onChange}/>
  );
}

export default Delay;
