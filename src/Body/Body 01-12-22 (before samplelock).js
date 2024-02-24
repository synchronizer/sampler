


import './Body.css';
import Button from '../Button/Button.js';
import Slider from '../Slider/Slider.js';
import Screen from '../Screen/Screen.js';
import Clock from '../Clock/Clock.js';


import React, { useState, useEffect } from 'react';

const ctx = new (window.AudioContext || window.webkitAudioContext)();

function Body() {

  const [playing, setPlaying] = useState(false),
        [selectedTrack, setSelectedTrack] = useState(0),
        [beatMap, setBeatMap] = useState([
          [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
          false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
          false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
          false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
           false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
           [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
             false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
             false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
             false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        ]),
        [step, setStep] = useState(0),
        [clock] = useState(new Clock(ctx)),
        [mutedTracksList, setMutedTracksList] = useState([]),
        [numberOfBars, setNumberOfBars] = useState([1,1,1,1,1,1,1,1,1,1,1,1]),
        [selectedBar, setSelectedBar] = useState(0),
        [trackPlaying, setTrackPlaying] = useState([false, false, false, false, false, false, false, false, false, false, false, false]),

        [trackList, setTrackList] = useState([]),
        [bpm, setBpm] = useState(120),
        [chance, setChance] = useState([1,1,1,1,1,1,1,1,1,1,1,1,1]),
        [fadeOut, setFadeOut] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0]),
        [pitch, setPitch] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0]),
        [volume, setVolume] = useState([.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5,.5]),
        [start, setStart] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0]),
        [duration, setDuration] = useState([2,2,2,2,2,2,2,2,2,2,2,2,2]),
        [fadeIn, setFadeIn] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0]),
        [filter, setFilter] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0]),
        [delay, setDelay] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0]),
        [delayTime, setDelayTime] = useState([2,2,2,2,2,2,2,2,2,2,2,2,2]),

        [shift, setShift] = useState(false),
        [record, setRecord] = useState(false),
        [stepPressed, setStepPressed] = useState(false),

        [audioNodes, setAudioNodes] = useState([]),
        [volumeNodes, setVolumeNodes] = useState([]);


// Save

// useEffect(()=>{
//   // window.localStorage.setItem('bpm',bpm)
//   window.localStorage.setItem('trackList',JSON.stringify(trackList))
//   window.localStorage.setItem('audioNodes',JSON.stringify(audioNodes))
//
// })


  useEffect(() => {
    volume.forEach((item, i) => {
      if (!volumeNodes[i]) {
        volumeNodes[i] = ctx.createGain()
      } else {
        volumeNodes[i].gain.value = item
      }
    });

  }, [volume])

