import { useId, useRef, useState } from 'react'
import { ArrowDownLeft, ArrowUpRight, Check, ChevronRight, FolderOpen, Github, LayoutGrid, List, Play, Search, SlidersHorizontal, Star, X } from 'lucide-react'
import { projectCategories, projects, type Project, type ProjectCategory } from '../data/projects'
import type { AppId } from '../types'
import '../project-explorer.css'
import { sourceDemos } from './SourceDemo'

type ProjectsProps = {
  openApp: (id: AppId) => void
  onViewed: (project: string) => void
  onPreview: (project: Project) => void
}

type Filter = 'All projects' | 'Selected work' | ProjectCategory
const openingOrder = ['HQDE', 'VSFeed', 'CanIPlay', 'EvidenceMem', 'Neural Consensus Engine', 'TRACE', 'ResearchHub', 'Python Clearly']

const categoryNames: Record<ProjectCategory, string> = {
  'AI Research': 'Research',
  'AI Products': 'AI products',
  'Developer Tools': 'Developer tools',
  'Learning & Knowledge': 'Learning',
  'Web & Platforms': 'Web platforms',
  'Mobile & Immersive': 'Mobile & AR',
  'Experiments & Foundations': 'Experiments',
  'Open Source & Meta': 'Open source',
}

function categoryIndex(category: ProjectCategory) {
  return projectCategories.indexOf(category)
}

