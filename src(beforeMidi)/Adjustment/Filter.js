
import React, { useState, useEffect } from 'react';
import Slider from '../Slider/Slider.js';

function Filter(props) {

  const initialValue = 0;
  // const initial = JSON.parse(window.localStorage.getItem('filter')) || [initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue];
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
    window.localStorage.setItem('filter',JSON.stringify(value))
  }, [value])


  return (
    <Slider
    key={`Filter${selectedTrack}`}
    hotkey='Comma'
    step={.01}
    min={-1}
    max={1}
    value={value[selectedTrack]}
    checked={value[selectedTrack] !== initialValue}
    caption='Filter'
      onChange={onChange}/>
  );
}

export default Filter;
