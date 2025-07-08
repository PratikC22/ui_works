import React, { useState } from 'react'
import BackButton from '../BackButton/BackButton'
import Sidebar from '../Sidebar/Sidebar'
import { useSEO } from '../../utils/useSEO'
import './RangeSlider.css'

const RangeSlider = () => {
  useSEO('/slider')
  const [value, setValue] = useState(50)

  return (
    <div className='range-slider__container'>
      <Sidebar>
        <BackButton />
        <aside className='range-slider__side-panel'>
          <h2 className='range-slider__side-panel-title'>Rules</h2>
          <ul className='range-slider__side-panel-list'>
            <li className='range-slider__side-panel-item'>
              Must display current value in real-time
            </li>
            <li className='range-slider__side-panel-item'>
              Should have proper min/max bounds (0-100)
            </li>
            <li className='range-slider__side-panel-item'>
              Cursor should change to pointer on hover
            </li>
            <li className='range-slider__side-panel-item'>
              Must be keyboard accessible (arrow keys)
            </li>
            <li className='range-slider__side-panel-item'>
              Label should be associated with input
            </li>
            <li className='range-slider__side-panel-item'>
              Component should be responsive and centered
            </li>
          </ul>
        </aside>

        <aside className='range-slider__side-panel'>
          <h2 className='range-slider__side-panel-title'>Hints</h2>
          <ul className='range-slider__side-panel-list'>
            <li className='range-slider__side-panel-item'>
              <span
                className='range-slider__color-box'
                style={{ backgroundColor: '#f9f9f9' }}
              ></span>{' '}
              Use background <code className='range-slider__code'>#f9f9f9</code>{' '}
              for panels
            </li>
            <li className='range-slider__side-panel-item'>
              <span
                className='range-slider__color-box'
                style={{ backgroundColor: '#111', borderColor: '#000' }}
              ></span>{' '}
              Use <code className='range-slider__code'>color: #111</code> for
              labels
            </li>
            <li className='range-slider__side-panel-item'>
              <span
                className='range-slider__color-box'
                style={{ backgroundColor: '#ddd' }}
              ></span>{' '}
              Use <code className='range-slider__code'>#ddd</code> for track
            </li>
            <li className='range-slider__side-panel-item'>
              Use{' '}
              <code className='range-slider__code'>Number(e.target.value)</code>{' '}
              to convert
            </li>
            <li className='range-slider__side-panel-item'>
              Set <code className='range-slider__code'>cursor: pointer</code> on
              input
            </li>
            <li className='range-slider__side-panel-item'>
              Use <code className='range-slider__code'>htmlFor</code> to link
              label
            </li>
          </ul>
        </aside>
      </Sidebar>

      <section
        style={{
          width: '100vw',
          height: '100%',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <section className='range-slider__section'>
          <h1 className='range-slider__header'>Range Slider</h1>
          <label htmlFor='range' className='range-slider__label'>
            Value: {value}
          </label>
          <input
            id='range'
            type='range'
            min='0'
            max='100'
            value={value}
            className='range-slider__input'
            onChange={(e) => setValue(Number(e.target.value))}
          />
        </section>
      </section>
    </div>
  )
}

export default RangeSlider
