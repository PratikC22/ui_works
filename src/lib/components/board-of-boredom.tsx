import { Button } from '@/components/ui/button'
import React from 'react'

const board = Array.from({ length: 10 }, (_, i) => {
  const start = (9 - i) * 10
  const row = Array.from({ length: 10 }, (_, j) => start + j + 1)
  return i % 2 !== 0 ? row : row.reverse()
})

const BoardOfBoredom = () => {
  const [position, setPosition] = React.useState<number>(1)
  const [dice, setDice] = React.useState<number | null>(null)

  const rollDice = () => {
    const val = Math.floor(Math.random() * 6) + 1
    setDice(val)
    setPosition((prev) => (prev + val <= 100 ? prev + val : prev))
    setTimeout(() => setDice(null), 1000)
  }

  React.useEffect(() => {
    if (position === 100) {
      alert('🎉 You won!')
      setTimeout(() => {
        setPosition(1)
        setDice(null)
      }, 1000)
    }
  }, [position])

  return (
    <section className='board__container'>
      <div className='board__main'>
        <div className='board__dice'>
          <Button onClick={rollDice} className='board__dice-button'>
            🎲 {dice ? `Rolled: ${dice}` : 'Roll Dice'}
          </Button>
        </div>
        <div className='board__grid'>
          {board.map((row, i) => (
            <div key={`row-${i}`} className='board__row'>
              {row.map((el) => (
                <div
                  key={el}
                  className={`board__tile ${
                    el % 2 === 0 ? 'board__tile--red' : ''
                  }`}
                >
                  <span className='board__tile-number'>{el}</span>
                  {el === position && <div className='board__dot' />}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .board__container{display:flex;flex-direction:row;justify-content:center;}
        .board__main{display:flex;flex-direction:column;overflow-y:auto;padding:24px;align-items:center;min-width:0;}
        .board__title{font-size:24px;margin-bottom:16px;text-align:center;}
        .board__dice{margin-bottom:20px;}
        .board__grid{display:flex;flex-direction:column;border:3px solid #000;box-shadow:0 6px 12px rgba(0,0,0,0.15);background:#fff;overflow:hidden;flex-shrink:0;}
        .board__row{display:flex;flex-shrink:0;}
        .board__tile{width:60px;height:60px;border:1px solid #444;display:flex;align-items:center;justify-content:center;font-weight:600;position:relative;background:#fdfdfd;}
        .board__tile--red{background-color:#f5d0c5;}
        .board__row:nth-child(even) .board__tile{background-color:#d1e7dd;}
        .board__row:nth-child(even) .board__tile--red{background-color:#cfe2f3;}
        .board__tile-number{position:absolute;top:4px;left:6px;font-size:12px;color:#555;}
        .board__dot{width:18px;height:18px;border-radius:50%;background-color:#000;position:absolute;bottom:4px;right:4px;border:2px solid white;}
        @media (max-width:768px){.board__container{flex-direction:column;} .board__main{margin:0;}}
      `}</style>
    </section>
  )
}

export default BoardOfBoredom
