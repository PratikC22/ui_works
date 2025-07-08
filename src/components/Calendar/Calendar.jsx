import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import BackButton from '../BackButton/BackButton'
import './Calendar.css'

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const Calendar = () => {
  const [year, setYear] = React.useState(new Date().getFullYear())
  const [month, setMonth] = React.useState(new Date().getMonth())

  const monthName = new Date(year, month).toLocaleString('default', {
    month: 'long',
  })

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const dates = Array(firstDay)
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1))

  const changeMonth = (delta) => {
    let newMonth = month + delta
    let newYear = year
    if (newMonth > 11) {
      newMonth = 0
      newYear++
    } else if (newMonth < 0) {
      newMonth = 11
      newYear--
    }
    setMonth(newMonth)
    setYear(newYear)
  }

  return (
    <section className='calendar__container'>
      <Sidebar>
        <BackButton />
        <div className='calendar__panel calendar__panel--rules'>
          <h2 className='calendar__panel-title'>Rules</h2>
          <ul className='calendar__panel-list'>
            <li className='calendar__panel-item'>
              Displays one month at a time
            </li>
            <li className='calendar__panel-item'>Week starts on Sunday</li>
            <li className='calendar__panel-item'>
              Click arrows to change month
            </li>
          </ul>
        </div>
        <div className='calendar__panel calendar__panel--hints'>
          <h2 className='calendar__panel-title'>Hints</h2>
          <ul className='calendar__panel-list'>
            <li className='calendar__panel-item'>Grid: 7 columns (Sun–Sat)</li>
            <li className='calendar__panel-item'>Use flex or CSS grid</li>
            <li className='calendar__panel-item'>
              Handle leap years correctly
            </li>
          </ul>
        </div>
      </Sidebar>

      <div className='calendar__main'>
        <div className='calendar__header'>
          <button onClick={() => changeMonth(-1)}>&lt;</button>
          <h2>
            {monthName} {year}
          </h2>
          <button onClick={() => changeMonth(1)}>&gt;</button>
        </div>

        <div className='calendar__grid'>
          {days.map((day) => (
            <div key={day} className='calendar__cell calendar__cell--head'>
              {day}
            </div>
          ))}
          {dates.map((date, i) => (
            <div key={i} className='calendar__cell'>
              {date || ''}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Calendar
