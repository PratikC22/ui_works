import React, { useState } from 'react'
import './GuessMyAge.css'
import { useSEO } from '../../utils/useSEO'

const GuessMyAge = () => {
  useSEO('/guess-my-age')
  const [name, setName] = useState('')
  const [age, setAge] = useState(null)
  const [loading, setLoading] = useState(false)

  const guessAge = async () => {
    if (!name) return
    setLoading(true)
    const res = await fetch(`https://api.agify.io?name=${name}`)
    const data = await res.json()
    setAge(data.age)
    setLoading(false)
  }

  return (
    <div className='guess-age'>
      <h2>Guess My Age</h2>
      <input
        className='guess-age__input'
        type='text'
        placeholder='Enter a name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className='guess-age__button' onClick={guessAge}>
        Guess
      </button>
      {loading && <p>Loading...</p>}
      {age !== null && !loading && (
        <p className='guess-age__result'>Estimated Age: {age}</p>
      )}
    </div>
  )
}

export default GuessMyAge
