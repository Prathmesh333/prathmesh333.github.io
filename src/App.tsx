import { useEffect, useMemo, useState } from 'react'
import { Atom, BatteryCharging, BriefcaseBusiness, ChevronRight, CircleUserRound, Cpu, FileCode2, FileText, FlaskConical, FolderOpen, Gamepad2, GraduationCap, HardDrive, Mail, Menu, MonitorCog, PackageCheck, Power, RotateCcw, Search, TerminalSquare, Trophy, Volume2, VolumeX, Wifi } from 'lucide-react'
import { Window } from './components/Window'
import { AboutApp, ContactApp, EducationApp, GamesApp, MonitorApp, ProjectsApp, RecruiterPanel, ResearchApp, ResumeApp, SkillsApp, WelcomeApp } from './apps/PortfolioApps'
import { CanIPlayDemo, HQDEDemo, ProjectPreview, VSFeedDemo } from './apps/Demos'
import { Terminal } from './apps/Terminal'
import { projects, type Project } from './data/projects'
import type { AppId, WindowState } from './types'

const appMeta: Record<AppId, { title: string; icon: React.ReactNode; path: string }> = {
  welcome: { title: 'Welcome.sys', icon: <CircleUserRound/>, path: 'home' },
  projects: { title: 'Project Explorer', icon: <FolderOpen/>, path: 'projects' },
  research: { title: 'Research Lab', icon: <FlaskConical/>, path: 'research' },
  terminal: { title: 'Terminal', icon: <TerminalSquare/>, path: 'terminal' },
  skills: { title: 'Installed Packages', icon: <PackageCheck/>, path: 'skills' },
  about: { title: 'User Profile', icon: <CircleUserRound/>, path: 'about' },
  education: { title: 'Education Log', icon: <GraduationCap/>, path: 'education' },
  resume: { title: 'Resume Viewer', icon: <FileText/>, path: 'resume' },
  contact: { title: 'Communication Center', icon: <Mail/>, path: 'contact' },
  games: { title: 'Challenge Arcade', icon: <Gamepad2/>, path: 'games' },
  monitor: { title: 'Resource Monitor', icon: <MonitorCog/>, path: 'monitor' },
  hqde: { title: 'HQDE Distributed Lab', icon: <Atom/>, path: 'research/hqde' },
  vsfeed: { title: 'VSFeed Preview', icon: <FileCode2/>, path: 'projects/vsfeed' },
  caniplay: { title: 'CanIPlay Network Test', icon: <Wifi/>, path: 'projects/caniplay' },
  preview: { title: 'Project UI Preview', icon: <FileCode2/>, path: 'projects/preview' },
}

const initialWindows = (): Record<AppId, WindowState> => {
  const ids = Object.keys(appMeta) as AppId[]
  return Object.fromEntries(ids.map((id, index) => [id, {
    id,
    title: appMeta[id].title,
    isOpen: id === 'welcome',
    minimized: false,
    maximized: false,
    position: { x: 110 + (index % 5) * 28, y: 22 + (index % 4) * 14 },
    size: id === 'terminal' ? { width: 780, height: 500 } : id === 'welcome' ? { width: 930, height: 560 } : { width: 980, height: 650 },
    zIndex: index + 1,
  }])) as Record<AppId, WindowState>
}

const achievements = {
  firstBoot: ['FIRST BOOT', 'Started PrathameshOS.'],
  explorer: ['CODE EXPLORER', 'Inspected three selected projects.'],
  researcher: ['RESEARCHER', 'Ran the HQDE distributed inference lab.'],
  terminal: ['TERMINAL USER', 'Executed five terminal commands.'],
  bugHunter: ['BUG HUNTER', 'Found the broken accumulator.'],
  secret: ['SECRET FOUND', 'Discovered the classified archive.'],
} as const

