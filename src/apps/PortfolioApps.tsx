import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, BookOpen, Box, Check, CheckCircle2, ChevronRight, Clipboard, Download, FileCode2, FileText, FlaskConical, Folder, Github, GraduationCap, HardDrive, Layers3, Linkedin, Mail, Network, PackageCheck, Play, Search, ShieldCheck, Sparkles, Trophy, UserRound } from 'lucide-react'
import { projectCategories, projects, type Project } from '../data/projects'
import { profile, skills } from '../data/profile'
import type { AppId } from '../types'

export function WelcomeApp({ openApp, recruiterMode, setRecruiterMode }: { openApp: (id: AppId) => void; recruiterMode: boolean; setRecruiterMode: (value: boolean) => void }) {
  return <div className="welcome-app">
    <div className="welcome-copy"><span className="path">/home/prathamesh/profile</span><h2>I build systems that make intelligence <em>usable.</em></h2><p>AI/ML engineer and software developer working across distributed learning, evidence-grounded models, and tools for people who build.</p><div className="welcome-actions"><button className="primary-action" onClick={() => openApp('projects')}>EXPLORE SYSTEMS <ArrowRight size={16}/></button><button className="secondary-action" onClick={() => setRecruiterMode(!recruiterMode)}>{recruiterMode ? 'EXIT RECRUITER MODE' : '30-SECOND RECRUITER MODE'}</button></div></div>
    <div className="system-card"><div className="system-card-top"><span>LIVE WORKSPACE</span><i /></div><div className="system-map"><div className="map-core">PN</div>{['ML', 'RAY', 'DEV', 'AI'].map((item, index) => <span className={`orbit-item o${index + 1}`} key={item}>{item}</span>)}</div><div className="system-card-bottom"><span><strong>34</strong> public repositories</span><span><strong>03</strong> interactive labs</span></div></div>
  </div>
}

function projectIcon(project: Project) {
  if (project.category === 'AI Research') return <Network />
  if (project.category === 'AI Products') return <Sparkles />
  if (project.category === 'Developer Tools') return <FileCode2 />
  if (project.category === 'Learning & Knowledge') return <BookOpen />
  if (project.category === 'Mobile & Immersive') return <Layers3 />
  return <Box />
}

export function ProjectsApp({ openApp, onViewed, onPreview }: { openApp: (id: AppId) => void; onViewed: (project: string) => void; onPreview: (project: Project) => void }) {
  const [selected, setSelected] = useState<Project>(projects[0])
  const [filter, setFilter] = useState('Featured')
  const categories = ['Featured', 'All repositories', ...projectCategories]
  const visible = filter === 'All repositories' ? projects : filter === 'Featured' ? projects.filter(item => item.featured) : projects.filter(item => item.category === filter)
  const select = (project: Project) => { setSelected(project); onViewed(project.name) }
  return <div className="explorer">
    <aside className="explorer-sidebar"><div className="location"><HardDrive size={15}/> GITHUB CATALOG</div>{categories.map(item => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}><Folder size={15}/><span>{item}</span><small>{item === 'All repositories' ? projects.length : item === 'Featured' ? projects.filter(p => p.featured).length : projects.filter(p => p.category === item).length}</small></button>)}<div className="storage"><span>PUBLIC REPOSITORIES</span><strong>{projects.length} / {projects.length}</strong><i /></div></aside>
    <section className="explorer-main" aria-label="Project files"><div className="explorer-bar"><span>GitHub / Prathmesh333 / {filter}</span><div><Search size={14}/>{visible.length} repositories</div></div><div className="file-grid">{visible.map(project => <button key={project.name} className={`${selected.name === project.name ? 'selected' : ''} category-${project.category.toLowerCase().replaceAll(/[^a-z]+/g,'-')}`} onClick={() => select(project)}>{projectIcon(project)}<span>{project.executable}</span><small>{project.stage} · {project.updated}</small>{project.featured && <i>Featured</i>}</button>)}</div></section>
    <aside className="inspector"><div className="inspector-kicker"><span className="path">PROJECT INSPECTOR</span><span className={`stage stage-${selected.stage.toLowerCase()}`}>{selected.stage}</span></div><h2>{selected.name}</h2><p>{selected.description}</p><div className="tech-list">{selected.technologies.map(tech => <span key={tech}>{tech}</span>)}</div><dl><div><dt>Category</dt><dd>{selected.category}</dd></div><div><dt>Updated</dt><dd>{selected.updated}</dd></div><div><dt>Evidence</dt><dd>{selected.evidence}</dd></div></dl>{selected.demo && <button className="primary-action" onClick={() => openApp(selected.demo as AppId)}><Play size={15}/> FLAGSHIP DEMO</button>}<button className="secondary-action preview-action" onClick={() => onPreview(selected)}><Layers3 size={15}/> OPEN UI PREVIEW</button><div className="source-links"><a className="text-action" href={selected.github} target="_blank" rel="noreferrer">SOURCE <ArrowUpRight size={14}/></a>{selected.live && <a className="text-action" href={selected.live} target="_blank" rel="noreferrer">LIVE <ArrowUpRight size={14}/></a>}</div></aside>
  </div>
}

