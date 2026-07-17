import { useEffect, useState } from 'react'

// Inline code/notes editor for a single problem.
// Auto-saves on blur and via the Save button; saving non-empty code marks the
// problem done (handled in ProgressContext.saveNote).
export default function CodeNote({
  initialValue = '',
  onSave,
  onClose,
  label = '💾 Your solution / notes',
  placeholder = '// Paste or write your solution here\n// Saving will mark this done and keep your code for later reference',
}) {
  const [code, setCode] = useState(initialValue)
  const [saved, setSaved] = useState(false)

  useEffect(() => { setCode(initialValue) }, [initialValue])

  const handleSave = () => {
    onSave(code)
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  const handleKeyDown = (e) => {
    // allow Tab to insert spaces instead of leaving the textarea
    if (e.key === 'Tab') {
      e.preventDefault()
      const { selectionStart, selectionEnd } = e.target
      const next = code.slice(0, selectionStart) + '  ' + code.slice(selectionEnd)
      setCode(next)
      requestAnimationFrame(() => {
        e.target.selectionStart = e.target.selectionEnd = selectionStart + 2
      })
    }
    // Ctrl/Cmd + Enter to save
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      handleSave()
    }
  }

  return (
    <div className="code-note">
      <div className="code-note-bar">
        <span className="code-note-title">{label}</span>
        <span className="code-note-hint">Tab to indent · ⌘/Ctrl + Enter to save</span>
        <div className="code-note-actions">
          <button className="btn btn-sm" onClick={handleSave}>{saved ? 'Saved ✓' : 'Save'}</button>
          <button className="btn btn-sm ghost" onClick={() => { setCode(''); onSave('') }}>Clear</button>
          <button className="btn btn-sm ghost" onClick={onClose}>Close</button>
        </div>
      </div>
      <textarea
        className="code-area"
        value={code}
        spellCheck={false}
        placeholder={placeholder}
        onChange={(e) => setCode(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
