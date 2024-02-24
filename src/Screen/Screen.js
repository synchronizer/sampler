import './Screen.css';
import React, { useState, useEffect, useRef } from 'react';
import Button from '../Button/Button.js';
import Hotkeys from '../Hotkeys.js';


const midiOutputs = []
const midiInputs = []

function onMIDISuccess(midiAccess) {
  midiAccess.inputs.forEach((entry) => {midiInputs.push(entry)});
  midiAccess.outputs.forEach((entry) => {midiOutputs.push(entry)});
}

function onMIDIFailure(msg) {
  console.error(`Failed to get MIDI access - ${msg}`);
}

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

function Screen(props) {
  const {onLoad, ctx, shift} = props;
  const [sampleList, setSampleList] = useState(JSON.parse(window.localStorage.getItem('sampleList')) || []),
        [selectedSample, setSelectedSample] = useState(0),
        [playingSample, setPlayingSample] = useState(0),

        input = useRef(null),
        list = useRef(null);

  const openInput = () => {
    input.current.click()
  }

  const loadSample = () => {
    onLoad(sampleList[selectedSample])
  }

  useEffect(()=>{
    // window.localStorage.setItem('sampleList', JSON.stringify(sampleList))
  },[sampleList])

  useEffect(() => {
    if (sampleList.length > 0) {
      list.current.scrollTo({
        top: list.current.childNodes[selectedSample].offsetTop,
        // behavior: 'smooth'
      })
    }

  },[selectedSample])

  const open = e => {

    for (var i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];

      const reader = new FileReader();
      reader.onloadend = () => {
        ctx.decodeAudioData(reader.result, function(decodedData) {
          // const arr = new Float32Array(decodedData.length)
          // decodedData.copyFromChannel(arr, 1)
          // console.log(arr);
          setSampleList(prevSoundList => {
            const newSoundList = [...prevSoundList]

            const newTrack = {
              name: file.name.replace(/\.[^/.]+$/, ""),
              data: decodedData
            }

            newSoundList.push(newTrack)
            return newSoundList
          })
        });
      }

      reader.readAsArrayBuffer(file);
    }

  }

  const clear = () => {
    setSampleList([])
  }

  const del = () => {
    setSampleList(prevSampleList => {
      const newSampleList = [...prevSampleList]
      newSampleList.splice(selectedSample, 1)
      if (selectedSample > newSampleList.length - 1) setSelectedSample(newSampleList.length - 1)
      return newSampleList
    })
  }

  const keyDown = e => {
    if (e.code === 'ArrowUp' && selectedSample > 0) {

      shift ? setSelectedSample(0) : setSelectedSample(selectedSample - 1)
    }
    if (e.code === 'ArrowDown' && selectedSample < sampleList.length - 1) {

      shift ? setSelectedSample(sampleList.length - 1) : setSelectedSample(selectedSample + 1)
    }
  }

  const test = () => {
    const source = ctx.createBufferSource();
    source.buffer = sampleList[selectedSample].data;
    setPlayingSample(source)
  }

  const stopTest = () => {
    if (playingSample) {
      playingSample.stop()
    }
  }

  useEffect(() => {
    if (!playingSample) return
    playingSample.connect(ctx.destination)
    playingSample.start(ctx.currentTime)
  }, [playingSample])

  useEffect(() =>{
    window.addEventListener('keydown', keyDown)

    const onmidimessage = e => {
      if (e.data[0] == 177 && e.data[1] == 25 && e.data[2] == 65 && selectedSample < sampleList.length - 1) setSelectedSample(selectedSample + 1)
      if (e.data[0] == 177 && e.data[1] == 25 && e.data[2] == 63 && selectedSample  > 0) setSelectedSample(selectedSample - 1)
    }

    midiInputs.forEach(item => {
        item.addEventListener('midimessage', onmidimessage)
    });

    return () => {
      window.removeEventListener('keydown', keyDown)
      midiInputs.forEach(item => {
          item.removeEventListener('midimessage', onmidimessage)
      });
    }
  })

  return (
    <div className="screen">
      <div className="screen__list" ref={list}>
        {sampleList.length == 0 && <div className="screen__screensaver"/>}
        {sampleList.length == 0 &&<div className="screen__empty">No samples</div>}
        {sampleList && sampleList.map((item, i) =>
          <div
            className={`screen__item${selectedSample == i ? " selected" : ""}`}
            onClick={() => setSelectedSample(i)}
            key={i}>{item.name}</div>)}
      </div>
        <Button hotkey={Hotkeys.samplesOpen} label="Open" labelCenter onClick={openInput}/>
        {
          shift ?
          <Button hotkey={Hotkeys.samplesTestLoad} label="Load" labelCenter onClick={loadSample}/> :
          <Button hotkey={Hotkeys.samplesTestLoad} label="Test" labelCenter onClick={test} onTouchEnd={stopTest}/>}
        {
          shift ?
          <Button hotkey={Hotkeys.samplesClearDel} label="Clear" labelCenter onClick={clear}/> :
          <Button repeat hotkey={Hotkeys.samplesClearDel} label="Delete" labelCenter onClick={del}/>
        }
      <input
        ref={input}
        className="screen__upload"
        type="file"
        name="" value=""
        accept="audio/wav"
        multiple
        onChange={open}
      />
    </div>

  );
}

export default Screen;