function BootScreen({ onDone }: { onDone: () => void }) {
  const [line, setLine] = useState(0)
  const checks = ['Checking compute nodes', 'Loading project index', 'Mounting research archive', 'Starting window manager']
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const reducedTimer = window.setTimeout(onDone, 100)
      return () => window.clearTimeout(reducedTimer)
    }
    const interval = window.setInterval(() => setLine(value => Math.min(value + 1, checks.length)), 260)
    const timer = window.setTimeout(onDone, 1550)
    return () => { window.clearInterval(interval); window.clearTimeout(timer) }
  }, [onDone])
  return <div className="boot-screen"><div className="boot-mark" aria-hidden="true"><span>PN</span><i/></div><div className="boot-copy" aria-live="polite"><span>PRATHAMESH OS</span><h1>Developer workstation</h1>{checks.map((check, index) => <div className={index < line ? 'loaded' : ''} key={check}><span>{check}</span><strong>{index < line ? 'OK' : '···'}</strong></div>)}<p>SYSTEM BUILD · PORTFOLIO</p></div><button onClick={onDone}>SKIP BOOT <ChevronRight size={14}/></button></div>
}

function DesktopIcon({ id, label, onOpen }: { id: AppId; label: string; onOpen: (id: AppId) => void }) {
  return <button className="desktop-icon" onDoubleClick={() => onOpen(id)} onClick={event => (window.matchMedia('(max-width: 760px)').matches || event.detail === 0) && onOpen(id)} aria-label={`Open ${label}. Double click with a pointer or press Enter.`}><span>{appMeta[id].icon}</span><strong>{label}</strong></button>
}

