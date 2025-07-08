import * as React from 'react'
import Sidebar from '../Sidebar/Sidebar.jsx'
import BackButton from '../BackButton/BackButton.jsx'
import { useSEO } from '../../utils/useSEO'
import './TreeView.css'

const TreeNode = ({ node, level = 0 }) => {
  const [collapsed, setCollapsed] = React.useState(false)
  const hasChildren = node.children && node.children.length > 0

  const toggleCollapse = () => setCollapsed(!collapsed)

  return (
    <>
      <div className={`tree-view__node-container`} style={{ '--level': level }}>
        <div
          className={`tree-view__node ${
            hasChildren
              ? 'tree-view__node--has-children'
              : 'tree-view__node--no-children'
          } ${level === 0 ? 'tree-view__node--root' : ''} ${
            collapsed ? 'tree-view__node--collapsed' : ''
          }`}
          role={hasChildren ? 'button' : undefined}
          tabIndex={hasChildren ? 0 : undefined}
          aria-expanded={!collapsed}
          onClick={hasChildren ? toggleCollapse : undefined}
          onKeyDown={(e) => {
            if (hasChildren && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault()
              toggleCollapse()
            }
          }}
        >
          <span className='tree-view__node-label'>
            {node.label || 'Tree Node'}
          </span>
        </div>
      </div>

      {hasChildren && !collapsed && (
        <div>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </>
  )
}

const TreeView = ({ data = [] }) => {
  useSEO('/treeview')
  const [copySuccess, setCopySuccess] = React.useState('')
  const configText = JSON.stringify(data, null, 2)

  const handleCopy = () => {
    navigator.clipboard.writeText(configText).then(() => {
      setCopySuccess('Copied!')
      setTimeout(() => setCopySuccess(''), 2000)
    })
  }

  return (
    <div className='tree-view__container'>
      <Sidebar>
        <BackButton />
        <section className='tree-view__row'>
          <aside className='tree-view__panel'>
            <h2 className='tree-view__panel-header'>Rules</h2>
            <ul className='tree-view__list'>
              <li className='tree-view__list-item'>
                Data nodes must have unique IDs
              </li>
              <li className='tree-view__list-item'>
                Each node displays its label
              </li>
              <li className='tree-view__list-item'>
                Supports nested tree structure
              </li>
              <li className='tree-view__list-item'>
                Nodes can be expanded/collapsed by clicking
              </li>
              <li className='tree-view__list-item'>
                Keyboard accessible with Enter/Space
              </li>
              <li className='tree-view__list-item'>
                Clean and minimal UI consistent with app
              </li>
            </ul>
          </aside>

          <aside className='tree-view__panel'>
            <h2 className='tree-view__panel-header'>Hints</h2>
            <pre className='tree-view__config-box'>{configText}</pre>
            <button
              className='tree-view__copy-button'
              onClick={handleCopy}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = '#222')
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = '#444')
              }
              aria-label='Copy config JSON to clipboard'
            >
              Copy
            </button>
            {copySuccess && (
              <div className='tree-view__copy-success-text'>{copySuccess}</div>
            )}
          </aside>
        </section>
      </Sidebar>
      <section className='tree-view__main-section'>
        <h1 className='tree-view__header'>Tree View</h1>
        <div className='tree-view__tree-container'>
          {data.length === 0 && (
            <div className='tree-view__empty-state'>No nodes available</div>
          )}
          {data.map((node) => (
            <TreeNode key={node.id} node={node} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default TreeView
