import React from 'react'
import WebSocketComponent from './WebSocketComponent'
import BackButton from '../BackButton/BackButton'
import Sidebar from '../Sidebar/Sidebar'
import './WebSocketWrapper.css'
import { useSEO } from '../../utils/useSEO'

const WebSocketWrapper = () => {
  useSEO('/websocket')
  return (
    <div className='websocket-wrapper__container'>
      <Sidebar>
        <BackButton />
        <div className='websocket-wrapper__panel'>
          <h2 className='websocket-wrapper__panel-title'>Rules</h2>
          <ul className='websocket-wrapper__panel-list'>
            <li>Connect to a given WebSocket URL</li>
            <li>Manual connect/disconnect functionality</li>
            <li>Auto reconnect with exponential backoff</li>
            <li>Display real-time notifications from messages</li>
            <li>Send a test message</li>
            <li>Use a separate CSS file for styling</li>
          </ul>
        </div>
        <div className='websocket-wrapper__panel'>
          <h2 className='websocket-wrapper__panel-title'>Hints</h2>
          <ul className='websocket-wrapper__panel-list'>
            <li>
              Use <code>useRef</code> for the WebSocket instance
            </li>
            <li>
              Use <code>setTimeout</code> with <code>Math.pow(2, n)</code>
            </li>
            <li>Cap reconnect attempts at 5</li>
            <li>Keep notifications maxed at 50</li>
            <li>Style everything via CSS</li>
            <li>Always clean up on unmount</li>
          </ul>
        </div>
      </Sidebar>

      <div className='websocket-wrapper__main'>
        <WebSocketComponent />
      </div>
    </div>
  )
}

export default WebSocketWrapper
