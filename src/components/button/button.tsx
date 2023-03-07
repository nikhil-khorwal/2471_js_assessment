import React, { useCallback } from 'react'
import './button.css'

interface Props extends React.PropsWithChildren {
  type: "submit" | "button"
}

const Button = ((props: Props) => {
  return (<button type={props.type}>{props.children}</button>)
}
)
export default Button