export default function App() {
  const [booted, setBooted] = useState(() => sessionStorage.getItem('prathamesh-booted') === '1')
  const [windows, setWindows] = useState(initialWindows)
  const [startOpen, setStartOpen] = useState(false)
  const [recruiterMode, setRecruiterMode] = useState(false)
  const [sound, setSound] = useState(() => localStorage.getItem('prathamesh-sound') === 'on')
  const [matrix, setMatrix] = useState(false)
  const [shutdown, setShutdown] = useState(false)
  const [time, setTime] = useState(new Date())
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 760px)').matches)
  const [earned, setEarned] = useState<string[]>(() => JSON.parse(localStorage.getItem('prathamesh-achievements') || '[]'))
  const [toast, setToast] = useState<string | null>(null)
  const [viewedProjects, setViewedProjects] = useState<string[]>([])
  const [terminalCommands, setTerminalCommands] = useState(0)
  const [bugUnlocked, setBugUnlocked] = useState(() => localStorage.getItem('prathamesh-bug') === '1')
  const [secretUnlocked, setSecretUnlocked] = useState(() => localStorage.getItem('prathamesh-secret') === '1')
  const [previewProject, setPreviewProject] = useState<Project>(projects[0])

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000)
    const media = window.matchMedia('(max-width: 760px)')
    const update = () => setMobile(media.matches)
    media.addEventListener('change', update)
    return () => { window.clearInterval(timer); media.removeEventListener('change', update) }
  }, [])

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (recruiterMode) setRecruiterMode(false)
      else if (startOpen) setStartOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [recruiterMode, startOpen])

  const earn = (id: keyof typeof achievements) => {
    if (earned.includes(id)) return
    const next = [...earned, id]
    setEarned(next); localStorage.setItem('prathamesh-achievements', JSON.stringify(next)); setToast(id)
    window.setTimeout(() => setToast(null), 3300)
  }

  const finishBoot = () => {
    sessionStorage.setItem('prathamesh-booted', '1'); setBooted(true); earn('firstBoot')
  }

  const focusWindow = (id: AppId) => setWindows(current => {
    const top = Math.max(...Object.values(current).map(item => item.zIndex)) + 1
    return { ...current, [id]: { ...current[id], zIndex: top, minimized: false } }
  })
  const openApp = (id: AppId) => {
    setWindows(current => {
      const top = Math.max(...Object.values(current).map(item => item.zIndex)) + 1
      return { ...current, [id]: { ...current[id], isOpen: true, minimized: false, zIndex: top } }
    })
    setStartOpen(false)
    const path = appMeta[id].path
    if (window.location.pathname !== `/${path}`) window.history.replaceState({}, '', `/${path}`)
  }
  const closeApp = (id: AppId) => setWindows(current => ({ ...current, [id]: { ...current[id], isOpen: false, minimized: false } }))
  const minimizeApp = (id: AppId) => setWindows(current => ({ ...current, [id]: { ...current[id], minimized: true } }))
  const maximizeApp = (id: AppId) => setWindows(current => ({ ...current, [id]: { ...current[id], maximized: !current[id].maximized } }))
  const moveApp = (id: AppId, x: number, y: number) => setWindows(current => ({ ...current, [id]: { ...current[id], position: { x, y } } }))
  const openPreview = (project: Project) => { setPreviewProject(project); openApp('preview') }

  useEffect(() => {
    const path = window.location.pathname.replace(/^\//, '')
    const match = (Object.keys(appMeta) as AppId[]).find(id => appMeta[id].path === path)
    if (match) openApp(match)
    // Deliberately resolve the deep link only on initial mount.
  }, [])

  useEffect(() => { if (viewedProjects.length >= 3) earn('explorer') }, [viewedProjects])
  useEffect(() => { if (terminalCommands >= 5) earn('terminal') }, [terminalCommands])

  const content = (id: AppId) => {
    switch (id) {
      case 'welcome': return <WelcomeApp openApp={openApp} recruiterMode={recruiterMode} setRecruiterMode={setRecruiterMode}/>
      case 'projects': return <ProjectsApp openApp={openApp} onPreview={openPreview} onViewed={project => setViewedProjects(items => [...new Set([...items, project])])}/>
      case 'research': return <ResearchApp openApp={openApp}/>
      case 'skills': return <SkillsApp/>
      case 'about': return <AboutApp/>
      case 'education': return <EducationApp/>
      case 'resume': return <ResumeApp/>
      case 'contact': return <ContactApp/>
      case 'games': return <GamesApp bugUnlocked={bugUnlocked} secretUnlocked={secretUnlocked} unlockBug={() => { setBugUnlocked(true); localStorage.setItem('prathamesh-bug', '1'); earn('bugHunter') }}/>
      case 'monitor': return <MonitorApp/>
      case 'hqde': return <HQDEDemo onAchievement={() => earn('researcher')}/>
      case 'vsfeed': return <VSFeedDemo/>
      case 'caniplay': return <CanIPlayDemo/>
      case 'preview': return <ProjectPreview project={previewProject}/>
      case 'terminal': return <Terminal openApp={openApp} onCommand={() => setTerminalCommands(value => value + 1)} onMatrix={() => setMatrix(value => !value)} secretUnlocked={secretUnlocked} unlockSecret={() => { setSecretUnlocked(true); localStorage.setItem('prathamesh-secret', '1'); earn('secret') }}/>
    }
  }

  const openWindows = useMemo(() => Object.values(windows).filter(item => item.isOpen), [windows])
  const desktopIcons: [AppId, string][] = [['projects', 'Projects'], ['research', 'Research Lab'], ['terminal', 'Terminal'], ['skills', 'Packages'], ['education', 'Education'], ['resume', 'Resume'], ['games', 'Challenges'], ['monitor', 'Monitor'], ['contact', 'Contact']]

  if (!booted) return <BootScreen onDone={finishBoot}/>
  if (shutdown) return <div className="shutdown-screen"><Power/><h1>Thanks for visiting.</h1><p>PrathameshOS is safely shut down.</p><button onClick={() => setShutdown(false)}><RotateCcw size={16}/> REBOOT</button></div>

  return <main className={`desktop ${matrix ? 'matrix-mode' : ''}`} id="main-content">
    <h1 className="sr-only">Prathamesh Nikam — AI/ML engineer and software developer portfolio</h1>
    <div className="wallpaper" aria-hidden="true"><div className="terrain t1"/><div className="terrain t2"/><div className="terrain t3"/><div className="network-grid"/><span className="wallpaper-label">PRATHAMESH<br/>NIKAM</span></div>
    <header className="desktop-topbar"><div className="brand"><i>PN</i><span>PRATHAMESH OS</span><strong>WORKSTATION</strong></div><button className="recruiter-toggle" onClick={() => setRecruiterMode(true)}><BriefcaseBusiness size={14}/> RECRUITER MODE</button><div className="top-status"><span><Wifi size={13}/> ONLINE</span><span>WORKSPACE · PUBLIC</span></div></header>
    <nav className="desktop-icons" aria-label="Desktop applications">{desktopIcons.map(([id, label]) => <DesktopIcon key={id} id={id} label={label} onOpen={openApp}/>)}</nav>

    <section className="window-layer" aria-label="Open applications">
      {Object.values(windows).map(win => <Window key={win.id} window={win} mobile={mobile} onFocus={focusWindow} onMove={moveApp} onMinimize={minimizeApp} onMaximize={maximizeApp} onClose={closeApp}>{content(win.id)}</Window>)}
    </section>

    {startOpen && <div className="start-menu" role="dialog" aria-label="Start menu"><header><div className="start-avatar">PN</div><div><strong>Prathamesh Nikam</strong><span>AI / ML · SOFTWARE</span></div></header><div className="start-search"><Search size={14}/> Choose an application</div><div className="start-apps">{(['about', 'projects', 'research', 'skills', 'education', 'terminal', 'resume', 'games', 'contact'] as AppId[]).map(id => <button onClick={() => openApp(id)} key={id}><span>{appMeta[id].icon}</span><div><strong>{appMeta[id].title}</strong><small>Open application</small></div><ChevronRight size={13}/></button>)}</div><footer><button onClick={() => { const next = !sound; setSound(next); localStorage.setItem('prathamesh-sound', next ? 'on' : 'off') }}>{sound ? <Volume2/> : <VolumeX/>} SOUND {sound ? 'ON' : 'OFF'}</button><button onClick={() => setShutdown(true)}><Power/> SHUT DOWN</button></footer></div>}

    <footer className="taskbar"><button className={`start-button ${startOpen ? 'active' : ''}`} onClick={() => setStartOpen(!startOpen)} aria-label="Open start menu" aria-expanded={startOpen}><Menu size={17}/><span>START</span></button><div className="task-apps">{openWindows.map(win => <button key={win.id} className={!win.minimized ? 'active' : ''} onClick={() => win.minimized ? focusWindow(win.id) : minimizeApp(win.id)} aria-label={`${win.minimized ? 'Restore' : 'Minimize'} ${win.title}`}>{appMeta[win.id].icon}<span>{win.title}</span></button>)}</div><div className="task-status"><span className="task-metric"><Cpu/>24%</span><span className="task-metric"><HardDrive/>6.3</span><span className="task-metric"><BatteryCharging/>AC</span><button onClick={() => { const next = !sound; setSound(next); localStorage.setItem('prathamesh-sound', next ? 'on' : 'off') }} aria-label={`Turn sound ${sound ? 'off' : 'on'}`}>{sound ? <Volume2/> : <VolumeX/>}</button><time dateTime={time.toISOString()}><strong>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong><span>{time.toLocaleDateString([], { month: 'short', day: '2-digit' })}</span></time></div></footer>

    {recruiterMode && <RecruiterPanel openApp={openApp} close={() => setRecruiterMode(false)}/>} 
    {toast && <div className="achievement-toast" role="status"><Trophy/><div><span>ACHIEVEMENT UNLOCKED</span><strong>{achievements[toast as keyof typeof achievements][0]}</strong><p>{achievements[toast as keyof typeof achievements][1]}</p></div></div>}
  </main>
}
