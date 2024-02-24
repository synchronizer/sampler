import './Button.css';
import React, { useState, useEffect } from 'react';

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

function Button(props) {

  const {
            lighted,
            checked,
            disabled,
            labelCenter,
            hotkey,
            onClick,
            onTouchEnd,
            caption,
            caption2,
            label,
            repeat
        } = props;

  const [isMouseDown, setIsMouseDown] = useState(false)

  let className = 'button'

  if (lighted) className += ` button_lighted`

  if (checked) className += ` button_checked`

  if (disabled) className += ` button_disabled`

  if (labelCenter) className += ` button_label-center`

  const onKeyDown = e => {
    if (!repeat && e.repeat) return
    if (hotkey && e.code === hotkey.code && onClick) onClick()
  }

  const onKeyUp = e => {
    if (hotkey && e.code === hotkey.code && onTouchEnd) onTouchEnd()
  }

  const onMouseDown = () => {
    setIsMouseDown(true)
  }

  const onMouseUp = () => {
    setIsMouseDown(false)
  }



  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

      if (hotkey && hotkey.midiButton) {
        midiOutputs.forEach(output => {
          const message = hotkey.midiButton.split('-')
          message[2] = 1
          if (disabled) message[2] = 0
          if (lighted) message[2] = 64
          if (checked) message[2] = 127
          output.send(message)
        });
      }

    const onmidimessage = e => {
      if (hotkey && hotkey.midiButton == e.data[0] + '-' + e.data[1] && e.data[2] == 127) onClick && onClick()
      if (hotkey && hotkey.midiButton == e.data[0] + '-' + e.data[1] && e.data[2] == 0) onTouchEnd && onTouchEnd()
    }

    midiInputs.forEach(item => {
        item.addEventListener('midimessage', onmidimessage)
    });




    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      midiInputs.forEach(item => {
          item.removeEventListener('midimessage', onmidimessage)
      });
    }
  })

  return (
    <div
    className={className}
    onMouseDown={onClick}
    onMouseUp={onTouchEnd}
    onMouseEnter={() => {if (isMouseDown) onClick()}}
    onMouseOut={() => {if (isMouseDown) onTouchEnd()}}
    caption={caption}
    caption2={caption2}
    >
      <div className="hotkey">{hotkey ? hotkey.hint : ' '}</div>
      <div className="button__label">{label}</div>
    </div>

  );
}

export default Button;
