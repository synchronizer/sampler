
import React, { useState, useEffect } from 'react';
import Slider from '../Slider/Slider.js';

function Duration(props) {

  const [value, setValue] = useState([999,999,999,999,999,999,999,999,999,999,999,999,999]);
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
  }, [value])


  return (
    <Slider
    key={`Duration${selectedTrack}`}
    hotkey='KeyB'
    disabled={!trackList[selectedTrack]}
    min={0}
    max={trackList[selectedTrack] ? trackList[selectedTrack].data.duration : 999}
    value={value[selectedTrack]}
    caption={`Duration`}
    caption2={`${Math.round(value[selectedTrack] * 100) / 100} s`}
      onChange={onChange}/>
  );
}

export default Duration;
