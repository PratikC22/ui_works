import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import './BackButton.css'

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <button onClick={() => navigate(-1)} className='back-button'>
      ← Back
    </button>
  )
}

BackButton.displayName = 'BackButton'

export default BackButton
