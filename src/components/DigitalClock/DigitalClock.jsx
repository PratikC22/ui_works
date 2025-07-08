import * as React from 'react'
import BackButton from '../BackButton/BackButton'
import Sidebar from '../Sidebar/Sidebar'
import { useSEO } from '../../utils/useSEO'

const DigitalClock = () => {
  const [time, setTime] = React.useState(new Date())

  React.useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (t) => t.toLocaleTimeString('en-IN', { hour12: false })

  return <div style={clockStyle}>{formatTime(time)}</div>
}

const DigitalClockChallenge = () => {
  useSEO('/digital-clock')
  return (
    <div style={containerStyle}>
      <Sidebar>
        <BackButton />
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Rules</h2>
          <ul style={listStyle}>
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
        <div style={sectionStyle}>
          <h2 style={hintsHeaderStyle}>Hints</h2>
          <ul style={listStyle}>
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

      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <div style={mainSectionStyle}>
          <h2 style={{ ...headingStyle, fontSize: 28 }}>Digital Clock</h2>
          <DigitalClock />
        </div>
      </div>
    </div>
  )
}

const containerStyle = {
  width: '100vw',
  height: '100%',
  display: 'flex',
  gap: '2rem',
}

const sectionStyle = {
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '1rem',
  backgroundColor: '#fafafa',
}

const mainSectionStyle = {
  ...sectionStyle,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: 'fit-content',
}

const headingStyle = {
  fontSize: '28px',
  marginBottom: '0.75rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: 18,
}

const hintsHeaderStyle = {
  ...headingStyle,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: 18,
}

const listStyle = {
  paddingLeft: '1rem',
  margin: 0,
}

const clockStyle = {
  fontSize: '8rem',
  fontWeight: 'bold',
  marginTop: '1rem',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  backgroundColor: '#111827',
  color: '#f9fafb',
  fontFamily: 'monospace',
}

export default DigitalClockChallenge
