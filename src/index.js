import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Accordion from './components/Accordion/Accordion.jsx'
import AnalogClock from './components/AnalogClock/AnalogClock.jsx'
import BoardOfBoredom from './components/BoardOfBoredom/BoardOfBoredom.jsx'
import DigitalClock from './components/DigitalClock/DigitalClock.jsx'
import GeoDeck from './components/GeoDeck/GeoDeck.jsx'
import RangeSlider from './components/RangeSlider/RangeSlider.jsx'
import TreeView from './components/TreeView/TreeView.jsx'
import WebSocketWrapper from './components/WebSocketComponent/WebSocketWrapper.jsx'
import Calendar from './components/Calendar/Calendar.jsx'
import GuessMyAge from './components/GuessMyAge/GuessMyAge.jsx'
import ImageCarousel from './components/ImageCarousel/ImageCarousel.jsx'

const nestedSampleData = [
  {
    id: '1',
    label: 'Root Node 1',
    children: [
      { id: '1.1', label: 'Child Node 1.1' },
      {
        id: '1.2',
        label: 'Child Node 1.2',
        children: [{ id: '1.2.1', label: 'Grandchild Node 1.2.1' }],
      },
    ],
  },
  {
    id: '2',
    label: 'Root Node 2',
    children: [{ id: '2.1', label: 'Child Node 2.1' }],
  },
  { id: '3', label: 'Root Node 3' },
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'clock', element: <AnalogClock /> },
      { path: 'board', element: <BoardOfBoredom /> },
      { path: 'treeview', element: <TreeView data={nestedSampleData} /> },
      { path: 'pagination', element: <GeoDeck /> },
      { path: 'accordion', element: <Accordion /> },
      { path: 'slider', element: <RangeSlider /> },
      { path: 'websocket', element: <WebSocketWrapper /> },
      { path: 'calendar', element: <Calendar /> },
      { path: 'digital-clock', element: <DigitalClock /> },
      { path: 'guess-my-age', element: <GuessMyAge /> },
      { path: 'carousel', element: <ImageCarousel /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
