
import React, { useState, useEffect } from 'react';
import Slider from '../Slider/Slider.js';

function DelayTime(props) {

  const defaultValue = 2

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
    hotkey='Slash'
    key={`DelayTime${selectedTrack}`}
    min={2}
    max={16}
    value={value[selectedTrack]}
    checked={value[selectedTrack] !== defaultValue}
    caption={`Delay-Time`}
    caption2={`1 / ${value[selectedTrack]}`}
    step={1}
    onChange={onChange}/>
  );
}

export default DelayTime;
