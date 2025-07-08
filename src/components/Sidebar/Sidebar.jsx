import * as React from 'react'
import './Sidebar.css'

const Sidebar = ({ children, className = '' }) => {
  return <aside className={`sidebar ${className}`}>{children}</aside>
}

export default Sidebar
