import { useEffect, useRef, useState } from 'react'
import type { AppId } from '../types'

type Line = { kind: 'command' | 'output'; text: string }
const help = 'help · about · projects · skills · research · github · resume · contact · ls · cd · pwd · cat · clear · whoami · neofetch · fortune · coffee · matrix · ping recruiter · sudo hire-me'

export function Terminal({ openApp, onCommand, onMatrix, secretUnlocked, unlockSecret }: { openApp: (id: AppId) => void; onCommand: () => void; onMatrix: () => void; secretUnlocked: boolean; unlockSecret: () => void }) {
  const [input, setInput] = useState('')
  const [cwd, setCwd] = useState('~')
  const [history, setHistory] = useState<Line[]>([{ kind: 'output', text: 'PrathameshOS shell 1.0 · type help to inspect available commands.' }])
  const end = useRef<HTMLDivElement>(null)
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }) }, [history])

  const output = (command: string): string => {
    const cmd = command.trim().toLowerCase()
    if (cmd === 'help') return help
    if (cmd === 'whoami' || cmd === 'about') return 'Prathamesh Nikam\nAI/ML Engineer · Software Developer\nFocus: distributed learning, evidence-grounded AI, developer tools.'
    if (cmd === 'pwd') return cwd === '~' ? '/home/prathamesh' : `/home/prathamesh/${cwd.replace('~/', '')}`
    if (cmd === 'ls') return cwd === '~/secret' ? 'classified.txt' : 'about.txt  skills.txt  resume.pdf  projects/  research/  secret/'
    if (cmd === 'cd projects') { setCwd('~/projects'); return 'Entered /projects — try the projects command.' }
    if (cmd === 'cd secret') { setCwd('~/secret'); return 'Restricted directory entered. Read classified.txt.' }
    if (cmd === 'cd ..' || cmd === 'cd ~') { setCwd('~'); return '/home/prathamesh' }
    if (cmd === 'cat about.txt') return 'Builder of ML systems, developer tools, and practical AI experiments.'
    if (cmd === 'cat skills.txt') return 'Python · PyTorch · Ray · TypeScript · ML systems · Distributed computing'
    if (cmd === 'cat classified.txt' && cwd === '~/secret') { unlockSecret(); return 'CLASSIFIED: Curiosity compounds. Secret archive unlocked.' }
    if (cmd === 'sudo hire-me') return 'Checking permissions…\nACCESS GRANTED. Excellent decision.'
    if (cmd === 'sudo') return 'Recruiter privileges required.'
    if (cmd === 'rm -rf /') return 'Nice try. Portfolio protected.'
    if (cmd === 'coffee') return 'Brewing… ██████████ 100%\nException resolved: developer caffeinated.'
    if (cmd === 'fortune') return 'The best abstractions make the hard thing visible and the repetitive thing disappear.'
    if (cmd === 'ping recruiter') return '64 bytes from recruiter: interest=high time=12ms\n1 packet transmitted, 1 opportunity received.'
    if (cmd === 'neofetch') return '▟████▙  PrathameshOS\n▜████▛  Host: portfolio-web\n  ▀▀    Stack: React + TypeScript\n        Focus: AI / distributed systems'
    if (cmd === 'matrix') { onMatrix(); return 'Wake up, recruiter… visual layer toggled.' }
    if (['projects', 'skills', 'research', 'resume', 'contact'].includes(cmd)) { openApp(cmd as AppId); return `Launching ${cmd}.app…` }
    if (cmd === 'github') { window.open('https://github.com/Prathmesh333', '_blank', 'noopener,noreferrer'); return 'Opening GitHub profile…' }
    return `command not found: ${command}. Type help.`
  }
  const submit = (e: React.FormEvent) => {
    e.preventDefault(); if (!input.trim()) return
    if (input.trim().toLowerCase() === 'clear') { setHistory([]); setInput(''); return }
    const result = output(input)
    setHistory(lines => [...lines, { kind: 'command', text: input }, { kind: 'output', text: result }])
    setInput(''); onCommand()
  }
  return <div className="terminal" onClick={() => document.getElementById('terminal-input')?.focus()}>
    <div className="terminal-top"><span>SESSION 01</span><span>UTF-8</span><span>{secretUnlocked ? 'SECRET:UNLOCKED' : 'GUEST'}</span></div>
    <div className="terminal-log">{history.map((line, i) => <div className={line.kind} key={`${line.text}-${i}`}>{line.kind === 'command' && <span>prathamesh@portfolio:{cwd}$ </span>}{line.text}</div>)}<div ref={end}/></div>
    <form onSubmit={submit}><label htmlFor="terminal-input">prathamesh@portfolio:{cwd}$</label><input id="terminal-input" value={input} onChange={e => setInput(e.target.value)} autoComplete="off" spellCheck={false} aria-label="Terminal command" /></form>
  </div>
}
