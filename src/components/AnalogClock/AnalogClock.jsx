import React from 'react'
import Sidebar from '../Sidebar/Sidebar.jsx'
import BackButton from '../BackButton/BackButton.jsx'
import './AnalogClock.css'
import { useSEO } from '../../utils/useSEO'

const AnalogClock = () => {
  useSEO('/clock')
  const [time, setTime] = React.useState(new Date())

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const hours = time.getHours() % 12
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  // Calculate angles for hands
  const hourAngle = hours * 30 + minutes * 0.5
  const minuteAngle = minutes * 6
  const secondAngle = seconds * 6

  return (
    <section className='clock-wrapper'>
      <Sidebar>
        <BackButton />
        <div className='AnalogClock__side-panel rules'>
          <h2>Rules</h2>
          <ul>
            <li>12 hour numbers around circle</li>
            <li>3 hands: hour, minute, second</li>
            <li>Hour hand moves with minutes</li>
            <li>Update every second</li>
            <li>Center dot covers hand origins</li>
          </ul>
        </div>
        <div className='AnalogClock__side-panel hints'>
          <h2>Hints</h2>
          <ul>
            <li>Clock diameter: 300px</li>
            <li>
              Border: <span className='color-box color-333' /> #333 (4px)
            </li>
            <li>
              Background: <span className='color-box color-fff' /> #fff
            </li>
            <li>
              Hour hand: <span className='color-box color-000' /> #000 (6px
              wide, 80px long)
            </li>
            <li>
              Minute hand: <span className='color-box color-000' /> #000 (4px
              wide, 110px long)
            </li>
            <li>
              Second hand: <span className='color-box color-e74c3c' /> #e74c3c
              (2px wide, 120px long)
            </li>
          </ul>
        </div>
      </Sidebar>
      <div className='main-clock'>
        <h1 className='clock-header'>Analog Clock</h1>
        <div className='clock'>
          {/* Hour numbers */}
          {[...Array(12)].map((_, i) => {
            const number = i === 0 ? 12 : i
            const angle = i * 30
            return (
              <div
                key={i}
                className='hour-number'
                style={{
                  transform: `rotate(${angle}deg) translate(0, -130px) rotate(-${angle}deg)`,
                }}
              >
                {number}
              </div>
            )
          })}

          {/* Clock hands */}
          <div
            className='hand hour-hand'
            style={{
              transform: `rotate(${hourAngle}deg)`,
            }}
          />
          <div
            className='hand minute-hand'
            style={{
              transform: `rotate(${minuteAngle}deg)`,
            }}
          />
          <div
            className='hand second-hand'
            style={{
              transform: `rotate(${secondAngle}deg)`,
            }}
          />

          <div className='center-dot' />
        </div>
      </div>
    </section>
  )
}

export default AnalogClock
