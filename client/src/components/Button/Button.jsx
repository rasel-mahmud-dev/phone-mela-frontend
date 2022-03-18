import React from 'react'

import styles from '../shared/styles'
import wavesEffect from '../shared/waves'

import './Button.scss';

import IconButton from './IconButton'

const Button = (props) => {
  const { style, flat, block, iconStyle, hover, text, radius, ratio="1.8", circle, size, icon, bg, color, m, mt, mb, ml, mr, mx, my, p, pt, pb, pl, pr, py, px, theme, onMouseDown, waves, children, ...attributes } = props

  function handleClick(e){
    onMouseDown && onMouseDown(e);
    wavesEffect(e, waves)
  }

  const myBtnStyles = {}
  if(typeof size === 'number'){
    myBtnStyles.fontSize = `${size}px`
    myBtnStyles.width = `${size * ratio}px`
    myBtnStyles.height = `${size * ratio}px`
  }

  const classes = function(){
    const classN =  [ 
      icon && !flat ? "icon_btn" : text ? "btn_text" : "btn" ,
      icon && !flat && "btn-circle",
      flat && "btn flat-icon",
      block && "btn-block",
      size ? typeof size === 'string' ? `btn_${size}` :  "" : "",
      icon  && theme ? `btn_icon_${theme}` : text ? `${text}-text` : `btn_${theme}`,
      bg && "shadow_s1"
    ]
    const classes = classN.filter(item=> item !== false );
    return classes.join(" ")
  }

  const jsStyles = styles(style, bg, color, m, mt, mb, ml, mr, mx, my, p, pt, pb, pl, pr, py, px)
  if(radius){
    if(isNaN(radius)){
      jsStyles.borderRadius = `${radius}`

    }else{
      jsStyles.borderRadius = `${radius}px`
    }
  }

  return icon
  ? 
  (
    <IconButton
        iconStyle={iconStyle}
        classN={classes()}
        onmouseover={{color:'red'}}
        style={{...jsStyles, ...myBtnStyles}}
        icon={icon}
        flat={flat}
        onMouseDown={handleClick}
        className={classes()}
        attributes = {attributes}>{children}</IconButton>
  ) 
  : text 
  
  ? (
    <span style={jsStyles} onMouseDown={handleClick} className={classes()} {...attributes}>
      {children} 
    </span>
  ) : (
    <button style={jsStyles} onMouseDown={handleClick} className={classes()} {...attributes}>
      {children} 
    </button>
  )
  
}

export default Button

