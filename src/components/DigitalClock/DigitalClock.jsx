import * as React from 'react'
import BackButton from '../BackButton/BackButton'
import Sidebar from '../Sidebar/Sidebar'
import { useSEO } from '../../utils/useSEO'
import './DigitalClock.css'

const DigitalClock = () => {
  const [time, setTime] = React.useState(new Date())

  React.useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (t) => t.toLocaleTimeString('en-IN', { hour12: false })

  return <div className='digital-clock__clock-display'>{formatTime(time)}</div>
}

const DigitalClockChallenge = () => {
  useSEO('/digital-clock')
  return (
    <div className='digital-clock__container'>
      <Sidebar>
        <BackButton />
        <div className='digital-clock__section'>
          <h2 className='digital-clock__heading'>Rules</h2>
          <ul className='digital-clock__list'>
            <li>
              Use <code>useState</code> and <code>useEffect</code> correctly.
            </li>
            <li>
              Update time every 1 second using <code>setInterval</code>.
            </li>
            <li>No external time libraries allowed.</li>
            <li>Time must be displayed in 24-hour format.</li>
          </ul>
        </div>
        <div className='digital-clock__section'>
          <h2 className='digital-clock__heading'>Hints</h2>
          <ul className='digital-clock__list'>
            <li>
              Use <code>new Date()</code> to get the current time.
            </li>
            <li>Don’t forget to clear the interval on component unmount.</li>
            <li>
              <code>toLocaleTimeString()</code> can help format time properly.
            </li>
          </ul>
        </div>
      </Sidebar>

      <div className='digital-clock__content-wrapper'>
        <div className='digital-clock__main-section'>
          <h2 className='digital-clock__heading digital-clock__heading--large'>Digital Clock</h2>
          <DigitalClock />
        </div>
      </div>
    </div>
  )
}

export default DigitalClockChallenge
