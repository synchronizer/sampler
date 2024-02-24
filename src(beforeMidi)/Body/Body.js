
import './Body.css';

import Hotkeys from '../Hotkeys.js';

import Button from '../Button/Button.js';
import Slider from '../Slider/Slider.js';


import Beatmap from '../Beatmap/Beatmap.js';

import Screen from '../Screen/Screen.js';
import Clock from '../Clock/Clock.js';

import React, { useState, useEffect } from 'react';

const ctx = new (window.AudioContext || window.webkitAudioContext)();

const varSourceNodeList = new Array(12)

const varAudioNodeList = [ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain()]
const varVolumeNodeList = [ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain()]
const varFilterNodeList = [ctx.createBiquadFilter(),ctx.createBiquadFilter(),ctx.createBiquadFilter(),ctx.createBiquadFilter(),ctx.createBiquadFilter(),ctx.createBiquadFilter(),ctx.createBiquadFilter(),ctx.createBiquadFilter(),ctx.createBiquadFilter(),ctx.createBiquadFilter(),ctx.createBiquadFilter(),ctx.createBiquadFilter()]
const varDelayNodeList = [ctx.createDelay(),ctx.createDelay(),ctx.createDelay(),ctx.createDelay(),ctx.createDelay(),ctx.createDelay(),ctx.createDelay(),ctx.createDelay(),ctx.createDelay(),ctx.createDelay(),ctx.createDelay(),ctx.createDelay()]
const varFeedbackNodeList = [ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain(),ctx.createGain()]

varAudioNodeList.forEach((item, i) => {
  item.connect(varDelayNodeList[i])
  item.gain.value = 1
  item.connect(varFilterNodeList[i])
});


varFilterNodeList.forEach((item, i) => {
  item.type = "highpass";
  item.frequency.value = 0;
  item.connect(varVolumeNodeList[i])
});

varVolumeNodeList.forEach((item, i) => {
  item.connect(ctx.destination)
});
//
varDelayNodeList.forEach((item, i) => {
  item.connect(varFeedbackNodeList[i])
});
//
varFeedbackNodeList.forEach((item, i) => {
  item.gain.value = 0.0001
  item.connect(varDelayNodeList[i])
  item.connect(varFilterNodeList[i])
});



