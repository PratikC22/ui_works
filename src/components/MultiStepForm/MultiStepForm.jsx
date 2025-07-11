import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import BackButton from '../BackButton/BackButton'
import { useSEO } from '../../utils/useSEO'
import './MultiStepForm.css'

const steps = [
  {
    label: 'Personal Info',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
    ],
  },
  {
    label: 'Address',
    fields: [
      { name: 'address', label: 'Address', type: 'text', required: true },
      { name: 'city', label: 'City', type: 'text', required: true },
    ],
  },
  {
    label: 'Review',
    fields: [],
  },
]

const initialData = { name: '', email: '', address: '', city: '' }

const MultiStepForm = () => {
  useSEO('/multistep-form')
  const [step, setStep] = useState(0)
  const [data, setData] = useState(initialData)
  const [errors, setErrors] = useState({})

  const current = steps[step]

  const validate = () => {
    const errs = {}
    if (current.fields) {
      current.fields.forEach((f) => {
        if (f.required && !data[f.name]) errs[f.name] = 'Required'
      })
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: undefined })
  }

  const handleNext = (e) => {
    e.preventDefault()
    if (validate()) setStep(step + 1)
  }

  const handleBack = (e) => {
    e.preventDefault()
    setStep(step - 1)
  }

  return (
    <div className='multi-step-form'>
      <Sidebar>
        <BackButton />
        <div className='multi-step-form__panel multi-step-form__panel--rules'>
          <h2 className='multi-step-form__panel-title'>Rules</h2>
          <ul className='multi-step-form__panel-list'>
            <li>Use semantic HTML for forms and inputs</li>
            <li>
              Each step must be accessible via keyboard (Tab, Shift+Tab, Enter)
            </li>
            <li>Use ARIA attributes for step indicators and error messages</li>
            <li>Show a progress indicator for steps</li>
            <li>Validate required fields before allowing next step</li>
            <li>Component must be responsive and work on all screen sizes</li>
          </ul>
        </div>
        <div className='multi-step-form__panel multi-step-form__panel--hints'>
          <h2 className='multi-step-form__panel-title'>Hints</h2>
          <ul className='multi-step-form__panel-list'>
            <li>
              <span className='multi-step-form__color multi-step-form__color--progress' />{' '}
              Progress bar: <code>#4f46e5</code>
            </li>
            <li>
              <span className='multi-step-form__color multi-step-form__color--step-bg' />{' '}
              Step background: <code>#fff</code>
            </li>
            <li>
              <span className='multi-step-form__color multi-step-form__color--error' />{' '}
              Error color: <code>#dc2626</code>
            </li>
            <li>
              Step card border-radius: <strong>12px</strong>
            </li>
            <li>
              Button style: background <code>#111</code>, white text,
              border-radius <strong>6px</strong>
            </li>
          </ul>
        </div>
      </Sidebar>
      <main className='multi-step-form__main'>
        <h1 className='multi-step-form__header'>Multi-Step Form</h1>
        <div className='multi-step-form__progress'>
          <div
            className='multi-step-form__progress-bar'
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            aria-valuenow={step + 1}
            aria-valuemax={steps.length}
            aria-valuemin={1}
            role='progressbar'
          />
        </div>
        <form
          className='multi-step-form__form'
          onSubmit={handleNext}
          aria-labelledby='step-label'
        >
          <h2 id='step-label' className='multi-step-form__step-label'>
            {current.label}
          </h2>
          {current.fields &&
            current.fields.map((f) => (
              <div className='multi-step-form__field' key={f.name}>
                <label htmlFor={f.name} className='multi-step-form__label'>
                  {f.label}
                </label>
                <input
                  id={f.name}
                  name={f.name}
                  type={f.type}
                  value={data[f.name]}
                  onChange={handleChange}
                  required={f.required}
                  className='multi-step-form__input'
                  aria-invalid={!!errors[f.name]}
                  aria-describedby={
                    errors[f.name] ? `${f.name}-error` : undefined
                  }
                />
                {errors[f.name] && (
                  <span
                    className='multi-step-form__error'
                    id={`${f.name}-error`}
                    role='alert'
                  >
                    {errors[f.name]}
                  </span>
                )}
              </div>
            ))}
          {step === 2 && (
            <div className='multi-step-form__review'>
              <div>
                <strong>Name:</strong> {data.name}
              </div>
              <div>
                <strong>Email:</strong> {data.email}
              </div>
              <div>
                <strong>Address:</strong> {data.address}
              </div>
              <div>
                <strong>City:</strong> {data.city}
              </div>
            </div>
          )}
          <div className='multi-step-form__actions'>
            {step > 0 && (
              <button
                className='multi-step-form__button'
                onClick={handleBack}
                type='button'
              >
                Back
              </button>
            )}
            {step < steps.length - 1 ? (
              <button
                className='multi-step-form__button multi-step-form__button--primary'
                type='submit'
              >
                Next
              </button>
            ) : (
              <button
                className='multi-step-form__button multi-step-form__button--primary'
                type='button'
                disabled
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  )
}

export default MultiStepForm