export function ResearchApp({ openApp }: { openApp: (id: AppId) => void }) {
  const experiments = projects.filter(project => project.category === 'AI Research')
  return <div className="research-app"><div className="app-heading"><div><span className="path">research://programs/classified</span><h2>Research programs</h2></div><span className="status"><i/> {experiments.length} PUBLIC STUDIES</span></div><div className="research-groups"><article><span>01 · DISTRIBUTED & ENSEMBLE</span><h3>Learning across specialized workers</h3><p>HQDE, TreeStack-CNN, and the thesis archive explore worker diversity, fusion, synchronization, and efficient aggregation.</p><div>{experiments.filter(p => p.name.includes('HQDE') || p.name.includes('TreeStack')).map(p=><a href={p.github} target="_blank" rel="noreferrer" key={p.name}>{p.name}<ArrowUpRight/></a>)}</div><button onClick={() => openApp('hqde')}>Run HQDE lab <ChevronRight/></button></article><article><span>02 · EVIDENCE & MEMORY</span><h3>Models that can show their work</h3><p>EvidenceMem replaces opaque classifier confidence with retrievable prototypes, continual class insertion, and OOD-aware signals.</p><div>{experiments.filter(p => p.name === 'EvidenceMem').map(p=><a href={p.github} target="_blank" rel="noreferrer" key={p.name}>{p.name}<ArrowUpRight/></a>)}</div></article><article><span>03 · LANGUAGE & BEHAVIOR</span><h3>Structured reasoning over dialogue</h3><p>PsychoTA treats conversations as hierarchical sequences and jointly predicts complementary Transactional Analysis labels.</p><div>{experiments.filter(p => p.name === 'PsychoTA').map(p=><a href={p.github} target="_blank" rel="noreferrer" key={p.name}>{p.name}<ArrowUpRight/></a>)}</div></article></div><aside className="research-principle"><BookOpen/><div><span>RESEARCH STANDARD</span><strong>Public evidence before portfolio claims.</strong><p>Research entries distinguish executed evidence, README documentation, and repositories with limited public context.</p></div></aside></div>
}

export function SkillsApp() {
  return <div className="packages-app"><div className="app-heading"><div><span className="path">system://packages/installed</span><h2>Capability registry</h2></div><span className="status"><i/> ENVIRONMENT HEALTHY</span></div><p className="lede">Technologies used across public projects. No fictional proficiency percentages.</p><div className="package-list"><div className="package-head"><span>PACKAGE</span><span>TYPE</span><span>STATE</span></div>{skills.map(([name, type]) => <div className="package-row" key={name}><strong><PackageCheck size={16}/>{name}</strong><span>{type}</span><span className="installed"><Check size={13}/> installed</span></div>)}</div></div>
}

export function AboutApp() {
  return <div className="studio-profile"><header><div className="profile-monogram">pn<span>✳</span></div><div><span className="path">A LITTLE ABOUT ME</span><h2>{profile.name}</h2><p>{profile.role}</p></div></header><div className="profile-story"><h3>Interested in the why.<br/><em>Driven by the what if.</em></h3><p>I build distributed learning systems, evidence-grounded AI, and developer tools. I’m interested in the point where a research idea becomes something people can actually use.</p><div className="profile-actions"><a className="primary-action" href={profile.github} target="_blank" rel="noreferrer"><Github size={15}/> GitHub <ArrowUpRight size={14}/></a><a className="secondary-action" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={15}/> LinkedIn</a></div></div><section className="profile-experience"><span className="path">EXPERIENCE</span>{profile.experience.map(item => <article key={item.organization}><time>{item.period}</time><div><h3>{item.role}</h3><strong>{item.organization}</strong><p>{item.detail}</p></div></article>)}</section><section className="profile-recognition"><span className="path">A FEW MILESTONES</span>{profile.achievements.map(item => <div key={item}><Trophy size={16}/><span>{item}</span></div>)}</section></div>
}

