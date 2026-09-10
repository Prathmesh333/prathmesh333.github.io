import { useCallback, useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, Asterisk, Atom, BriefcaseBusiness, CircleUserRound, Code2, Command, FileCode2, FileText, FlaskConical, FolderOpen, Gamepad2, GraduationCap, Grid2X2, Mail, Monitor, MonitorCog, PackageCheck, Palette, Pause, Play, Search, TerminalSquare, Trophy, Wifi, X } from 'lucide-react'
import { Window } from './components/Window'
import { StudioWelcome } from './components/StudioWelcome'
import { CommandPalette, type AppEntry } from './components/CommandPalette'
import { AboutApp, ContactApp, EducationApp, GamesApp, MonitorApp, RecruiterPanel, ResearchApp, ResumeApp, SkillsApp } from './apps/PortfolioApps'
import { ProjectsApp } from './apps/ProjectExplorer'
import { CanIPlayDemo, HQDEDemo, ProjectPreview, VSFeedDemo } from './apps/Demos'
import { SourceDemo, sourceDemos } from './apps/SourceDemo'
import { Terminal } from './apps/Terminal'
import { projects, type Project } from './data/projects'
import type { AppId, WindowState } from './types'

const appMeta: Record<AppId, { title: string; icon: React.ReactNode; path: string; detail: string }> = {
  welcome: { title: 'Welcome', icon: <Asterisk/>, path: '', detail: 'A curious mind. A builder’s instinct.' },
  projects: { title: 'Selected work & archive', icon: <FolderOpen/>, path: 'projects', detail: 'Projects, products, and experiments' },
  research: { title: 'Research lab', icon: <FlaskConical/>, path: 'research', detail: 'Distributed learning and evidence-grounded AI' },
  terminal: { title: 'Terminal', icon: <TerminalSquare/>, path: 'terminal', detail: 'Explore the command line and hidden corners' },
  skills: { title: 'Toolkit', icon: <PackageCheck/>, path: 'skills', detail: 'Languages, frameworks, and systems' },
  about: { title: 'About Prathamesh', icon: <CircleUserRound/>, path: 'about', detail: 'Background, experience, and achievements' },
  education: { title: 'Education', icon: <GraduationCap/>, path: 'education', detail: 'University of Hyderabad · M.Tech IT' },
  resume: { title: 'Résumé.pdf', icon: <FileText/>, path: 'resume', detail: 'Read or download the latest résumé' },
  contact: { title: 'Let’s talk', icon: <Mail/>, path: 'contact', detail: 'Email, GitHub, and LinkedIn' },
  games: { title: 'Playground', icon: <Gamepad2/>, path: 'games', detail: 'Find the bug. Discover a secret.' },
  monitor: { title: 'Activity monitor', icon: <MonitorCog/>, path: 'monitor', detail: 'A playful simulated system monitor' },
  hqde: { title: 'HQDE · Inference lab', icon: <Atom/>, path: 'research/hqde', detail: 'Run a distributed-inference simulation' },
  vsfeed: { title: 'VSFeed · Interactive demo', icon: <FileCode2/>, path: 'projects/vsfeed', detail: 'A little inspiration, inside your editor' },
  caniplay: { title: 'CanIPlay · Network demo', icon: <Wifi/>, path: 'projects/caniplay', detail: 'Try the network-check simulation' },
  preview: { title: 'Project preview', icon: <Code2/>, path: 'projects/preview', detail: 'A lightweight interactive concept preview' },
}
const base = import.meta.env.BASE_URL.replace(/\/$/, '')
const slug = (project: Project) => project.github.split('/').pop()!.toLowerCase()
const routePath = (id: AppId, project?: Project) => `${base}/${appMeta[id].path}${id === 'preview' && project ? `/${slug(project)}` : ''}`
const route = () => {
  const path = decodeURIComponent(window.location.pathname.slice(base.length)).replace(/^\/|\/$/g, '')
  if (path.startsWith('projects/preview/')) return { id: 'preview' as AppId, project: projects.find(p => slug(p) === path.slice(17)) ?? projects[0] }
  return { id: (Object.keys(appMeta) as AppId[]).find(id => appMeta[id].path === path) ?? (path === 'desktop' ? null : 'welcome'), project: projects[0] }
}
function read<T>(key: string, fallback: T): T { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback } catch { return fallback } }
function save(key: string, value: unknown) { try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* The workspace remains usable without storage. */ } }
const initialWindows = (): Record<AppId, WindowState> => {
  const initial = route().id
  return Object.fromEntries((Object.keys(appMeta) as AppId[]).map((id, index) => [id, { id, title: appMeta[id].title, isOpen: id === initial, minimized: false, maximized: false, position: { x: Math.max(24, (window.innerWidth - 1200) / 2) + (index % 3) * 18, y: 36 + (index % 3) * 18 }, size: { width: id === 'welcome' ? 1000 : 1100, height: id === 'welcome' ? 620 : 700 }, zIndex: index + 1 }])) as Record<AppId, WindowState>
}

