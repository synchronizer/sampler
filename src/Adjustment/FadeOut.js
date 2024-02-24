
import React, { useState, useEffect } from 'react';
import Slider from '../Slider/Slider.js';

function FadeOut(props) {

  const defaultValue = 0

  const [value, setValue] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0]);
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
    key={`FadeOut${selectedTrack}`}
    hotkey='KeyM'
    disabled={!trackList[selectedTrack]}
    min={0}
    max={trackList[selectedTrack] ? trackList[selectedTrack].data.duration : 2}
    value={value[selectedTrack]}
    checked={value[selectedTrack] !== defaultValue}
    caption={`FadeOut`}
    caption2={`${value[selectedTrack].toString().substring(0,4)}`}
    onChange={onChange}/>
  );
}

export default FadeOut;
