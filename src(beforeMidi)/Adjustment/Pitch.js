
import React, { useState, useEffect } from 'react';
import Slider from '../Slider/Slider.js';

function Pitch(props) {

  const initialValue = 0,
        initialTrackArray = new Array(64).fill(initialValue);

// const initial = JSON.parse(window.localStorage.getItem('pitch')) || [
//   [...initialTrackArray],
//   [...initialTrackArray],
//   [...initialTrackArray],
//   [...initialTrackArray],
//   [...initialTrackArray],
//   [...initialTrackArray],
//   [...initialTrackArray],
//   [...initialTrackArray],
//   [...initialTrackArray],
//   [...initialTrackArray],
//   [...initialTrackArray],
//   [...initialTrackArray],
// ];

const initial = [
  [...initialTrackArray],
  [...initialTrackArray],
  [...initialTrackArray],
  [...initialTrackArray],
  [...initialTrackArray],
  [...initialTrackArray],
  [...initialTrackArray],
  [...initialTrackArray],
  [...initialTrackArray],
  [...initialTrackArray],
  [...initialTrackArray],
  [...initialTrackArray],
];

  const [value, setValue] = useState(initial);

  const {stepPressed, selectedTrack, change} = props

  const onChange = value => {
    setValue(prevValue => {
      const newValue = [...prevValue]
      if (stepPressed !== false) {
          newValue[selectedTrack][stepPressed] = parseFloat(value)
      } else {
        newValue[selectedTrack].fill(parseFloat(value))
      }
      return newValue
    })
  }

  useEffect(() => {
    change(value)
    window.localStorage.setItem('pitch',JSON.stringify(value))
  }, [value])

  return (
    <Slider
    key={`Pitch${selectedTrack}`}
      hotkey='KeyC'
      min={-1200}
      max={1200}
      step={50}
      value={stepPressed != false ? value[selectedTrack][stepPressed] : value[selectedTrack][0 ]}
      checked={value[selectedTrack][stepPressed || 0] !== initialValue}
      caption={`Pitch`}
      caption2={stepPressed != false ? value[selectedTrack][stepPressed] : value[selectedTrack][0 ]}
      onChange={onChange}/>
  );
}

export default Pitch;
