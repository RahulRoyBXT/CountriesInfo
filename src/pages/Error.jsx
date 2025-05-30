import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
    const {data} = useRouteError();
  return (
    <div style={{fontSize:"50px"}}>{data}</div>
  )
}

export default Error
