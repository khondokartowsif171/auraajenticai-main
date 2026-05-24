// Aura Chatbox Widget
// Fetches config from dashboard API, routes messages through backend.

const DASHBOARD = 'https://aura.auraajenticai.cloud'

const ChatboxWidget = () => {
  const [config, setConfig] = React.useState(null)
  const [open, setOpen] = React.useState(false)
  const [messages, setMessages] = React.useState([])
  const [input, setInput] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [isAfterHours, setIsAfterHours] = React.useState(false)
  const messagesEndRef = React.useRef(null)

  React.useEffect(() => {
    fetch(`${DASHBOARD}/api/public/chatbox`)
      .then(r => r.ok ? r.json() : null)
      .then(cfg => {
        if (!cfg) return
        setConfig(cfg)
        if (cfg.isEnabled) {
          const afterHours = checkAfterHours(cfg.businessHours)
          setIsAfterHours(afterHours)
          setMessages([{ role: 'bot', text: cfg.welcomeMessage }])
        }
      })
      .catch(() => {})
  }, [])

  React.useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, open])

  function checkAfterHours(businessHours) {
    if (!businessHours) return false
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    const now = new Date()
    const day = days[now.getDay()]
    const hours = businessHours[day]
    if (!hours || hours === 'closed') return true
    const [open, close] = hours.split('-').map(t => {
      const [h, m] = t.split(':').map(Number)
      return h * 60 + (m || 0)
    })
    // UTC+6 Bangladesh time
    const bdMin = ((now.getUTCHours() + 6) % 24) * 60 + now.getUTCMinutes()
    return bdMin < open || bdMin >= close
  }

  async function sendMessage() {
    if (!input.trim() || loading || isAfterHours) return
    const text = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text }])
    setLoading(true)
    try {
      const res = await fetch(`${DASHBOARD}/api/public/chatbox/chat`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'bot', text: data.reply || config?.fallbackMessage }])
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: config?.fallbackMessage || "I'll get back to you soon." }])
    } finally {
      setLoading(false)
    }
  }

  function onKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  if (!config?.isEnabled) return null

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
      {/* Chat window */}
      {open && (
        <div style={{
          width: 340, maxHeight: 480,
          background: 'var(--bg-elev)',
          border: '1px solid var(--line-strong)',
          borderRadius: 16,
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            padding: '14px 16px',
            background: '#0a0a0a',
            display: 'flex', alignItems: 'center', gap: 10,
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg, #c8a961 0%, #1d9e75 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, flexShrink: 0,
            }}>⬡</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#f4f5f7' }}>Aura AI</div>
              <div style={{ fontSize: 11, color: isAfterHours ? '#f59e0b' : '#4ade80', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
                {isAfterHours ? 'After hours' : 'Online'}
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{
              marginLeft: 'auto', background: 'none', border: 'none',
              color: '#6b7080', cursor: 'pointer', fontSize: 16, lineHeight: 1,
              padding: '2px 4px',
            }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '12px 14px',
            display: 'flex', flexDirection: 'column', gap: 8,
            minHeight: 200, maxHeight: 280,
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
              }}>
                <div style={{
                  maxWidth: '80%', padding: '8px 12px',
                  borderRadius: m.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  background: m.role === 'user' ? '#c8a961' : 'rgba(255,255,255,0.06)',
                  color: m.role === 'user' ? '#0a0a0a' : '#e0e2e8',
                  fontSize: 13, lineHeight: 1.5,
                  fontWeight: m.role === 'user' ? 500 : 400,
                }}>{m.text}</div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '8px 14px', borderRadius: '12px 12px 12px 2px',
                  background: 'rgba(255,255,255,0.06)', color: '#6b7080',
                  fontSize: 13, letterSpacing: 4,
                }}>•••</div>
              </div>
            )}
            {isAfterHours && (
              <div style={{
                padding: '8px 10px', background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.2)', borderRadius: 8,
                fontSize: 12, color: '#f59e0b',
              }}>
                {config.afterHoursMessage}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '10px 12px',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', gap: 8,
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              disabled={isAfterHours || loading}
              placeholder={isAfterHours ? 'Chat unavailable right now' : 'Ask me anything…'}
              style={{
                flex: 1, padding: '8px 12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8, color: '#f4f5f7',
                fontSize: 13,
                outline: 'none',
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading || isAfterHours}
              style={{
                width: 34, height: 34, flexShrink: 0,
                background: input.trim() && !isAfterHours ? '#c8a961' : 'rgba(255,255,255,0.06)',
                border: 'none', borderRadius: 8,
                color: input.trim() && !isAfterHours ? '#0a0a0a' : '#6b7080',
                cursor: input.trim() && !isAfterHours ? 'pointer' : 'not-allowed',
                fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.15s',
              }}
            >↑</button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        title="Chat with Aura AI"
        style={{
          width: 52, height: 52, borderRadius: '50%',
          background: open ? '#0a0a0a' : 'linear-gradient(135deg, #c8a961 0%, #1d9e75 100%)',
          border: open ? '2px solid rgba(255,255,255,0.15)' : 'none',
          color: open ? '#f4f5f7' : '#0a0a0a',
          fontSize: 20, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: open ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(200,169,97,0.4)',
          transition: 'all 0.2s',
        }}
      >
        {open ? '✕' : '⬡'}
      </button>
    </div>
  )
}

window.ChatboxWidget = ChatboxWidget