export function EducationApp() {
  return <div className="education-app"><div className="app-heading"><div><span className="path">system://profile/education</span><h2>Academic timeline</h2></div><span className="status"><i/> VERIFIED ON GITHUB</span></div><div className="education-timeline">{profile.education.map((item, index) => <article key={item.title}><div className="timeline-marker"><GraduationCap/><span>{String(index + 1).padStart(2, '0')}</span></div><div><time>{item.period}</time><h3>{item.title}</h3><p>{item.detail}</p></div></article>)}</div></div>
}

export function ResumeApp() {
  const resumeUrl = `${import.meta.env.BASE_URL}resume/resume.pdf?v=20260910`
  return <div className="resume-app"><div className="resume-document"><iframe src={`${resumeUrl}#view=FitH&toolbar=0`} title="Prathamesh Nikam latest resume preview"/><div className="resume-fallback"><FileText/><strong>Latest resume</strong><span>One-page software and machine-learning resume</span></div></div><aside className="resume-actions"><div className="resume-verified"><ShieldCheck/><span>Latest verified copy</span></div><h3>Software + machine learning</h3><p>This is the same resume supplied for applications. It includes current skills, five flagship projects, two internships, education, and hackathon achievements.</p><div className="resume-facts"><div><span>Experience</span><strong>2 internships</strong></div><div><span>Projects</span><strong>5 flagship</strong></div><div><span>Education</span><strong>M.Tech + B.E.</strong></div></div><a className="primary-action" href={resumeUrl} target="_blank" rel="noreferrer"><FileText size={15}/> VIEW RESUME</a><a className="secondary-action" href={resumeUrl} download="Prathamesh_Nikam_Resume.pdf"><Download size={15}/> DOWNLOAD PDF</a><small>Portfolio copy updated {profile.resumeUpdated}</small></aside></div>
}

export function ContactApp() {
  const [copied, setCopied] = useState(false)
  const copyHandle = async () => { try { await navigator.clipboard.writeText(profile.email); setCopied(true) } catch { setCopied(false); window.prompt('Copy this email address:', profile.email) } }
  return <div className="contact-app"><div className="contact-signal"><div className="signal-rings"><Mail/><i/><i/></div><span>COMMUNICATION CENTER</span><h2>Let’s build something technically interesting.</h2><p>For software engineering, AI/ML, research engineering, distributed systems, and developer-tooling opportunities.</p><a className="primary-action" href={`mailto:${profile.email}`}>SEND AN EMAIL <ArrowRight/></a></div><div className="contact-channels"><a href={`mailto:${profile.email}`}><Mail/><div><strong>Email</strong><span>{profile.email}</span></div><ArrowUpRight/></a><a href={profile.github} target="_blank" rel="noreferrer"><Github/><div><strong>GitHub</strong><span>@{profile.handle}</span></div><ArrowUpRight/></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin/><div><strong>LinkedIn</strong><span>Prathamesh Nikam</span></div><ArrowUpRight/></a><button onClick={copyHandle}><Clipboard/><div><strong>Copy email address</strong><span>{copied ? 'Copied to clipboard' : profile.email}</span></div>{copied ? <CheckCircle2/> : <ChevronRight/>}</button></div></div>
}

