import { ArrowDown, ArrowRight, ArrowUpRight, Asterisk, Code2, FlaskConical } from 'lucide-react'
import type { AppId } from '../types'
import { projects } from '../data/projects'

export function StudioWelcome({ openApp }: { openApp: (id: AppId) => void }) {
  return <div className="studio-welcome">
    <div className="studio-intro">
      <div className="intro-eyebrow"><span className="hello-dot"/> The personal workspace of</div>
      <p className="intro-name">Prathamesh Nikam <span>↗</span></p>
      <h2>A curious mind.<br/>A builder’s <em>instinct.</em></h2>
      <p className="intro-description">I turn complex ideas into things you can use.<br className="intro-break"/> AI, distributed systems, and tools for the people building what’s next.</p>
      <div className="intro-actions"><button onClick={() => openApp('projects')} className="studio-primary">Explore my work <ArrowUpRight size={18}/></button><button className="studio-text-link" onClick={() => openApp('about')}>A little about me <ArrowRight size={15}/></button></div>
      <div className="intro-footnote"><span>ENGINEER BY TRAINING.</span><span>BUILDER BY DEFAULT.</span></div>
    </div>
    <div className="studio-art">
      <div className="art-corner-label"><Asterisk size={15}/> Curiosity, in a constant loop.</div>
      <img className="loop-sculpture" src={`${import.meta.env.BASE_URL}assets/curiosity-loop.webp`} alt="A polished silver loop intertwined around an orange glass sphere" width="800" height="800" fetchPriority="high"/>
      <div className="art-orbit-label"><span>01 /</span> CONNECT THE UNEXPECTED</div>
      <button className="art-research-link" onClick={() => openApp('research')}><FlaskConical size={17}/><span>From experiments<br/><strong>to useful systems</strong></span><ArrowUpRight size={19}/></button>
    </div>
    <div className="welcome-work-strip"><div><Code2 size={17}/><span>{projects.length} public repositories<span className="strip-detail"> · one very curious developer</span></span></div><button onClick={() => openApp('vsfeed')}>Try VSFeed <ArrowUpRight size={14}/></button><button onClick={() => openApp('resume')}>Read my résumé <ArrowDown size={14}/></button></div>
  </div>
}