function Body() {

  const [isPlaying, setIsPlaying] = useState(false),
        [selectedTrack, setSelectedTrack] = useState(0),
        [beatmap, setBeatmap] = useState(),
        [step, setStep] = useState(0),
        [clock] = useState(new Clock(ctx)),
        [mutedTracksList, setMutedTracksList] = useState([]),
        [numberOfBars, setNumberOfBars] = useState([1,1,1,1,1,1,1,1,1,1,1,1]),
        [selectedBar, setSelectedBar] = useState(0),
        [trackPlaying, setTrackPlaying] = useState([false, false, false, false, false, false, false, false, false, false, false, false]),

        [trackList, setTrackList] = useState([]),
        [bpm, setBpm] = useState(120),
        [chance, setChance] = useState([1,1,1,1,1,1,1,1,1,1,1,1,]),
        [fadeOut, setFadeOut] = useState([0,0,0,0,0,0,0,0,0,0,0,0]),
        [pitch, setPitch] = useState([
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        ]),
        [volume, setVolume] = useState([.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5]),
        [start, setStart] = useState([0,0,0,0,0,0,0,0,0,0,0,0]),
        [duration, setDuration] = useState([]),
        [fadeIn, setFadeIn] = useState([0,0,0,0,0,0,0,0,0,0,0,0]),
        [filter, setFilter] = useState([0,0,0,0,0,0,0,0,0,0,0,0]),
        [delay, setDelay] = useState([0,0,0,0,0,0,0,0,0,0,0,0]),
        [delayTime, setDelayTime] = useState([2,2,2,2,2,2,2,2,2,2,2,2]),

        [shift, setShift] = useState(false),
        [isRecord, setIsRecord] = useState(true),
        [stepPressed, setStepPressed] = useState(false),

        [metronome, setMetronome] = useState(false),

        [memory1, setMemory1] = useState(null),
        [memory2, setMemory2] = useState(null),

        [isHotkeysShow, setIsHotkeysShow] = useState(false);




  const setStateForOneTrack = (setStateFunction, trackIndex, value) => {
    setStateFunction(prevState => {
      const newState = [...prevState]
      newState[trackIndex] = value
      return newState
    })
  }

  const setStateForOneBeat = (setStateFunction, trackIndex, beatIndex, value) => {
    setStateFunction(prevState => {
      const newState = [...prevState]
      if (beatIndex !== false) {
          newState[trackIndex][beatIndex] = value
      } else {
        newState[trackIndex].fill(value)
      }
      return newState
    })
  }

  useEffect(()=>{

    if (isPlaying) clock.start()
    else {
      clock.stop()
      setStep(0)
      varSourceNodeList.forEach(item => {
        if (item) item.stop()
      });
    }

  }, [isPlaying])


  useEffect(() => {
    clock.bpm = bpm

    varDelayNodeList.forEach((item, i) => {
      item.delayTime.value = 60 / bpm/ delayTime[i]
    });

  },[bpm])

  useEffect(() => {
    clock.action = (iteration, currentTime) => {

      if (metronome && iteration % 4 === 0) {
        const metronomeSound = ctx.createOscillator(),
              metronomeGain = ctx.createGain();
        metronomeSound.frequency.setValueAtTime(880, currentTime);
        metronomeGain.gain.setValueAtTime(.1, currentTime);
        if (iteration % 16 === 0) metronomeGain.gain.setValueAtTime(.4, currentTime);
        metronomeSound.connect(metronomeGain);
        metronomeGain.connect(ctx.destination);
        metronomeSound.start(currentTime);
        metronomeSound.stop(currentTime +.1);
      }

      setStep((iteration + 1) % 64)

      trackList.forEach((item,sampleNum) => {
        const trackLocalStep = iteration % (16 * numberOfBars[sampleNum])

        if (mutedTracksList[sampleNum] || Math.random() >= chance[sampleNum] || !beatmap[sampleNum][trackLocalStep]) {
          setStateForOneTrack(setTrackPlaying, sampleNum, false)
          return
        }

        setStateForOneTrack(setTrackPlaying, sampleNum, true)
        playSample(sampleNum)
      });
    }

  })

  useEffect(() => {
    if (varSourceNodeList[selectedTrack]) varSourceNodeList[selectedTrack].detune.value = pitch[selectedTrack][step % (16 * numberOfBars[selectedTrack])]
  }, [pitch])

  useEffect(() => {
    varVolumeNodeList[selectedTrack].gain.value = 2 ** volume[selectedTrack] - 1
    varVolumeNodeList[selectedTrack].connect(ctx.destination)
  }, [volume])

  useEffect(() => {
    varFeedbackNodeList[selectedTrack].gain.value = delay[selectedTrack]
  }, [delay])

  useEffect(() => {
    varDelayNodeList[selectedTrack].delayTime.value = 60 / bpm/ delayTime[selectedTrack] ;
  }, [delayTime])

  useEffect(() => {
    if (filter[selectedTrack] >= 0) {
      varFilterNodeList[selectedTrack].type = "highpass";
      varFilterNodeList[selectedTrack].frequency.value = 16000 * filter[selectedTrack] * filter[selectedTrack] + 80;
    } else if (filter[selectedTrack] < 0) {
      varFilterNodeList[selectedTrack].type = "lowpass";
      varFilterNodeList[selectedTrack].frequency.value = 23500 ** (1 + filter[selectedTrack]) + 80;
    }

  }, [filter])

  function playSample(sampleNum) {
    {
      if (!trackList[sampleNum]) return

      if (varSourceNodeList[sampleNum])varSourceNodeList[sampleNum].stop()

      const source = ctx.createBufferSource();

      varSourceNodeList[sampleNum] = source

      source.buffer = trackList[sampleNum].data;
      source.detune.value = pitch[sampleNum][step % (16 * numberOfBars[sampleNum])]

      varAudioNodeList[sampleNum].gain.setValueAtTime(1, ctx.currentTime)
      if (fadeIn[sampleNum] > 0) {
        varAudioNodeList[sampleNum].gain.setValueAtTime(.0001, ctx.currentTime)
        varAudioNodeList[sampleNum].gain.exponentialRampToValueAtTime(1, ctx.currentTime + fadeIn[sampleNum])
      } else {
        varAudioNodeList[sampleNum].gain.setValueAtTime(1, ctx.currentTime)
      }

      // if (fadeOut[sampleNum] > 0) {
      //   varAudioNodeList[sampleNum].gain.setValueAtTime(1, ctx.currentTime + duration[sampleNum]-fadeOut[sampleNum])
      //   varAudioNodeList[sampleNum].gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + duration[sampleNum])
      // }

      source.connect(varAudioNodeList[sampleNum])

      source.start(ctx.currentTime, start[sampleNum], duration[sampleNum])
    }
  }


  const toggleMuteTrack = i => {
    setStateForOneTrack(setMutedTracksList, i, !mutedTracksList[i])
  }


  const loadSampleToTrack = sample => {
    setStateForOneTrack(setTrackList, selectedTrack, {
      data: sample.data,
      name: sample.name
    })
  }

  const clearTrack = () => {
    setStateForOneTrack(setTrackList, selectedTrack, false)
  }


  const setOneTrackNumberOfBars = number => {
    setStateForOneTrack(setNumberOfBars, selectedTrack, number)
  }

  const pressKey = {

    numberOfBars: number => {
      if (shift) {
        setOneTrackNumberOfBars(number)
      } else {
        setSelectedBar(number - 1)
      }
    },

    track: track => {

      if (shift) {
        toggleMuteTrack(track)
        return
      }

      if (!isPlaying) {
        playSample(track)
        setSelectedTrack(track)
        setSelectedBar(0)
        return
      }

      if (selectedTrack == track) {
        playSample(track)
      }
      else {
        setSelectedTrack(track)
        setSelectedBar(0)
      }
    }
  }

  const saveMemory1 = () => {
    setMemory1({
      mutedTracksList: mutedTracksList,
      chance: chance,
      fadeOut: fadeOut,
      pitch: pitch,
      volume: volume,
      start: start,
      duration: duration,
      fadeIn: fadeIn,
      filter: filter,
      delay: delay,
      delayTime: delayTime,

    })
  }

  const loadMemory1 = () => {
    setMutedTracksList(memory1.mutedTracksList)
      setChance(memory1.chance)
      setFadeOut(memory1.fadeOut)
      setPitch(memory1.pitch)
      setVolume(memory1.volume)
      setStart(memory1.start)
      setDuration(memory1.duration)
      setFadeIn(memory1.fadeIn)
      setFilter(memory1.filter)
      setDelay(memory1.delay)
      setDelayTime(memory1.delayTime)
  }

  const saveMemory2 = () => {
    setMemory2({
      mutedTracksList: mutedTracksList,
      chance: chance,
      fadeOut: fadeOut,
      pitch: pitch,
      volume: volume,
      start: start,
      duration: duration,
      fadeIn: fadeIn,
      filter: filter,
      delay: delay,
      delayTime: delayTime,

    })
  }

  const loadMemory2 = () => {
    setMutedTracksList(memory2.mutedTracksList)
      setChance(memory2.chance)
      setFadeOut(memory2.fadeOut)
      setPitch(memory2.pitch)
      setVolume(memory2.volume)
      setStart(memory2.start)
      setDuration(memory2.duration)
      setFadeIn(memory2.fadeIn)
      setFilter(memory2.filter)
      setDelay(memory2.delay)
      setDelayTime(memory2.delayTime)
  }

  const hotKeysDown = {
    'Backquote': () => {setIsHotkeysShow(true)}
  };

  const hotKeysUp = {
    'Backquote': () => {setIsHotkeysShow(false)}
  }

  const keydownBody = e => {
    if (e.repeat) return
    if (hotKeysDown[e.code]) hotKeysDown[e.code]()
  }

  const keyupBody = e => {
    if (hotKeysUp[e.code]) hotKeysUp[e.code]()
  }

  useEffect(() =>{
    window.addEventListener('keydown', keydownBody)
    window.addEventListener('keyup', keyupBody)

    return () => {
      window.removeEventListener('keydown', keydownBody)
      window.removeEventListener('keyup', keyupBody)
    }
  })

   let className = "body"
   if (isHotkeysShow) className += " isHotkeysShow"

   useEffect(() =>{
     if (trackList[selectedTrack]) setStateForOneTrack(setDuration, selectedTrack, trackList[selectedTrack].data.duration)
   }, [trackList])

   const onChangeVolume = value => {setStateForOneTrack(setVolume, selectedTrack, value)}
   const onChangeChance = value => {setStateForOneTrack(setChance, selectedTrack, value)}
   const onChangePitch = value => {setStateForOneBeat(setPitch, selectedTrack, stepPressed, value)}
   const onChangeStart = value => {setStateForOneTrack(setStart, selectedTrack, value)}
   const onChangeDuration = value => {setStateForOneTrack(setDuration, selectedTrack, value)}
   const onChangeFadeIn = value => {setStateForOneTrack(setFadeIn, selectedTrack, value)}
   const onChangeFadeOut = value => {setStateForOneTrack(setFadeOut, selectedTrack, value)}
   const onChangeFilter = value => {setStateForOneTrack(setFilter, selectedTrack, value)}
   const onChangeDelay = value => {setStateForOneTrack(setDelay, selectedTrack, value)}
   const onChangeDelayTime = value => {setStateForOneTrack(setDelayTime, selectedTrack, value)}

  return (
    <div className={className}>
    <div className="screen-wrapper">
      <Screen ctx={ctx} onLoad={loadSampleToTrack} shift={shift}/>
    </div>

    <div className="track-wrapper">
    {
      new Array(12).fill(1).map((item, i) => <Button
        hotkey={Hotkeys.track[i]}
        key={'selectedTrack' + i}
        checked = {i == selectedTrack}
        lighted = {isPlaying && trackPlaying[i]}
        label = {trackList[i] && `${i+1}. ${trackList[i].name}` || `T ${i+1}.`}
        disabled = {mutedTracksList[i]}
        onClick = {() => {pressKey.track(i)}}
        bpm={.25}
      />)

    }
    </div>

    <div className="slider-wrapper">
    <div className="slider-line">

      <Slider
      key={`Volume${selectedTrack}`}
        hotkey='KeyZ'
        min={0}
        max={1}
        value={volume[selectedTrack]}
        initial={.5}
        label={`Volume`}
        onChange={onChangeVolume}/>
        <Slider
          key={`Filter${selectedTrack}`}
          hotkey='Comma'
          min={-1}
          max={1}
          value={filter[selectedTrack]}
          initial={0}
          label='Filter'
          onChange={onChangeFilter}/>

        <Slider
          key={`Start${selectedTrack}`}
          hotkey='KeyV'
          min={0}
          max={trackList[selectedTrack] ? trackList[selectedTrack].data.duration : 2}
          value={start[selectedTrack]}
          initial={0}
          label={`Start`}
          visibleValue={`${Math.round(start[selectedTrack] * 100) / 100} s`}
          onChange={onChangeStart}/>
          <Slider
            key={`FadeIn${selectedTrack}`}
            hotkey='KeyN'
            disabled={!trackList[selectedTrack]}
            min={0}
            max={trackList[selectedTrack] ? trackList[selectedTrack].data.duration : 2}
            value={fadeIn[selectedTrack]}
            initial={0}
            label={`FadeIn`}
            visibleValue={`${fadeIn[selectedTrack].toString().substring(0,4)}`}
            onChange={onChangeFadeIn}/>
    </div>

    <div className="slider-line">
    <Slider
      key="BPM"
      hotkey='IntlBackslash'
      min={40}
      max={300}
      value={bpm}
      step={1}
      defaultValue={120}
      label='BPM Main'
      visibleValue={bpm}
      silence = {true}
      onChange={setBpm}/>

      <Slider
        key={`Delay${selectedTrack}`}
        hotkey='Period'
        min={0}
        max={.75}
        value={delay[selectedTrack]}
        initial={0}
        label={`Delay`}
        onChange={onChangeDelay}/>
      <Slider
        hotkey='Slash'
        key={`DelayTime${selectedTrack}`}
        min={2}
        max={16}
        value={delayTime[selectedTrack]}
        label={`Delay-Time`}
        visibleValue={`1 / ${delayTime[selectedTrack]}`}
        step={1}
        onChange={onChangeDelayTime}/>



    </div>
    <div className="slider-line">
    <Slider
    key={`Chance${selectedTrack}`}
      hotkey='KeyX'
      initial={1}
      min={0}
      max={1}
      value={chance[selectedTrack]}
      label={`Chance`}
      onChange={onChangeChance}/>
      <Slider
      key={`Pitch${selectedTrack}`}
        hotkey='KeyC'
        min={-1200}
        max={1200}
        value={stepPressed != false ? pitch[selectedTrack][stepPressed] : pitch[selectedTrack][0]}
        initial={0}
        label={`Pitch`}
        visibleValue={stepPressed != false ? pitch[selectedTrack][stepPressed] : pitch[selectedTrack][0 ]}
        onChange={onChangePitch}
        step={25}
        />
        <Slider
          key={`Duration${selectedTrack}`}
          hotkey='KeyB'
          disabled={!trackList[selectedTrack]}
          min={0}
          max={trackList[selectedTrack] ? trackList[selectedTrack].data.duration : 0}
          value={duration[selectedTrack]}
          label={`Duration`}
          visibleValue={`${Math.round(duration[selectedTrack] * 100) / 100} s`}
          onChange={onChangeDuration}/>
    <Slider
      key={`FadeOut${selectedTrack}`}
      hotkey='KeyM'
      disabled={!trackList[selectedTrack]}
      min={0}
      max={trackList[selectedTrack] ? trackList[selectedTrack].data.duration : 2}
      value={fadeOut[selectedTrack]}
      initial={0}
      label={`FadeOut`}
      visibleValue={`${fadeOut[selectedTrack].toString().substring(0,4)}`}
      onChange={onChangeFadeOut}/>


    </div>



    </div>


    <div className="control-wrapper">

      <div className="clock-cycle-wrapper">
      <Button
        hotkey={Hotkeys.bar[0]}
        labelCenter
        label='1/4'
        checked={selectedBar == 0}
        disabled={!(numberOfBars[selectedTrack] > 0)}
        lighted={
          isPlaying && (
            (numberOfBars[selectedTrack] == 1) ||
            (numberOfBars[selectedTrack] == 2 && (step % 32 < 16)) ||
            (numberOfBars[selectedTrack] == 4 && (step % 64 < 16))
          )}
        onClick={() => {pressKey.numberOfBars(1)}}
      />

      <Button
        hotkey={Hotkeys.bar[1]}
        labelCenter
        label='2/4'
        checked={selectedBar == 1}
        disabled={!(numberOfBars[selectedTrack] > 1)}
        lighted={
          isPlaying && (
            (numberOfBars[selectedTrack] == 2 && (step % 32 >= 16)) ||
            (numberOfBars[selectedTrack] == 4 && (step % 64 >= 16) && (step % 64 < 32))
          )}
        onClick={() => {pressKey.numberOfBars(2)}}
      />

      <Button
        hotkey={Hotkeys.bar[2]}
        labelCenter
        label='3/4'
        checked={selectedBar == 2}
        disabled={!(numberOfBars[selectedTrack] > 2)}
        lighted={
          isPlaying && (
            (numberOfBars[selectedTrack] == 4 && (step % 64 >= 32) && (step % 64 < 48))
          )}
        onClick={() => {pressKey.numberOfBars(3)}}
      />

      <Button
        hotkey={Hotkeys.bar[3]}
        labelCenter
        label='4/4'
        checked={selectedBar == 3}
        disabled={!(numberOfBars[selectedTrack] > 2)}
        lighted={
          isPlaying && (
            (numberOfBars[selectedTrack] == 4 && (step % 64 >= 48) && (step % 64 < 64))
          )}
        onClick={() => {pressKey.numberOfBars(4)}}
      />

      </div>

      <div className='memory-wrapper' >
      <Button
        hotkey={Hotkeys.memory[0]}
        disabled={!memory1}
        labelCenter
        label='M1'
        onClick={() => {shift ? saveMemory1() : (memory1 && loadMemory1())}}
      />

      <Button
        hotkey={Hotkeys.memory[1]}
        disabled={!memory2}
        labelCenter
        label='M2'
        onClick={() => {shift ? saveMemory2() : (memory2 && loadMemory2())}}
      />
        </div>

      <div className='shift-play-wrapper'>
      <Button
        label={'/'}
        checked={metronome}
        lighted={isPlaying && step % 4 === 0}
        onClick={()=>{setMetronome(!metronome)}}
      />
      <Button hotkey={Hotkeys.shift} label="Shift" checked={shift} onClick={() => {setShift(true)}} onTouchEnd={() => {setShift(false)}}/>
      {shift ?
        <Button hotkey={Hotkeys.play} label="Rec" onClick={() => {setIsRecord(!isRecord)}} checked={isRecord}/> :
        <Button hotkey={Hotkeys.play} onClick={() => {setIsPlaying(!isPlaying)}} label={`${isPlaying ? 'Stop' : 'Play'}`} lighted={isPlaying}/>}
      </div>
    </div>
      <Beatmap
        selectedBar = {selectedBar}
        selectedTrack = {selectedTrack}
        isPlaying = {isPlaying}
        step = {step}
        changeBeatmap = {setBeatmap}
        changeStepPressed = {setStepPressed}
        shift = {shift}
      />
    </div>

  );
}

export default Body;
