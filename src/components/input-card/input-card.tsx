import React, { useMemo } from 'react'
import './input-card.css'


interface Props extends React.PropsWithChildren {
  icon?: any
  label?: string
}

const InputCard = (props: Props) => {
  return (<div className="form-group">
    <div className="form-label">
      <div className="label-icon">
        <img src={props.icon} alt="icon" />
      </div>
      <div className="vertical-divider"></div>
      <div className="label-input">
        <label>{props.label}</label>
        {props.children}
      </div>
    </div>
  </div>)
}
export default InputCard