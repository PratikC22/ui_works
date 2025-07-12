import React from 'react'

const AnalogClock: React.FC = () => {
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
    <section className='analog-clock__wrapper'>
      <div className='analog-clock__main'>
        <div className='analog-clock__face'>
          {/* Hour numbers */}
          {[...Array(12)].map((_, i) => {
            const number = i === 0 ? 12 : i
            const angle = i * 30
            return (
              <div
                key={i}
                className='analog-clock__hour-number'
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
            className='analog-clock__hand analog-clock__hand--hour'
            style={{
              transform: `rotate(${hourAngle}deg)`,
            }}
          />
          <div
            className='analog-clock__hand analog-clock__hand--minute'
            style={{
              transform: `rotate(${minuteAngle}deg)`,
            }}
          />
          <div
            className='analog-clock__hand analog-clock__hand--second'
            style={{
              transform: `rotate(${secondAngle}deg)`,
            }}
          />

          <div className='analog-clock__center-dot' />
        </div>
      </div>
      <style>{`
        .analog-clock__wrapper {
            display:flex;width:100%;gap:24px;align-items:flex-start;justify-content:space-between;height:100%;
        }
        .analog-clock__main {
            flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;margin-top:6rem;overflow-y:auto;
        }
        .analog-clock__header {
            font-size:28px;margin-bottom:64px;color:#222;
        }
        .analog-clock__face {
            width:300px;height:300px;border:4px solid #333;border-radius:50%;position:relative;background-color:#fff;box-shadow:0 6px 20px rgba(0,0,0,0.15);
        }
        .analog-clock__hour-number {
            position:absolute;top:50%;left:50%;font-size:18px;font-weight:600;color:#111;width:20px;height:20px;display:flex;align-items:center;justify-content:center;margin-left:-10px;margin-top:-10px;
        }
        .analog-clock__hand {
            position:absolute;top:50%;left:50%;transform-origin:bottom center;background-color:#000;border-radius:2px;
        }
        .analog-clock__hand--hour {
            width:6px;height:80px;margin-left:-3px;margin-top:-80px;z-index:3;
        }
        .analog-clock__hand--minute {
            width:4px;height:110px;margin-left:-2px;margin-top:-110px;z-index:4;
        }
        .analog-clock__hand--second {
            width:2px;height:120px;margin-left:-1px;margin-top:-120px;background-color:#e74c3c;z-index:5;
        }
        .analog-clock__center-dot {
            position:absolute;top:50%;left:50%;width:16px;height:16px;border-radius:50%;background-color:#000;margin-left:-8px;margin-top:-8px;z-index:6;box-shadow:0 0 4px rgba(0,0,0,0.6);border:2px solid #fff;
        }
`}</style>
    </section>
  )
}

export default AnalogClock