// Stop all samples. Stop clock.
  useEffect(()=>{

    if (playing) {
      clock.start()
    } else {
      clock.stop()
      setStep(0)

      audioNodes.forEach(item => {
        if (item) item.stop()
      });
    }
  }, [playing])

  // Change the bpm clock when the sampler's bpm changes.
  useEffect(() => {
    clock.bpm = bpm
  },[bpm])

  useEffect(() => {
    clock.action = (iteration, currentTime) => {

      setStep((iteration + 1) % 64)

      // Playing all samplesю
      trackList.forEach((item,sampleNum) => {
        const trackLocaleStep = iteration % (16 * numberOfBars[sampleNum])

        if (
          !mutedTracksList[sampleNum] &&
          Math.random() < chance[sampleNum] &&

            beatMap[sampleNum][trackLocaleStep]

        ) {
          setTrackPlaying(prevTrackPlaying => {
            const newTrackPlaying = [...prevTrackPlaying]
            newTrackPlaying[sampleNum] = true
            return newTrackPlaying

          })
          playSample(sampleNum)
        } else {
          setTrackPlaying(prevTrackPlaying => {
            const newTrackPlaying = [...prevTrackPlaying]
            newTrackPlaying[sampleNum] = false
            return newTrackPlaying

          })
        }
      });

    }

  })

  function playSample(sampleNum) {
    {
      if (!trackList[sampleNum]) return

      if (audioNodes[sampleNum])audioNodes[sampleNum].stop()

      const source = ctx.createBufferSource();

      // Еo stop the sample before the next playback
      setAudioNodes(prevAudioNodes => {
        const newAudioNodes = [...prevAudioNodes]
        newAudioNodes[sampleNum] = source
        return newAudioNodes
      })

      const LpfHpf = ctx.createBiquadFilter();
      const gain = ctx.createGain()

      source.buffer = trackList[sampleNum].data;
      source.detune.value = pitch[sampleNum]

      if (filter[sampleNum] > 0) {
        LpfHpf.type = "highpass";
        LpfHpf.frequency.value = filter[sampleNum] * 16000;
        console.log();
      } else if (filter[sampleNum] < 0) {
        LpfHpf.type = "lowpass";
        LpfHpf.frequency.value = 4100 + filter[sampleNum] * 4000;
      }


      // Fade in
      if (fadeIn[sampleNum] > 0) {
        gain.gain.setValueAtTime(.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(volume[sampleNum] + .0001, ctx.currentTime + fadeIn[sampleNum])
      } else {
        gain.gain.setValueAtTime(volume[sampleNum], ctx.currentTime)
      }

      // Fade out
      if (fadeOut[sampleNum] > 0) {
        gain.gain.setValueAtTime(volume[sampleNum], ctx.currentTime + duration[sampleNum]-fadeOut[sampleNum])
        gain.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + duration[sampleNum])
      }

      // Mute

      source.connect(filter[sampleNum] ? LpfHpf : gain)

      LpfHpf.connect(gain)

      gain.connect(ctx.destination)



      if (delay[sampleNum] > 0) {
        const delayNode = ctx.createDelay();
        const feedback = ctx.createGain();
        feedback.gain.value = delay[sampleNum];
        delayNode.delayTime.value = 60 / bpm/ delayTime[sampleNum] ;
        gain.connect(delayNode)
        delayNode.connect(feedback)
        feedback.connect(delayNode)
        feedback.connect(ctx.destination)
      }

      source.start(ctx.currentTime, start[sampleNum], duration[sampleNum])

    }
  }

  const togglPlaying = () => {
    setPlaying(prevPlaying => !prevPlaying)
  }

  const toggleMuteTrack = i => {
    setMutedTracksList(prevMutedList => {
      const newMutedList = [...prevMutedList]
      newMutedList[i] = !prevMutedList[i]
      return newMutedList
    })
  }

  const toggleStep = step => {
    setBeatMap(prevBeatMap => {
      const newBeatMap = [...prevBeatMap]
      newBeatMap[selectedTrack][step] = !prevBeatMap[selectedTrack][step]
      return newBeatMap
    })
  }

  const changeChance = value => {
    setChance(prevChance => {
      const newChance = [...prevChance]
      newChance[selectedTrack] = parseFloat(value)
      return newChance
    })
  }

  const changePitch = value => {
    setPitch(prevPitch => {
      const newPitch = [...prevPitch]
          newPitch[selectedTrack] = parseFloat(value)

      return newPitch
    })
  }

  const changeVolume = value => {
    setVolume(prevVolume => {
      const newVolume = [...prevVolume]
      newVolume[selectedTrack] = parseFloat(value)
      return newVolume
    })
  }


  const changeStart = value => {
    setStart(prevStart => {
      const newStart = [...prevStart]
      newStart[selectedTrack] = parseFloat(value)
      return newStart
    })
  }

  const changeDuration = value => {
    setDuration(prevDuration => {
      const newDuration = [...prevDuration]
      newDuration[selectedTrack] = parseFloat(value)
      return newDuration
    })
  }

  const changeFadeIn = value => {
    setFadeIn(prevFadeIn => {
      const newFadeIn = [...prevFadeIn]
      newFadeIn[selectedTrack] = parseFloat(value)
      return newFadeIn
    })
  }

  const changeFadeOut = value => {
    setFadeOut(prevFadeOut => {
      const newFadeOut = [...prevFadeOut]
      newFadeOut[selectedTrack] = parseFloat(value)
      return newFadeOut
    })
  }

  const changeFilter = value => {
    setFilter(prevFilter => {
      const newFilter = [...prevFilter]
      newFilter[selectedTrack] = parseFloat(value)
      return newFilter
    })
  }

  const changeDelay = value => {
    setDelay(prevDelay => {
      const newDelay = [...prevDelay]
      newDelay[selectedTrack] = parseFloat(value)
      return newDelay
    })
  }

  const changeDelayTime = value => {
    setDelayTime(prevDelayTime => {
      const newDelayTime = [...prevDelayTime]
      newDelayTime[selectedTrack] = parseFloat(value)
      return newDelayTime
    })
  }

  const loadSampleToTrack = sample => {

    setTrackList(prevSampleList => {
      const newSampleList = [...prevSampleList]
      newSampleList[selectedTrack] = {
        data: sample.data,
        name: sample.name
      }
      return newSampleList
    })

    changeDuration(sample.data.duration)
  }

  const clearTrack = () => {

    setTrackList(prevSampleList => {
      const newSampleList = [...prevSampleList]
      newSampleList[selectedTrack] = false
      return newSampleList
    })

  }



  const setOneTrackNumberOfBars = number => {
    setNumberOfBars(prevNumberOfBars => {
      const newNumberOfBars = [...prevNumberOfBars]
      newNumberOfBars[selectedTrack] = number
      return newNumberOfBars
    })
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

      if (!playing) {
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
    },

    step: step => {
      if (shift) {
        setStepPressed(step)
      } else {
        toggleStep(step)
      }



    }
  }

  const upKey = {
    step: step => {
      setStepPressed(false)
    }
  }




  const keydownBody = e => {
    if (e.repeat) return

    console.log(e);


    if (e.code === 'Space') togglPlaying()

    if (e.key === 'Shift') setShift(true)
    // if (e.code === 'KeyR') setRecord(true)

    if (e.code === 'Backspace') clearTrack()

    if (e.code === 'Digit1') pressKey.track(0)
    if (e.code === 'Digit2') pressKey.track(1)
    if (e.code === 'Digit3') pressKey.track(2)
    if (e.code === 'Digit4') pressKey.track(3)
    if (e.code === 'Digit5') pressKey.track(4)
    if (e.code === 'Digit6') pressKey.track(5)
    if (e.code === 'Digit7') pressKey.track(6)
    if (e.code === 'Digit8') pressKey.track(7)
    if (e.code === 'Digit9') pressKey.track(8)
    if (e.code === 'Digit0') pressKey.track(9)
    if (e.code === 'Minus') pressKey.track(10)
    if (e.code === 'Equal') pressKey.track(11)

    if (e.code === 'KeyQ') pressKey.numberOfBars(1)
    if (e.code === 'KeyW') pressKey.numberOfBars(2)
    if (e.code === 'KeyE') pressKey.numberOfBars(3)
    if (e.code === 'KeyR') pressKey.numberOfBars(4)

    if (e.code === 'KeyA') pressKey.step(0 + selectedBar * 16)
    if (e.code === 'KeyS') pressKey.step(1 + selectedBar * 16)
    if (e.code === 'KeyD') pressKey.step(2 + selectedBar * 16)
    if (e.code === 'KeyF') pressKey.step(3 + selectedBar * 16)
    if (e.code === 'KeyG') pressKey.step(4 + selectedBar * 16)
    if (e.code === 'KeyH') pressKey.step(5 + selectedBar * 16)
    if (e.code === 'KeyJ') pressKey.step(6 + selectedBar * 16)
    if (e.code === 'KeyK') pressKey.step(7 + selectedBar * 16)
    if (e.code === 'KeyZ') pressKey.step(8 + selectedBar * 16)
    if (e.code === 'KeyX') pressKey.step(9 + selectedBar * 16)
    if (e.code === 'KeyC') pressKey.step(10 + selectedBar * 16)
    if (e.code === 'KeyV') pressKey.step(11 + selectedBar * 16)
    if (e.code === 'KeyB') pressKey.step(12 + selectedBar * 16)
    if (e.code === 'KeyN') pressKey.step(13 + selectedBar * 16)
    if (e.code === 'KeyM') pressKey.step(14 + selectedBar * 16)
    if (e.code === 'Comma') pressKey.step(15 + selectedBar * 16)
  }

  const keyupBody = e => {
    if (e.key === 'Shift') setShift(false)
    if (e.code === 'KeyR') setRecord(false)

    if (e.code === 'KeyA') upKey.step(0 + selectedBar * 16)
    if (e.code === 'KeyS') upKey.step(1 + selectedBar * 16)
    if (e.code === 'KeyD') upKey.step(2 + selectedBar * 16)
    if (e.code === 'KeyF') upKey.step(3 + selectedBar * 16)
    if (e.code === 'KeyG') upKey.step(4 + selectedBar * 16)
    if (e.code === 'KeyH') upKey.step(5 + selectedBar * 16)
    if (e.code === 'KeyJ') upKey.step(6 + selectedBar * 16)
    if (e.code === 'KeyK') upKey.step(7 + selectedBar * 16)
    if (e.code === 'KeyZ') upKey.step(8 + selectedBar * 16)
    if (e.code === 'KeyX') upKey.step(9 + selectedBar * 16)
    if (e.code === 'KeyC') upKey.step(10 + selectedBar * 16)
    if (e.code === 'KeyV') upKey.step(11 + selectedBar * 16)
    if (e.code === 'KeyB') upKey.step(12 + selectedBar * 16)
    if (e.code === 'KeyN') upKey.step(13 + selectedBar * 16)
    if (e.code === 'KeyM') upKey.step(14 + selectedBar * 16)
    if (e.code === 'Comma') upKey.step(15 + selectedBar * 16)
  }

  useEffect(() =>{
    window.addEventListener('keydown', keydownBody)
    window.addEventListener('keyup', keyupBody)

    return () => {
      window.removeEventListener('keydown', keydownBody)
      window.removeEventListener('keyup', keyupBody)
    }
  })

  return (
    <div className="body">
    <div className="screen-wrapper" caption="Sample">
      <Screen ctx={ctx} onLoad={loadSampleToTrack}/>
    </div>

    <div className="track-wrapper" caption="Track">
    {
      beatMap.map((item, i) => <Button
        key={'selectedTrack' + i}
        checked = {i == selectedTrack}
        lighted = {playing && trackPlaying[i]}
        label = {trackList[i] && `${i+1}. ${trackList[i].name}` || `${i+1}.`}
        disabled = {mutedTracksList[i]}
        onClick = {() => {pressKey.track(i)}}
      />)

    }
    </div>


    <div className="slider-wrapper">
      <Slider
      disabled={!trackList[selectedTrack]}
        key={`volume${selectedTrack}`}
        min={0}
        max={1}
        value={volume[selectedTrack]}
        defaultValue={.5}
        caption={`Volume`}
        caption2={`${Math.round(volume[selectedTrack]*100)}%`}
        onChange={changeVolume}
      />

      <Slider
      disabled={!trackList[selectedTrack]}
        key={`chance${selectedTrack}`}
        min={0}
        max={1}
        value={chance[selectedTrack]}
        defaultValue={1}
        caption={`Chance`}
        caption2={`${Math.round(chance[selectedTrack]*100)}%`}
        onChange={changeChance}/>
      <Slider
      disabled={!trackList[selectedTrack]}

        key={`pitch${selectedTrack}`}
        min={-1200}
        max={1200}
        step={50}
        value={pitch[selectedTrack]}
        defaultValue={0}
        caption={`Pitch`}
        caption2={pitch[selectedTrack]}
        onChange={changePitch}/>
      <Slider
        disabled={!trackList[selectedTrack]}
        key={`start${selectedTrack}`}
        min={0}
        max={trackList[selectedTrack] ? trackList[selectedTrack].data.duration : 2}
        value={start[selectedTrack]}
        defaultValue={0}
        caption={`Start`}
        caption2={`${Math.round(start[selectedTrack] * 100) / 100} s`}
        onChange={changeStart}/>
      <Slider
        disabled={!trackList[selectedTrack]}
        key={`duration${selectedTrack}`}
        min={0}
        max={trackList[selectedTrack] ? trackList[selectedTrack].data.duration : 2}
        value={duration[selectedTrack]}
        defaultValue={trackList[selectedTrack] ? trackList[selectedTrack].data.duration : 2}
        caption={`Duration`}
        caption2={`${Math.round(duration[selectedTrack] * 100) / 100} s`}
        onChange={changeDuration}/>
      <Slider
        disabled={!trackList[selectedTrack]}
        key={`fadeIn${selectedTrack}`}
        min={0}
        max={trackList[selectedTrack] ? trackList[selectedTrack].data.duration : 2}
        value={fadeIn[selectedTrack]}
        defaultValue={0}
        caption={`FadeIn ${fadeIn[selectedTrack].toString().substring(0,4)}`}
        onChange={changeFadeIn}/>
        <Slider
          disabled={!trackList[selectedTrack]}
          key={`fadeOut${selectedTrack}`}
          min={0}
          max={trackList[selectedTrack] ? trackList[selectedTrack].data.duration : 2}
          value={fadeOut[selectedTrack]}
          defaultValue={0}
          caption={`FadeOut ${fadeOut[selectedTrack].toString().substring(0,4)}`}
          onChange={changeFadeOut}/>

      <Slider
      disabled={!trackList[selectedTrack]}
        step={.01}
        key={`Filter${selectedTrack}`}
        min={-1}
        max={1}
        value={filter[selectedTrack]}
        defaultValue={0}
        caption={`Filter ${filter[selectedTrack].toString().substring(0,4)}`}
        onChange={changeFilter}/>
      <Slider
        disabled={!trackList[selectedTrack]}
        step={.01}
        key={`Delay${selectedTrack}`}
        min={0}
        max={.75}
        value={delay[selectedTrack]}
        defaultValue={0}
        caption={`Delay`}
        caption2={`${delay[selectedTrack].toString().substring(0,4)}`}
        onChange={changeDelay}/>
        <Slider
          disabled={!trackList[selectedTrack]}
          step={.01}
          key={`DelayTime${selectedTrack}`}
          min={2}
          max={9}
          value={delayTime[selectedTrack]}
          defaultValue={2}
          caption={`DelayTime`}
          caption2={`1 / ${delayTime[selectedTrack]}`}
          step={1}
          onChange={changeDelayTime}/>
    </div>


    <div className="control-wrapper">

      <div className="clock-cycle-wrapper" caption="Clock cycle">
      <Button
        labelCenter
        label={1}
        checked={selectedBar == 0}
        disabled={!(numberOfBars[selectedTrack] > 0)}
        lighted={
          playing && (
            (numberOfBars[selectedTrack] == 1) ||
            (numberOfBars[selectedTrack] == 2 && (step % 32 < 16)) ||
            (numberOfBars[selectedTrack] == 4 && (step % 64 < 16))
          )}
        onClick={() => {pressKey.numberOfBars(1)}}
      />

      <Button
        labelCenter
        label={2}
        checked={selectedBar == 1}
        disabled={!(numberOfBars[selectedTrack] > 1)}
        lighted={
          playing && (
            (numberOfBars[selectedTrack] == 2 && (step % 32 >= 16)) ||
            (numberOfBars[selectedTrack] == 4 && (step % 64 >= 16) && (step % 64 < 32))
          )}
        onClick={() => {pressKey.numberOfBars(2)}}
      />

      <Button
        labelCenter
        label={3}
        checked={selectedBar == 2}
        disabled={!(numberOfBars[selectedTrack] > 2)}
        lighted={
          playing && (
            (numberOfBars[selectedTrack] == 4 && (step % 64 >= 32) && (step % 64 < 48))
          )}
        onClick={() => {pressKey.numberOfBars(3)}}
      />

      <Button
        labelCenter
        label={4}
        checked={selectedBar == 3}
        disabled={!(numberOfBars[selectedTrack] > 2)}
        lighted={
          playing && (
            (numberOfBars[selectedTrack] == 4 && (step % 64 >= 48) && (step % 64 < 64))
          )}
        onClick={() => {pressKey.numberOfBars(4)}}
      />

      </div>
      <Slider
        min={40}
        max={200}
        value={bpm}
        step={1}
        defaultValue={120}
        caption={`${bpm}bpm`}
        silence = {true}
        onChange={setBpm}/>
      <div className='shift-play-wrapper'>
      <Button label="Shift" checked={shift} onClick={() => {setShift(true)}} onTouchEnd={() => {setShift(false)}}/>

      <Button checked={playing} onClick={togglPlaying} label={`${playing ? '◼ Stop' : '▶ Play'}`}/>
      </div>
    </div>


    <div className="step-wrapper" caption='Steps'>{
      beatMap[selectedTrack].map((item, i) =>{
        if (
          (selectedBar == 0 && i < 16) ||
          (selectedBar == 1 && i >= 16 && i < 32) ||
          (selectedBar == 2 && i >= 32 && i < 48) ||
          (selectedBar == 3 && i >= 48)
        ) {
          return <Button
            checked={stepPressed === i}
            key={'step' + i}
            disabled={!item}
            lighted = {playing && i % 16 == step % 16}
            label = {i + 1}
            onClick = {() => {pressKey.step(i)}}
            onTouchEnd = {() => {upKey.step(i)}}
      />
        }
      })
    }</div>
    </div>

  );
}

export default Body;

// <Button label="Record" checked={record} onClick={() => {setRecord(true)}} onTouchEnd={() => {setRecord(false)}}/>
