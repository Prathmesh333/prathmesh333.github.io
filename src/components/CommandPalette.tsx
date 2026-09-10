import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Command, Search, X } from 'lucide-react'
import { projects, type Project } from '../data/projects'
import type { AppId } from '../types'

export type AppEntry = { id: AppId; title: string; icon: React.ReactNode; detail: string }
const searchable = (value: string) => value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

export function CommandPalette({ apps, openApp, openPreview, onClose }: { apps: AppEntry[]; openApp: (id: AppId) => void; openPreview: (project: Project) => void; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  const list = useRef<HTMLDivElement>(null)
  const results = [
    ...apps.filter(app => searchable(`${app.title} ${app.detail}`).includes(searchable(query))).map(app => ({ key: app.id, name: app.title, detail: app.detail, icon: app.icon, run: () => openApp(app.id) })),
    ...(query.trim() ? projects.filter(project => searchable(`${project.name} ${project.category} ${project.technologies.join(' ')}`).includes(searchable(query))).map(project => ({ key: project.github, name: project.name, detail: `${project.category} · Interactive preview`, icon: <Command/>, run: () => openPreview(project) })) : []),
  ]
  useEffect(() => {
    const node = dialog.current
    const previous = document.activeElement as HTMLElement | null
    node?.showModal()
    return () => { node?.close(); previous?.focus() }
  }, [])
  useEffect(() => { list.current?.querySelector(`[data-result-index="${selected}"]`)?.scrollIntoView({ block: 'nearest' }) }, [selected])
  const choose = (index: number) => { results[index]?.run(); if (results[index]) onClose() }
  return <dialog className="command-palette" ref={dialog} onCancel={event => { event.preventDefault(); onClose() }} onClick={event => { if (event.target === event.currentTarget) onClose() }} aria-label="Find an app or project">
    <div className="command-search"><Search size={21}/><input autoFocus placeholder="Find an app, project, or technology…" aria-label="Find an app, project, or technology" value={query} onChange={event => { setQuery(event.target.value); setSelected(0) }} onKeyDown={event => { if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); setSelected(index => Math.max(0, Math.min(results.length - 1, index + (event.key === 'ArrowDown' ? 1 : -1)))) } if (event.key === 'Enter') { event.preventDefault(); choose(selected) } }}/><button onClick={onClose} aria-label="Close search"><X size={18}/></button></div>
    <div className="command-results" ref={list}><p>{query ? `${results.length} matches` : 'Your workspace'}</p>{results.length ? results.map((result, index) => <button key={result.key} data-result-index={index} className={index === selected ? 'is-selected' : ''} onClick={() => choose(index)} onFocus={() => setSelected(index)}>{result.icon}<span><strong>{result.name}</strong><small>{result.detail}</small></span><ArrowUpRight size={16}/></button>) : <div className="command-empty">Nothing here yet. Try “research”, “Python”, or “résumé”.</div>}</div>
    <span className="sr-only" aria-live="polite">{results.length} results. {results[selected]?.name ?? 'No matches'}</span>
    <footer><span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span><span><kbd>↵</kbd> to open</span><span><kbd>esc</kbd> to close</span></footer>
  </dialog>
}
