import React, { useRef, useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import BackButton from '../BackButton/BackButton'
import { useSEO } from '../../utils/useSEO'
import './Modal.css'

const Modal = () => {
  useSEO('/modal')
  const [open, setOpen] = useState(false)
  const modalRef = useRef(null)
  const lastFocusedElement = useRef(null)

  // Focus trap
  useEffect(() => {
    if (open && modalRef.current) {
      lastFocusedElement.current = document.activeElement
      const focusable = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length) focusable[0].focus()
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setOpen(false)
        } else if (e.key === 'Tab') {
          // Trap focus
          const first = focusable[0]
          const last = focusable[focusable.length - 1]
          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault()
              last.focus()
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault()
              first.focus()
            }
          }
        }
      }
      modalRef.current.addEventListener('keydown', handleKeyDown)
      return () => {
        modalRef.current &&
          modalRef.current.removeEventListener('keydown', handleKeyDown)
      }
    } else if (!open && lastFocusedElement.current) {
      lastFocusedElement.current.focus()
    }
  }, [open])

  // Close on click outside
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) setOpen(false)
  }

  return (
    <div className='modal-challenge'>
      <Sidebar>
        <BackButton />
        <div className='modal-challenge__panel modal-challenge__panel--rules'>
          <h2 className='modal-challenge__panel-title'>Rules</h2>
          <ul className='modal-challenge__panel-list'>
            <li>Use semantic HTML for modal and content</li>
            <li>
              Modal must trap focus when open and return focus to trigger on
              close
            </li>
            <li>Close modal on ESC key or clicking the overlay</li>
            <li>
              Ensure keyboard accessibility for all interactive elements (Tab,
              Shift+Tab)
            </li>
            <li>
              Use <code>role="dialog"</code>, <code>aria-modal</code>, and{' '}
              <code>aria-labelledby</code> for accessibility
            </li>
            <li>Component must be responsive and work on all screen sizes</li>
          </ul>
        </div>
        <div className='modal-challenge__panel modal-challenge__panel--hints'>
          <h2 className='modal-challenge__panel-title'>Hints</h2>
          <ul className='modal-challenge__panel-list'>
            <li>
              <span className='modal-challenge__color modal-challenge__color--overlay' />{' '}
              Overlay color: <code>rgba(0,0,0,0.8)</code>
            </li>
            <li>
              Modal size: min-width 320px, max-width 90vw, max-height 90vh
            </li>
            <li>
              <span className='modal-challenge__color modal-challenge__color--modal-bg' />{' '}
              Modal background: <code>#fff</code>
            </li>
            <li>Modal border-radius: 12px</li>
            <li>
              <span className='modal-challenge__color modal-challenge__color--shadow' />{' '}
              Modal shadow: <code>0 8px 32px rgba(0,0,0,0.18)</code>
            </li>
            <li>
              <span className='modal-challenge__color modal-challenge__color--button' />{' '}
              Button style: background <code>#111</code>, white text,
              border-radius 6px
            </li>
            <li>
              Use <code>aria-labelledby</code> for title
            </li>
          </ul>
        </div>
      </Sidebar>
      <main className='modal-challenge__main'>
        <h1 className='modal-challenge__header'>Modal Dialog</h1>
        <button
          className='modal-challenge__open-btn'
          onClick={() => setOpen(true)}
        >
          Open Modal
        </button>
        {open && (
          <div
            className='modal-challenge__overlay'
            onClick={handleOverlayClick}
            tabIndex={-1}
            aria-hidden={!open}
          >
            <div
              className='modal-challenge__modal'
              ref={modalRef}
              role='dialog'
              aria-modal='true'
              aria-labelledby='modal-challenge__title'
              tabIndex={-1}
            >
              <h2
                id='modal-challenge__title'
                className='modal-challenge__modal-title'
              >
                Modal Title
              </h2>
              <p className='modal-challenge__modal-desc'>
                This is an accessible modal dialog. Try tabbing, pressing ESC,
                or clicking outside.
              </p>
              <button
                className='modal-challenge__close-btn'
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Modal
