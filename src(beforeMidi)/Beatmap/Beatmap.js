import React, { useState, useEffect } from 'react';
import Button from '../Button/Button.js';
import Hotkeys from '../Hotkeys.js';

function Beatmap(props) {

  const {selectedBar, selectedTrack, isPlaying, step, changeBeatmap, changeStepPressed, shift} = props

  const initialValue = false,
        initialTrackArray = new Array(64).fill(initialValue);

  const [beatmap, setBeatmap] = useState([
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

  ]),

  [stepPressed, setStepPressed] = useState(false);

  const pressStep = step => {
    if (shift) {
      setStepPressed(step)
    } else {
      toggleStep(step)
    }
  }

  const upStep = step => {
    setStepPressed(false)
  }

  const toggleStep = step => {
    setBeatmap(prevBeatMap => {
      const newBeatMap = [...prevBeatMap]
      newBeatMap[selectedTrack][step] = !prevBeatMap[selectedTrack][step]
      return newBeatMap
    })
  }

  useEffect(() => {changeBeatmap(beatmap)}, [beatmap])
  useEffect(() => {changeStepPressed(stepPressed)}, [stepPressed])

  return (
    <div className="step-wrapper">{
      beatmap[selectedTrack].map((item, i) =>{
        if (
          (selectedBar == 0 && i < 16) ||
          (selectedBar == 1 && i >= 16 && i < 32) ||
          (selectedBar == 2 && i >= 32 && i < 48) ||
          (selectedBar == 3 && i >= 48)
        ) {
          return <Button
            hotkey={Hotkeys.step[i - 16 * selectedBar]}
            checked={stepPressed === i}
            key={'step' + i}
            disabled={!item}
            lighted = {isPlaying && i % 16 == step % 16}
            label = {`${i % 16 + 1}${i % 4 === 0 ? ' _' : ''}`}
            onClick = {() => {pressStep(i)}}
            onTouchEnd = {() => {upStep(i)}}
      />
        }
      })
    }</div>
  );
}

export default Beatmap;
