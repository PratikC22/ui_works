import React, { useState } from 'react'
import BackButton from '../BackButton/BackButton'
import Sidebar from '../Sidebar/Sidebar'

const styles = {
  container: {
    width: '100vw',
    height: '100%',
    display: 'flex',
    color: '#222',
  },
  sliderSection: {
    width: '100%',
    maxWidth: '600px',
    marginBottom: '48px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderHeader: {
    fontSize: '28px',
    marginBottom: '24px',
    color: '#222',
  },
  rangeSliderLabel: {
    display: 'block',
    marginBottom: '16px',
    fontWeight: '600',
    fontSize: '18px',
    color: '#111',
    textAlign: 'center',
  },
  rangeSliderInput: {
    width: '100%',
    height: '8px',
    borderRadius: '4px',
    background: '#ddd',
    outline: 'none',
    cursor: 'pointer',
    WebkitAppearance: 'none',
    appearance: 'none',
  },
  sidePanel: {
    flex: '1 1 300px',
    background: '#f9f9f9',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    fontSize: '14px',
    minWidth: '280px',
  },
  sidePanelH2: {
    fontSize: '18px',
    marginBottom: '12px',
    color: '#111',
    borderBottom: '1px solid #ccc',
    paddingBottom: '4px',
    margin: '0 0 12px 0',
  },
  sidePanelUl: {
    listStyle: 'disc',
    paddingLeft: '20px',
    margin: 0,
  },
  sidePanelLi: {
    marginBottom: '8px',
  },
  colorBox: {
    display: 'inline-block',
    width: '12px',
    height: '12px',
    marginRight: '6px',
    border: '1px solid #999',
    verticalAlign: 'middle',
    borderRadius: '2px',
  },
}

const RangeSlider = () => {
  const [value, setValue] = useState(50)

  return (
    <div style={styles.container}>
      <Sidebar>
        <BackButton />
        <aside style={styles.sidePanel}>
          <h2 style={styles.sidePanelH2}>Rules</h2>
          <ul style={styles.sidePanelUl}>
            <li style={styles.sidePanelLi}>
              Must display current value in real-time
            </li>
            <li style={styles.sidePanelLi}>
              Should have proper min/max bounds (0-100)
            </li>
            <li style={styles.sidePanelLi}>
              Cursor should change to pointer on hover
            </li>
            <li style={styles.sidePanelLi}>
              Must be keyboard accessible (arrow keys)
            </li>
            <li style={styles.sidePanelLi}>
              Label should be associated with input
            </li>
            <li style={styles.sidePanelLi}>
              Component should be responsive and centered
            </li>
          </ul>
        </aside>

        <aside style={styles.sidePanel}>
          <h2 style={styles.sidePanelH2}>Hints</h2>
          <ul style={styles.sidePanelUl}>
            <li style={styles.sidePanelLi}>
              <span
                style={{ ...styles.colorBox, backgroundColor: '#f9f9f9' }}
              ></span>{' '}
              Use background{' '}
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '2px 4px',
                  borderRadius: '3px',
                  fontSize: '13px',
                }}
              >
                #f9f9f9
              </code>{' '}
              for panels
            </li>
            <li style={styles.sidePanelLi}>
              <span
                style={{
                  ...styles.colorBox,
                  backgroundColor: '#111',
                  borderColor: '#000',
                }}
              ></span>{' '}
              Use{' '}
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '2px 4px',
                  borderRadius: '3px',
                  fontSize: '13px',
                }}
              >
                color: #111
              </code>{' '}
              for labels
            </li>
            <li style={styles.sidePanelLi}>
              <span
                style={{ ...styles.colorBox, backgroundColor: '#ddd' }}
              ></span>{' '}
              Use{' '}
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '2px 4px',
                  borderRadius: '3px',
                  fontSize: '13px',
                }}
              >
                #ddd
              </code>{' '}
              for track
            </li>
            <li style={styles.sidePanelLi}>
              Use{' '}
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '2px 4px',
                  borderRadius: '3px',
                  fontSize: '13px',
                }}
              >
                Number(e.target.value)
              </code>{' '}
              to convert
            </li>
            <li style={styles.sidePanelLi}>
              Set{' '}
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '2px 4px',
                  borderRadius: '3px',
                  fontSize: '13px',
                }}
              >
                cursor: pointer
              </code>{' '}
              on input
            </li>
            <li style={styles.sidePanelLi}>
              Use{' '}
              <code
                style={{
                  background: '#f0f0f0',
                  padding: '2px 4px',
                  borderRadius: '3px',
                  fontSize: '13px',
                }}
              >
                htmlFor
              </code>{' '}
              to link label
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
        <section style={styles.sliderSection}>
          <h1 style={styles.sliderHeader}>Range Slider</h1>
          <label htmlFor='range' style={styles.rangeSliderLabel}>
            Value: {value}
          </label>
          <input
            id='range'
            type='range'
            min='0'
            max='100'
            value={value}
            style={styles.rangeSliderInput}
            onChange={(e) => setValue(Number(e.target.value))}
          />
        </section>
      </section>

      <style>{`
        input[type="range"]::-webkit-slider-track {
          background: #ddd;
          border-radius: 4px;
          height: 8px;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #333;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        input[type="range"]::-moz-range-track {
          background: #ddd;
          border-radius: 4px;
          height: 8px;
          border: none;
        }
        input[type="range"]::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #333;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        @media (max-width: 1024px) {
          section {
            padding: 0 16px;
          }
          aside {
            width: 100% !important;
            margin-bottom: 24px;
          }
        }
      `}</style>
    </div>
  )
}

export default RangeSlider