export function GamesApp({ unlockBug, bugUnlocked, secretUnlocked }: { unlockBug: () => void; bugUnlocked: boolean; secretUnlocked: boolean }) {
  const [choice, setChoice] = useState<number | null>(null)
  const code = ['def calculate_total(items):', '    total = 0', '', '    for item in items:', '        total = item', '', '    return total']
  return <div className="games-app"><div className="game-header"><Trophy/><div><span>CHALLENGE 01</span><h2>Bug hunter</h2></div><strong>{bugUnlocked ? 'COMPLETE' : '100 XP'}</strong></div><p>Find the line that prevents this function from summing every item.</p><div className="bug-code">{code.map((line, index) => <button key={`${line}-${index}`} className={`${choice === index ? 'chosen' : ''} ${bugUnlocked && index === 4 ? 'correct' : ''}`} onClick={() => { setChoice(index); if (index === 4) unlockBug() }}><span>{String(index + 1).padStart(2, '0')}</span>{line || ' '}{bugUnlocked && index === 4 && <Check/>}</button>)}</div>{choice !== null && !bugUnlocked && <p className="game-feedback">That line is fine. Trace how <code>total</code> changes inside the loop.</p>}{bugUnlocked && <div className="achievement-card"><Trophy/><div><span>ACHIEVEMENT UNLOCKED</span><strong>BUG HUNTER</strong><p><code>total += item</code> preserves the running sum.</p></div></div>}<div className={`secret-status ${secretUnlocked ? 'unlocked' : ''}`}><ShieldCheck/><div><strong>Secret archive</strong><span>{secretUnlocked ? 'Unlocked through terminal challenge.' : 'Hint: terminal → cd secret → cat classified.txt'}</span></div></div></div>
}

export function MonitorApp() {
  const processes = useMemo(() => ['python.exe', 'ray-worker-01', 'ray-worker-02', 'vscode.exe', 'research.exe', 'coffee.service'], [])
  return <div className="monitor-app"><div className="monitor-metrics"><div><small>SIMULATED CPU</small><strong>24%</strong><i style={{ width: '24%' }}/></div><div><small>MEMORY</small><strong>6.3 GB</strong><i style={{ width: '63%' }}/></div><div><small>CURIOSITY</small><strong>HIGH</strong><i style={{ width: '92%' }}/></div></div><div className="process-table"><div><span>PROCESS</span><span>STATE</span><span>CPU</span></div>{processes.map((process, index) => <div key={process}><strong>{process}</strong><span>running</span><span>{[4.2, 8.1, 7.8, 1.9, 2.1, 0.1][index]}%</span></div>)}</div></div>
}

export function RecruiterPanel({ openApp, close }: { openApp: (id: AppId) => void; close: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    return () => previous?.focus()
  }, [])
  const trapFocus = (event: React.KeyboardEvent) => {
    if (event.key !== 'Tab') return
    const controls = Array.from(panelRef.current?.querySelectorAll<HTMLElement>('button, a[href]') ?? [])
    if (!controls.length) return
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
  }
  const links: { id: AppId; label: string; detail: string; icon: React.ReactNode }[] = [
    { id: 'about', label: 'Profile', detail: 'AI/ML engineer + software developer', icon: <UserRound/> },
    { id: 'education', label: 'Education', detail: 'M.Tech IT · B.E. Computer Engineering', icon: <GraduationCap/> },
    { id: 'projects', label: 'GitHub catalog', detail: `${projects.length} classified repositories`, icon: <Folder/> },
    { id: 'research', label: 'Research', detail: 'HQDE, EvidenceMem, forecasting', icon: <FlaskConical/> },
    { id: 'skills', label: 'Capabilities', detail: 'Python, PyTorch, Ray, TypeScript', icon: <PackageCheck/> },
    { id: 'resume', label: 'Résumé', detail: 'Latest PDF · experience and achievements', icon: <FileText/> },
    { id: 'contact', label: 'Contact', detail: 'Email + GitHub + LinkedIn', icon: <Mail/> },
  ]
  return <div className="recruiter-overlay" role="dialog" aria-modal="true" aria-labelledby="recruiter-title" onKeyDown={trapFocus}><div className="recruiter-panel" ref={panelRef}><header><div><span>RECRUITER MODE</span><h2 id="recruiter-title">The 30-second version.</h2><p>Everything important, zero game mechanics required.</p></div><button onClick={close} autoFocus>RETURN TO DESKTOP</button></header><div className="recruiter-summary"><div><strong>PRATHAMESH NIKAM</strong><span>AI / ML Engineer · Software Developer</span></div><p>Builds distributed learning systems, evidence-grounded AI, and tools for developers. Public work spans Python, PyTorch, Ray, and TypeScript.</p><a href={profile.github} target="_blank" rel="noreferrer">github.com/Prathmesh333 <ArrowUpRight size={13}/></a></div><div className="recruiter-links">{links.map(link => <button key={link.id} onClick={() => { openApp(link.id); close() }}>{link.icon}<div><strong>{link.label}</strong><span>{link.detail}</span></div><ChevronRight/></button>)}</div></div></div>
}
