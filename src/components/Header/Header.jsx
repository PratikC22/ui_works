import * as React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header style={headerStyle}>
      <div style={innerStyle}>
        <Link to='/'>
          <span style={labelStyle}>UI Works</span>
        </Link>
        <span style={subtleStyle}>Frontend mini challenges</span>
      </div>
    </header>
  )
}

const headerStyle = {
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  backgroundColor: '#f9fafb',
  borderBottom: '1px solid #e5e7eb',
  padding: '0.5rem 1rem',
  backdropFilter: 'blur(6px)',
}

const innerStyle = {
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
  alignItems: 'center',
  margin: '0 auto',
  fontFamily: 'sans-serif',
  paddingInline: '16px',
}

const labelStyle = {
  fontSize: '1.25rem',
  fontWeight: 600,
  color: '#111827',
}

const subtleStyle = {
  fontSize: '12px',
  color: '#6b7280',
  marginTop: 6,
}

export default Header
