import { useEffect, useRef, useState } from 'react'
import { Maximize2, Minus, X } from 'lucide-react'
import type { AppId, WindowState } from '../types'

type Props = {
  window: WindowState
  mobile: boolean
  active?: boolean
  onFocus: (id: AppId) => void
  onMove: (id: AppId, x: number, y: number) => void
  onMinimize: (id: AppId) => void
  onMaximize: (id: AppId) => void
  onClose: (id: AppId) => void
  children: React.ReactNode
}

export function Window({ window: win, mobile, active, onFocus, onMove, onMinimize, onMaximize, onClose, children }: Props) {
  const windowRef = useRef<HTMLElement>(null)
  const drag = useRef<{ pointerId: number; startX: number; startY: number; x: number; y: number } | null>(null)
  const [viewport, setViewport] = useState(() => ({ width: window.innerWidth, height: window.innerHeight }))
  const visible = win.isOpen && !win.minimized

  useEffect(() => {
    const resize = () => {
      drag.current = null
      setViewport({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    if (!visible) drag.current = null
    if (!visible || active === false) return

    const frame = window.requestAnimationFrame(() => {
      const element = windowRef.current
      if (element && !element.contains(document.activeElement)) element.focus({ preventScroll: true })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [visible, active])

  // The desktop reserves 52px for navigation and 94px for the dock.
  const inset = 12
  const usableHeight = Math.max(0, viewport.height - 146)
  const width = Math.min(win.size.width, Math.max(1, viewport.width - inset * 2))
  const height = Math.min(win.size.height, Math.max(1, usableHeight - inset * 2))
  const clampX = (x: number) => Math.max(inset, Math.min(viewport.width - width - inset, x))
  const clampY = (y: number) => Math.max(inset, Math.min(usableHeight - height - inset, y))
  const x = clampX(win.position.x)
  const y = clampY(win.position.y)

  if (!visible) return null

  const focus = () => { if (active !== true) onFocus(win.id) }

  const beginDrag = (event: React.PointerEvent) => {
    if (!event.isPrimary || event.button !== 0 || mobile || win.maximized || (event.target as HTMLElement).closest('button')) return
    drag.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, x, y }
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const moveDrag = (event: React.PointerEvent) => {
    if (!drag.current || event.pointerId !== drag.current.pointerId) return
    onMove(win.id, clampX(drag.current.x + event.clientX - drag.current.startX), clampY(drag.current.y + event.clientY - drag.current.startY))
  }
  const endDrag = () => { drag.current = null }

  const style: React.CSSProperties = {
    zIndex: win.zIndex,
    ...(!win.maximized && !mobile ? { width, height, transform: `translate3d(${x}px, ${y}px, 0)` } : {}),
  }

  return (
    <section ref={windowRef} className={`os-window ${win.maximized ? 'is-maximized' : ''}`} style={style} onPointerDown={focus} onFocusCapture={focus} tabIndex={-1} data-active={active} inert={mobile && active === false ? true : undefined} aria-label={`${win.title} application`}>
      <header className="window-bar" onPointerDown={beginDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={endDrag} onDoubleClick={event => { if (!mobile && !(event.target as HTMLElement).closest('button')) onMaximize(win.id) }}>
        <span className="window-identity"><i aria-hidden="true" />{win.title}</span>
        <div className="window-actions">
          {!mobile && <button type="button" onClick={() => onMinimize(win.id)} aria-label={`Minimize ${win.title}`}><Minus size={14} /></button>}
          {!mobile && <button type="button" onClick={() => onMaximize(win.id)} aria-label={`${win.maximized ? 'Restore' : 'Maximize'} ${win.title}`}><Maximize2 size={13} /></button>}
          <button type="button" className="close" onClick={() => onClose(win.id)} aria-label={`Close ${win.title}`}><X size={14} /></button>
        </div>
      </header>
      <div className="window-content">{children}</div>
    </section>
  )
}
