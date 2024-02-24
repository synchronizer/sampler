
import React, { useState, useEffect } from 'react';
import Slider from '../Slider/Slider.js';

function Start(props) {

  const initialValue = 0;
  // const initial = JSON.parse(window.localStorage.getItem('start')) || [initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue];
  const initial = [initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue, initialValue];

  const [value, setValue] = useState(initial);
  const {stepPressed, selectedTrack, trackList, change} = props

  const onChange = value => {
      setValue(prevValue => {
        const newValue = [...prevValue]
        newValue[selectedTrack] = parseFloat(value)
        return newValue
      })
  }

  useEffect(() => {
    change(value)
    window.localStorage.setItem('start',JSON.stringify(value))
  }, [value])


  return (
    <Slider
    key={`Start${selectedTrack}`}
      hotkey='KeyV'
      min={0}
      max={trackList[selectedTrack] ? trackList[selectedTrack].data.duration : 2}
      value={value[selectedTrack]}
      checked={value[selectedTrack] !== initialValue}
      caption={`Start`}
      caption2={`${Math.round(value[selectedTrack] * 100) / 100} s`}
      onChange={onChange}/>
  );
}

export default Start;