export default function StudioOS() {
  const [windows, setWindows] = useState(initialWindows)
  const [searchOpen, setSearchOpen] = useState(false)
  const [recruiterMode, setRecruiterMode] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [wallpaper, setWallpaper] = useState(() => read('pn-wallpaper', 'paper'))
  const [motion, setMotion] = useState(() => read('pn-motion', true))
  const [time, setTime] = useState(new Date())
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 760px)').matches)
  const [matrix, setMatrix] = useState(false)
  const [earned, setEarned] = useState<string[]>(() => { const value = read<unknown>('pn-achievements', []); return Array.isArray(value) ? value.filter(v => typeof v === 'string') : [] })
  const [toast, setToast] = useState<string | null>(null)
  const [viewedProjects, setViewedProjects] = useState<string[]>([])
  const [terminalCommands, setTerminalCommands] = useState(0)
  const [bugUnlocked, setBugUnlocked] = useState(() => read('pn-bug', false))
  const [secretUnlocked, setSecretUnlocked] = useState(() => read('pn-secret', false))
  const [previewProject, setPreviewProject] = useState(route().project)

  const openWindows = useMemo(() => Object.values(windows).filter(win => win.isOpen), [windows])
  const active = openWindows.filter(win => !win.minimized).sort((a, b) => b.zIndex - a.zIndex)[0]?.id
  const navigate = useCallback((url: string) => { if (window.location.pathname !== url) window.history.pushState({}, '', url) }, [])
  const raiseWindow = useCallback((id: AppId) => setWindows(current => ({ ...current, [id]: { ...current[id], isOpen: true, minimized: false, zIndex: Math.max(...Object.values(current).map(win => win.zIndex)) + 1 } })), [])
  const openApp = useCallback((id: AppId) => { raiseWindow(id); setSearchOpen(false); setSettingsOpen(false); navigate(routePath(id)) }, [raiseWindow, navigate])
  const openPreview = useCallback((project: Project) => { setPreviewProject(project); raiseWindow('preview'); setSearchOpen(false); navigate(routePath('preview', project)) }, [raiseWindow, navigate])
  const focusWindow = useCallback((id: AppId) => { raiseWindow(id); navigate(routePath(id, previewProject)) }, [raiseWindow, navigate, previewProject])
  const closeApp = (id: AppId) => {
    setWindows(current => ({ ...current, [id]: { ...current[id], isOpen: false, minimized: false } }))
    const next = openWindows.filter(win => win.id !== id && !win.minimized).sort((a, b) => b.zIndex - a.zIndex)[0]
    navigate(next ? routePath(next.id, previewProject) : `${base}/desktop`)
  }
  const minimizeApp = (id: AppId) => {
    setWindows(current => ({ ...current, [id]: { ...current[id], minimized: true } }))
    const next = openWindows.filter(win => win.id !== id && !win.minimized).sort((a, b) => b.zIndex - a.zIndex)[0]
    navigate(next ? routePath(next.id, previewProject) : `${base}/desktop`)
  }
  const maximizeApp = (id: AppId) => setWindows(current => ({ ...current, [id]: { ...current[id], maximized: !current[id].maximized } }))
  const moveApp = (id: AppId, x: number, y: number) => setWindows(current => ({ ...current, [id]: { ...current[id], position: { x, y } } }))
  const showDesktop = () => { setWindows(current => Object.fromEntries(Object.entries(current).map(([id, win]) => [id, { ...win, minimized: win.isOpen }])) as Record<AppId, WindowState>); navigate(`${base}/desktop`) }
  const earn = useCallback((id: string, message: string) => { setEarned(current => { if (current.includes(id)) return current; const next = [...current, id]; save('pn-achievements', next); return next }); setToast(message) }, [])

  useEffect(() => {
    const interval = window.setInterval(() => setTime(new Date()), 30000)
    const media = window.matchMedia('(max-width: 760px)')
    const resize = () => setMobile(media.matches)
    media.addEventListener('change', resize)
    const onPopState = () => { const next = route(); if (next.id) { setPreviewProject(next.project); raiseWindow(next.id) } else setWindows(current => Object.fromEntries(Object.entries(current).map(([id, win]) => [id, { ...win, minimized: true }])) as Record<AppId, WindowState>) }
    window.addEventListener('popstate', onPopState)
    return () => { window.clearInterval(interval); media.removeEventListener('change', resize); window.removeEventListener('popstate', onPopState) }
  }, [raiseWindow])
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setSearchOpen(value => !value) }
      if (event.key === 'Escape') { setSettingsOpen(false); setRecruiterMode(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => { document.title = `${active && active !== 'welcome' ? `${appMeta[active].title} — ` : ''}Prathamesh Nikam · Engineer & builder` }, [active])
  useEffect(() => { if (!toast) return; const timer = window.setTimeout(() => setToast(null), 3300); return () => window.clearTimeout(timer) }, [toast])
  useEffect(() => { if (viewedProjects.length >= 3 && !earned.includes('explorer')) earn('explorer', 'Curiosity looks good on you. Three projects explored.') }, [viewedProjects, earned, earn])
  useEffect(() => { if (terminalCommands >= 5 && !earned.includes('terminal')) earn('terminal', 'At home in the terminal. Five commands explored.') }, [terminalCommands, earned, earn])

  const content = (id: AppId) => {
    switch (id) {
      case 'welcome': return <StudioWelcome openApp={openApp}/>
      case 'projects': return <ProjectsApp openApp={openApp} onPreview={openPreview} onViewed={project => setViewedProjects(items => [...new Set([...items, project])])}/>
      case 'research': return <ResearchApp openApp={openApp}/>
      case 'skills': return <SkillsApp/>
      case 'about': return <AboutApp/>
      case 'education': return <EducationApp/>
      case 'resume': return <ResumeApp/>
      case 'contact': return <ContactApp/>
      case 'games': return <GamesApp bugUnlocked={bugUnlocked} secretUnlocked={secretUnlocked} unlockBug={() => { setBugUnlocked(true); save('pn-bug', true); earn('bug', 'Bug hunter. You found the broken accumulator.') }}/>
      case 'monitor': return <MonitorApp/>
      case 'hqde': return <HQDEDemo onAchievement={() => earn('researcher', 'Researcher. You ran your first distributed inference.')}/>
      case 'vsfeed': return <VSFeedDemo/>
      case 'caniplay': return <CanIPlayDemo/>
      case 'preview': return sourceDemos[previewProject.name] ? <SourceDemo key={previewProject.github} project={previewProject}/> : <ProjectPreview key={previewProject.github} project={previewProject}/>
      case 'terminal': return <Terminal openApp={openApp} onCommand={() => setTerminalCommands(value => value + 1)} onMatrix={() => setMatrix(value => !value)} secretUnlocked={secretUnlocked} unlockSecret={() => { setSecretUnlocked(true); save('pn-secret', true); earn('secret', 'You found the hidden archive. Nicely done.') }}/>
    }
  }
  const dockIds: AppId[] = ['welcome', 'projects', 'research', 'terminal', 'skills', 'games', 'resume', 'contact']
  const appEntries: AppEntry[] = (Object.keys(appMeta) as AppId[]).filter(id => id !== 'preview').map(id => ({ id, ...appMeta[id] }))
  const dockClick = (id: AppId) => { if (id === active) minimizeApp(id); else { if (id === 'preview') openPreview(previewProject); else openApp(id) } }

  return <main className={`desktop studio-os wallpaper-${wallpaper} ${matrix ? 'matrix-mode' : ''}`} data-has-windows={Boolean(active)} data-motion={motion ? 'on' : 'off'} id="main-content">
    <h1 className="sr-only">Prathamesh Nikam — AI/ML engineer, researcher, and software developer</h1>
    <a className="os-skip-link" href="#os-dock">Skip to applications</a>
    <div className="studio-wallpaper" aria-hidden="true"><div className="wallpaper-orbit orbit-one"/><div className="wallpaper-orbit orbit-two"/><div className="wallpaper-orbit orbit-three"/><div className="wallpaper-wordmark">Make room<br/>for <em>curiosity.</em></div><span className="wallpaper-edition">PERSONAL WORKSPACE / 2026</span></div>
    <header className="studio-menubar"><button className="os-brand" onClick={() => openApp('welcome')} aria-label="Open welcome"><Asterisk size={25}/><strong>prathamesh<span>os</span></strong><small>Curiosity edition</small></button><nav aria-label="Quick navigation"><button onClick={() => openApp('projects')}>Work</button><button onClick={() => openApp('about')}>About</button><button onClick={() => setRecruiterMode(true)}>Quick look <ArrowUpRight size={12}/></button></nav><div className="menubar-right"><button className="menubar-search" aria-label="Search apps and projects" onClick={() => setSearchOpen(true)}><Search size={16}/><kbd>Ctrl K</kbd></button><button className="appearance-toggle" onClick={() => setSettingsOpen(value => !value)} aria-label="Desktop appearance" aria-expanded={settingsOpen}><Palette size={17}/></button><time dateTime={time.toISOString()}>{time.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}<span>{time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span></time></div></header>
    <nav className="pinned-files" aria-label="Pinned desktop files">{([['projects', 'My projects', `${projects.length} repositories`], ['research', 'Research lab', 'Ideas in progress'], ['resume', 'Résumé.pdf', 'The latest edition']] as [AppId, string, string][]).map(([id, title, detail]) => <button key={id} onClick={() => openApp(id)} className={`pinned-file pin-${id}`}><span className="file-object">{appMeta[id].icon}{id === 'resume' && <i>PDF</i>}</span><strong>{title}</strong><small>{detail}</small></button>)}</nav>
    <aside className="desktop-note"><span><Asterisk size={14}/> A note to you</span><p>Good things start<br/>with a little<br/><em>“what if?”</em></p><button onClick={() => openApp('contact')}>Let’s find out <ArrowUpRight size={16}/></button></aside>
    <div className="desktop-bottomline"><span><i/> Built with curiosity. Based in India.</span><button onClick={() => setSearchOpen(true)}>Find your way around <Command size={13}/> K</button></div>
    <section className="window-layer" aria-label="Open applications">{openWindows.map(win => <Window key={win.id} window={win} mobile={mobile} active={win.id === active} onFocus={focusWindow} onMove={moveApp} onMinimize={minimizeApp} onMaximize={maximizeApp} onClose={closeApp}>{content(win.id)}</Window>)}</section>
    <nav className="os-dock" id="os-dock" aria-label="Application dock"><button className="dock-launcher" onClick={() => setSearchOpen(true)} aria-label="All apps and search"><span className="dock-icon"><Grid2X2/></span><span className="dock-tooltip">All apps</span></button><span className="dock-divider"/>{[...dockIds, ...openWindows.filter(win => !dockIds.includes(win.id)).map(win => win.id)].map(id => <button key={id} className={`dock-app dock-${id} ${id === active ? 'dock-active' : ''}`} aria-label={`${id === active ? 'Minimize' : 'Open'} ${appMeta[id].title}`} aria-pressed={id === active} onClick={() => dockClick(id)}><span className="dock-icon">{appMeta[id].icon}</span><span className="dock-tooltip">{appMeta[id].title}</span>{windows[id].isOpen && <i/>}</button>)}<span className="dock-divider"/><button className="dock-desktop" onClick={showDesktop} aria-label="Show desktop"><span className="dock-icon"><Monitor/></span><span className="dock-tooltip">Show desktop</span></button></nav>
    {settingsOpen && <section className="appearance-panel" aria-label="Desktop appearance"><header><strong>Make yourself at home</strong><button onClick={() => setSettingsOpen(false)} aria-label="Close appearance"><X size={16}/></button></header><p>A little change of scenery.</p><div className="wallpaper-swatches">{['paper', 'apricot', 'blue'].map(value => <button key={value} className={`swatch-${value} ${wallpaper === value ? 'selected' : ''}`} aria-label={`${value} wallpaper`} aria-pressed={wallpaper === value} onClick={() => { setWallpaper(value); save('pn-wallpaper', value) }}><span/>{value}</button>)}</div><button className="motion-toggle" aria-pressed={motion} onClick={() => { setMotion(!motion); save('pn-motion', !motion) }}>{motion ? <Pause size={16}/> : <Play size={16}/>} Ambient motion <span>{motion ? 'On' : 'Off'}</span></button></section>}
    {searchOpen && <CommandPalette apps={appEntries} openApp={openApp} openPreview={openPreview} onClose={() => setSearchOpen(false)}/>}
    {recruiterMode && <RecruiterPanel openApp={openApp} close={() => setRecruiterMode(false)}/>}
    {toast && <div className="studio-toast" role="status"><Trophy size={18}/><span>{toast}</span><button aria-label="Dismiss achievement" onClick={() => setToast(null)}><X size={14}/></button></div>}
    <button className="mobile-quick-look" onClick={() => setRecruiterMode(true)}><BriefcaseBusiness size={14}/> Quick look</button>
  </main>
}
