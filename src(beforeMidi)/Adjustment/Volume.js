
import React, { useState, useEffect } from 'react';
import Slider from '../Slider/Slider.js';

function Volume(props) {

  const initialValue = .5;
  // const initial = JSON.parse(window.localStorage.getItem('volume')) || [initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue];
  const initial = [initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue];

  const [value, setValue] = useState(initial);
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
    window.localStorage.setItem('volume',JSON.stringify(value))
  }, [value])


  return (
    <Slider
    key={`Volume${selectedTrack}`}
      hotkey='KeyZ'
      min={0}
      max={1}
      value={value[selectedTrack]}
      checked={value[selectedTrack] !== initialValue}
      caption={`Volume`}
      caption2={`${Math.round(value[selectedTrack]*100)}%`}
      onChange={onChange}/>
  );
}

export default Volume;
