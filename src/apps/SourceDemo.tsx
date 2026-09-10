import { useState } from 'react'
import { ExternalLink, RotateCcw } from 'lucide-react'
import type { Project } from '../data/projects'
import '../source-demo.css'

export const sourceDemos: Record<string, { path: string; limitation: string }> = {
  TRACE: { path: 'trace', limitation: 'Original dashboard, school, and resource components with local sample data. No authentication, camera, uploads, AI grading, or student database.' },
  'Neural Consensus Engine': { path: 'neural-consensus', limitation: 'Original React frontend with an offline response adapter. Graph controls, settings, query entry, and session history work. No Gemini inference; all responses and metrics are examples.' },
}

export function SourceDemo({ project }: { project: Project }) {
  const [revision, setRevision] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const demo = sourceDemos[project.name]
  const url = `${import.meta.env.BASE_URL}demos/${demo.path}/index.html`
  return <section className="source-demo" aria-label={`${project.name} source frontend demo`}>
    <header><div><h2>{project.name}</h2><p>{demo.limitation}</p></div><nav aria-label="Demo controls"><a href={url} target="_blank" rel="noreferrer">Full screen <ExternalLink size={14}/></a><button onClick={() => { setLoaded(false); setRevision(v => v + 1) }}><RotateCcw size={14}/> Restart</button><a href={project.github} target="_blank" rel="noreferrer">Original source</a></nav></header>
    {!loaded && <p role="status">Loading original frontend. If it does not appear, use Full screen.</p>}
    <iframe key={revision} src={url} title={`${project.name} original frontend, offline demo`} onLoad={() => setLoaded(true)} referrerPolicy="no-referrer"/>
  </section>
}