/** Decorative cover illustrations, not screenshots or claims about project results. */
function ProjectCover({ project, compact = false }: { project: Project; compact?: boolean }) {
  const category = categoryIndex(project.category)
  const variation = projects.indexOf(project) % 3
  return <div className={`catalog-cover catalog-cover-${category} catalog-cover-v${variation}${compact ? ' catalog-cover-compact' : ''}`} aria-hidden="true">
    <div className="catalog-cover-caption"><span>{String(category + 1).padStart(2, '0')} / {categoryNames[project.category]}</span><span>PN /</span></div>
    <svg viewBox="0 0 360 190" fill="none" className="catalog-cover-art">
      {category === 0 && <>
        <ellipse cx="180" cy="100" rx="111" ry="39" stroke="currentColor" strokeWidth="1" transform="rotate(-32 180 100)"/>
        <ellipse cx="180" cy="100" rx="111" ry="39" stroke="currentColor" strokeWidth="1" transform="rotate(32 180 100)"/>
        <ellipse cx="180" cy="100" rx="111" ry="39" stroke="currentColor" strokeWidth="1" transform="rotate(90 180 100)"/>
        <circle cx="180" cy="100" r="24" fill="currentColor"/>
        <circle cx="98" cy="49" r="8" fill="var(--catalog-cover-highlight)"/>
        <circle cx="263" cy="151" r="8" fill="var(--catalog-cover-highlight)"/>
        <circle cx="180" cy="23" r="5" fill="currentColor"/>
        <circle cx="180" cy="100" r="7" fill="var(--catalog-cover-bg)"/>
      </>}
      {category === 1 && <>
        <rect x="78" y="45" width="142" height="87" rx="12" fill="var(--catalog-cover-paper)" stroke="currentColor" strokeWidth="1.5" transform="rotate(-8 78 45)"/>
        <rect x="135" y="68" width="145" height="88" rx="12" fill="var(--catalog-cover-bg)" stroke="currentColor" strokeWidth="1.5" transform="rotate(6 135 68)"/>
        <path d="M163 95H224M162 108H249M161 121H214" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="111" cy="74" r="7" fill="var(--catalog-cover-highlight)"/>
        <circle cx="264" cy="52" r="24" fill="currentColor"/>
        <path d="M264 37V67M249 52H279M253 41L275 63M275 41L253 63" stroke="var(--catalog-cover-bg)" strokeWidth="2"/>
      </>}
      {category === 2 && <>
        <rect x="64" y="34" width="232" height="137" rx="9" fill="var(--catalog-cover-paper)" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M64 61H296M100 61V171" stroke="currentColor" strokeOpacity=".3"/>
        <circle cx="78" cy="47" r="3" fill="var(--catalog-cover-highlight)"/><circle cx="89" cy="47" r="3" fill="currentColor" fillOpacity=".25"/><circle cx="100" cy="47" r="3" fill="currentColor" fillOpacity=".25"/>
        <path d="M118 85H153M128 100H184M128 115H166M118 130H152M118 145H194" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeOpacity=".5"/>
        <rect x="215" y="79" width="62" height="68" rx="8" fill="currentColor"/>
        <path d="M237 101L227 112L237 123M255 101L265 112L255 123" stroke="var(--catalog-cover-bg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </>}
      {category === 3 && <>
        <path d="M81 45L170 57V162L81 150V45Z" fill="var(--catalog-cover-paper)" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M170 57L266 43V147L170 162V57Z" fill="var(--catalog-cover-paper)" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M90 156L170 168L277 151V47M99 73L151 81M99 88L151 96M99 103L141 109M189 82L247 73M189 96L247 87M189 110L227 104" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M232 48V104L244 94L255 100V45" fill="var(--catalog-cover-highlight)"/>
        <circle cx="78" cy="152" r="14" fill="currentColor"/>
      </>}
      {category === 4 && <>
        <rect x="56" y="30" width="248" height="146" rx="10" fill="var(--catalog-cover-paper)" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M56 57H304" stroke="currentColor" strokeOpacity=".3"/>
        <circle cx="71" cy="43" r="3" fill="var(--catalog-cover-highlight)"/><circle cx="82" cy="43" r="3" fill="currentColor" fillOpacity=".25"/><circle cx="93" cy="43" r="3" fill="currentColor" fillOpacity=".25"/>
        <rect x="73" y="74" width="58" height="85" rx="4" fill="currentColor" fillOpacity=".09"/>
        <path d="M146 79H207M146 91H190" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <path d="M148 147L173 124L202 132L230 108L275 94" stroke="var(--catalog-cover-highlight)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M148 157H281" stroke="currentColor" strokeOpacity=".3"/>
      </>}
      {category === 5 && <>
        <circle cx="181" cy="100" r="72" stroke="currentColor" strokeWidth="1" strokeDasharray="3 6"/>
        <rect x="142" y="22" width="80" height="154" rx="18" fill="var(--catalog-cover-paper)" stroke="currentColor" strokeWidth="2" transform="rotate(9 182 99)"/>
        <path d="M172 34H197" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <rect x="152" y="59" width="55" height="55" rx="15" fill="var(--catalog-cover-highlight)" transform="rotate(9 182 99)"/>
        <path d="M176 74V104M165 81V97M187 78V100" stroke="var(--catalog-cover-paper)" strokeWidth="3" strokeLinecap="round"/>
        <path d="M160 135L194 140M168 151L182 153" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="262" cy="63" r="13" fill="currentColor"/><circle cx="104" cy="128" r="8" fill="var(--catalog-cover-highlight)"/>
      </>}
      {category === 6 && <>
        <rect x="84" y="23" width="186" height="149" rx="6" fill="var(--catalog-cover-paper)" stroke="currentColor" strokeWidth="1.5" transform="rotate(-5 180 100)"/>
        <path d="M111 51H160M111 62H194" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <path d="M111 87H244M111 107H244M111 127H244M131 80V151M158 80V151M185 80V151M212 80V151M239 80V151" stroke="currentColor" strokeOpacity=".13"/>
        <path d="M113 141C130 140 129 115 145 121C161 127 159 100 176 103C193 106 199 75 218 86C231 94 231 71 246 73" stroke="var(--catalog-cover-highlight)" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="255" cy="147" r="17" fill="currentColor"/><path d="M248 147H262M255 140V154" stroke="var(--catalog-cover-bg)" strokeWidth="2"/>
      </>}
      {category === 7 && <>
        <path d="M84 66V49C84 43 89 38 95 38H151L169 58H263C270 58 275 63 275 70V151C275 158 270 163 263 163H95C88 163 84 158 84 151V66Z" fill="var(--catalog-cover-paper)" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M84 77H275" stroke="currentColor" strokeOpacity=".25"/>
        <path d="M164 96V140M164 121C193 121 207 124 207 100" stroke="currentColor" strokeWidth="3"/>
        <circle cx="164" cy="96" r="6" fill="var(--catalog-cover-highlight)"/><circle cx="164" cy="143" r="6" fill="currentColor"/><circle cx="207" cy="96" r="6" fill="currentColor"/>
      </>}
    </svg>
    <span className="catalog-cover-index">{String(projects.indexOf(project) + 1).padStart(2, '0')}</span>
  </div>
}

export function ProjectsApp({ openApp, onViewed, onPreview }: ProjectsProps) {
  const [filter, setFilter] = useState<Filter>('All projects')
  const [query, setQuery] = useState('')
  const [view, setView] = useState<'gallery' | 'list'>('gallery')
  const [selectedName, setSelectedName] = useState<string | null>(null)
  const appRef = useRef<HTMLDivElement>(null)
  const inspectorRef = useRef<HTMLElement>(null)
  const detailTitleRef = useRef<HTMLHeadingElement>(null)
  const searchId = useId()
  const detailId = useId()
  const normalizedQuery = query.trim().toLocaleLowerCase()
  const visible = projects.filter(project => {
    const inCategory = filter === 'All projects' || (filter === 'Selected work' ? project.featured : project.category === filter)
    const inSearch = [project.name, project.description, project.category, project.stage, ...project.technologies].join(' ').toLocaleLowerCase().includes(normalizedQuery)
    return inCategory && inSearch
  }).sort((a, b) => {
    const aRank = openingOrder.indexOf(a.name)
    const bRank = openingOrder.indexOf(b.name)
    return (aRank < 0 ? 99 : aRank) - (bRank < 0 ? 99 : bRank)
  })
  const selected = visible.find(project => project.name === selectedName)
  const countFor = (category: Filter) => category === 'All projects' ? projects.length : projects.filter(project => category === 'Selected work' ? project.featured : project.category === category).length

  function selectProject(project: Project) {
    setSelectedName(project.name)
    onViewed(project.name)
    window.requestAnimationFrame(() => {
      inspectorRef.current?.scrollTo({ top: 0, behavior: 'instant' })
      if ((appRef.current?.clientWidth ?? 0) < 780) {
        detailTitleRef.current?.focus({ preventScroll: true })
        inspectorRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' })
      }
    })
  }

  function closeInspector() {
    const selectedButton = appRef.current?.querySelector<HTMLButtonElement>('[data-catalog-selected="true"]')
    setSelectedName(null)
    window.requestAnimationFrame(() => selectedButton?.focus())
  }

  return <div className="catalog-app" ref={appRef}>
    <header className="catalog-heading">
      <div><span className="catalog-eyebrow"><FolderOpen size={13}/> The project archive</span><h2>Ideas, made <em>real.</em></h2><p>Research, useful tools, and a few curious experiments.</p></div>
      <a href="https://github.com/Prathmesh333" target="_blank" rel="noreferrer" className="catalog-github" aria-label="View Prathamesh's GitHub profile (opens in a new tab)"><Github size={16}/><span>View GitHub</span><ArrowUpRight size={14}/></a>
    </header>

    <div className="catalog-toolbar">
      <div className="catalog-search"><Search size={17}/><label className="catalog-sr-only" htmlFor={searchId}>Search projects by name, technology, or topic</label><input id={searchId} value={query} onChange={event => setQuery(event.target.value)} placeholder="Find a project, technology, or idea…" type="search"/>{query && <button onClick={() => setQuery('')} aria-label="Clear project search"><X size={15}/></button>}</div>
      <div className="catalog-view-toggle" role="group" aria-label="Project display"><button onClick={() => setView('gallery')} aria-pressed={view === 'gallery'} aria-label="Gallery view" title="Gallery view"><LayoutGrid size={17}/></button><button onClick={() => setView('list')} aria-pressed={view === 'list'} aria-label="List view" title="List view"><List size={18}/></button></div>
    </div>

    <nav className="catalog-filters" aria-label="Project categories">
      {(['All projects', 'Selected work', ...projectCategories] as Filter[]).map(category => <button key={category} aria-pressed={filter === category} onClick={() => setFilter(category)} title={category}>
        {category === 'Selected work' && <Star size={12}/>}<span>{category === 'All projects' || category === 'Selected work' ? category : categoryNames[category]}</span><small>{countFor(category)}</small>
      </button>)}
    </nav>

    <div className={`catalog-body${selected ? ' catalog-has-selection' : ''}`}>
      <section className="catalog-results" aria-label="Project collection">
        <div className="catalog-collection-heading"><span>{filter === 'All projects' ? 'The complete collection' : filter}</span><span role="status">{visible.length} {visible.length === 1 ? 'project' : 'projects'}{normalizedQuery ? ' found' : ''}</span></div>
        {visible.length ? <div className={`catalog-projects catalog-projects-${view}`}>
          {visible.map(project => <button className={`catalog-project${selected?.name === project.name ? ' catalog-project-selected' : ''}`} key={project.name} onClick={() => selectProject(project)} data-catalog-selected={selected?.name === project.name || undefined} aria-label={`View ${project.name}, ${project.category}, ${project.stage}`} aria-expanded={selected?.name === project.name} aria-controls={selected?.name === project.name ? detailId : undefined}>
            <ProjectCover project={project} compact={view === 'list'}/>
            <div className="catalog-project-info"><div className="catalog-project-meta"><span>{categoryNames[project.category]}</span>{project.demo ? <span className="catalog-demo-mark"><Play size={9} fill="currentColor"/> Interactive</span> : <span>{project.stage}</span>}</div><h3>{project.name}<ArrowUpRight size={17}/></h3><p>{project.technologies.slice(0, 3).join(' / ')}</p></div>
            {selected?.name === project.name && <span className="catalog-selected-check"><Check size={12}/></span>}
          </button>)}
        </div> : <div className="catalog-empty"><SlidersHorizontal size={28}/><h3>No projects found.</h3><p>Try a different term or browse the complete archive.</p><button onClick={() => { setQuery(''); setFilter('All projects') }}>Reset filters <ChevronRight size={16}/></button></div>}
        <footer className="catalog-footer"><span><span className="catalog-archive-dot"/> {projects.length} public repositories in the archive</span><span>Built with curiosity.</span></footer>
      </section>

      {selected && <aside className="catalog-inspector" aria-labelledby={`${detailId}-title`} id={detailId} ref={inspectorRef}>
        <div className="catalog-inspector-top"><span>Inside the project</span><button onClick={closeInspector} aria-label="Close project details"><X size={16}/></button></div>
        <ProjectCover project={selected}/>
        <div className="catalog-inspector-copy">
          <div className="catalog-detail-category"><span>{selected.category}</span><span>{selected.stage}</span></div>
          <h2 id={`${detailId}-title`} tabIndex={-1} ref={detailTitleRef}>{selected.name}</h2>
          <p className="catalog-description">{selected.description}</p>
          <ul className="catalog-technologies" aria-label="Technologies">{selected.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
          <div className="catalog-project-actions">
            {selected.live ? <a className="catalog-primary" href={selected.live} target="_blank" rel="noreferrer"><ArrowUpRight size={15}/>{selected.name === 'HQDE' ? 'View published package' : selected.name === 'VSFeed' ? 'View extension' : 'Open live website'}</a> : sourceDemos[selected.name] ? <button className="catalog-primary" onClick={() => onPreview(selected)}><Play size={15}/> Open frontend demo <ArrowUpRight size={15}/></button> : selected.demo ? <button className="catalog-primary" onClick={() => openApp(selected.demo as AppId)}><Play size={15}/> Open concept demo</button> : <button className="catalog-secondary" onClick={() => onPreview(selected)}>Explore concept preview <ChevronRight size={15}/></button>}
            <span className="catalog-demo-note">{selected.live ? 'Opens the existing project outside this portfolio.' : sourceDemos[selected.name] ? 'Extracted frontend only. Local sample data, no backend.' : 'Portfolio concept illustration, not the original frontend or a working model.'}</span>
          </div>
          <div className="catalog-source-links"><a href={selected.github} target="_blank" rel="noreferrer"><Github size={15}/> Source code <ArrowUpRight size={13}/></a>{selected.live && <a href={selected.live} target="_blank" rel="noreferrer">{selected.name === 'HQDE' ? 'PyPI package' : selected.name === 'VSFeed' ? 'Marketplace' : 'Live website'}<ArrowUpRight size={13}/></a>}</div>
          <details className="catalog-evidence"><summary>Repository notes <ChevronRight size={13}/></summary><dl><div><dt>Evidence</dt><dd>{selected.evidence}</dd></div><div><dt>Repository updated</dt><dd>{selected.updated}</dd></div></dl></details>
          <button className="catalog-back" onClick={closeInspector}><ArrowDownLeft size={14}/> Back to the collection</button>
        </div>
      </aside>}
    </div>
  </div>
}
