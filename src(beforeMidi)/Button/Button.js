import './Button.css';
import React, { useState, useEffect } from 'react';

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




    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
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
