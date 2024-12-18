import React from 'react'
import spinner from "./assets/spinner.gif"

function Spinner() {
  return (
    <div className='text-center mt-3 mb-3'>
        <img src={spinner} alt="Loading..." />
      </div>
  )
}

export default Spinner
