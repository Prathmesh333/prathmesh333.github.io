import { useEffect, useRef, useState } from 'react'
import { ArrowRight, BarChart3, BookOpen, Bot, Check, ChevronDown, CirclePause, FileCode2, Gauge, Mic, Play, RefreshCw, Search, ShieldCheck, Sparkles, TimerReset, Wifi } from 'lucide-react'
import type { Project } from '../data/projects'
import '../demo-refinements.css'

function useSimulation(delay = 700) {
  const [running, setRunning] = useState(false)
  const [complete, setComplete] = useState(false)
  const timeout = useRef<number | null>(null)

  useEffect(() => () => {
    if (timeout.current !== null) window.clearTimeout(timeout.current)
  }, [])

  const simulate = (onComplete?: () => void) => {
    if (timeout.current !== null) return
    setRunning(true)
    setComplete(false)
    timeout.current = window.setTimeout(() => {
      timeout.current = null
      setRunning(false)
      setComplete(true)
      onComplete?.()
    }, delay)
  }

  return { running, complete, simulate }
}

export function HQDEDemo({ onAchievement }: { onAchievement: (id: string) => void }) {
  const [phase, setPhase] = useState<'idle' | 'workers' | 'fusion' | 'done'>('idle')
  const timers = useRef<number[]>([])
  const workers = [87, 91, 54, 89]
  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])
  const run = () => {
    if (phase === 'workers' || phase === 'fusion') return
    timers.current.forEach(window.clearTimeout)
    setPhase('workers')
    timers.current = [
      window.setTimeout(() => setPhase('fusion'), 900),
      window.setTimeout(() => { setPhase('done'); onAchievement('researcher') }, 1700),
    ]
  }
  return (
    <div className="demo-shell hqde-demo">
      <div className="app-heading"><div><span className="path">research://hqde/inference</span><h2>Distributed inference lab</h2></div><span className="status"><i /> LOCAL SIMULATION</span></div>
      <p className="lede">Follow a sample through four model replicas and prediction fusion. This educational simulation uses illustrative confidence values.</p>
      <div className="pipeline">
        <div className={`pipeline-node coordinator ${phase !== 'idle' ? 'active' : ''}`}><small>COORDINATOR</small><strong>sample_042.jpg</strong></div>
        <div className="connection-lines" aria-hidden="true" />
        <div className="worker-grid">
          {workers.map((confidence, index) => <div className={`pipeline-node worker ${phase === 'workers' || phase === 'fusion' || phase === 'done' ? 'active' : ''}`} key={confidence} style={{ '--delay': `${index * 120}ms` } as React.CSSProperties}><small>RAY ACTOR 0{index + 1}</small><strong>{phase === 'idle' ? 'READY' : index === 2 ? `DOG ${confidence}%` : `CAT ${confidence}%`}</strong><span>{index === 0 ? 'ResNet' : index === 1 ? 'DenseNet' : index === 2 ? 'MobileNet' : 'EfficientNet'}</span></div>)}
        </div>
        <div className={`fusion ${phase === 'fusion' ? 'processing' : ''} ${phase === 'done' ? 'complete' : ''}`}><div role="status"><small>PREDICTION FUSION</small><strong>{phase === 'fusion' ? 'WEIGHTING LOGITS…' : phase === 'done' ? 'CAT · 89.0% (SAMPLE)' : 'AWAITING SIGNAL'}</strong></div><div className="fusion-meter" aria-hidden="true"><i /></div></div>
      </div>
      <div className="concept-strip"><span>Independent workers</span><span>Mean / weighted fusion</span><span>Adaptive quantization</span><span>FedAvg mode</span></div>
      <button className="primary-action" onClick={run} disabled={phase === 'workers' || phase === 'fusion'}>{phase === 'idle' ? <Play size={16} /> : <RefreshCw size={16} />} {phase === 'workers' ? 'WORKERS RUNNING' : phase === 'fusion' ? 'FUSING PREDICTIONS' : 'RUN DISTRIBUTED INFERENCE'}</button>
    </div>
  )
}

const feedPosts = [
  { source: 'RETRIEVAL', time: '2 min read', title: 'Give a prediction something you can inspect.', body: 'A confidence score compresses a decision into one number. Retrieved examples add context: which observations resemble the input, and where do they differ? A useful interface presents both the prediction and its supporting evidence, then makes disagreement easy to spot.' },
  { source: 'SYSTEM DESIGN', time: '1 min read', title: 'One slow worker. Four possible responses.', body: 'Imagine four workers producing a prediction, but one misses its deadline. You could wait, retry, use the three available responses, or return a cached result. The right choice depends on the cost of delay, the cost of error, and whether partial results are acceptable.' },
  { source: 'DISTRIBUTED ML', time: '2 min read', title: 'Fewer bytes can change how a system coordinates.', body: 'Quantization represents values with fewer bits. In a distributed system, that can reduce the amount of data exchanged between workers. The tradeoff is approximation error, so communication savings need to be evaluated alongside model quality and convergence.' },
]

export function VSFeedDemo() {
  const [focusEndsAt, setFocusEndsAt] = useState<number | null>(null)
  const [remaining, setRemaining] = useState(0)
  const [openPost, setOpenPost] = useState<number | null>(null)
  const [tab, setTab] = useState<'feed' | 'code'>('feed')
  const focus = focusEndsAt !== null
  const clock = `${Math.floor(remaining / 60).toString().padStart(2, '0')}:${(remaining % 60).toString().padStart(2, '0')}`

  useEffect(() => {
    if (focusEndsAt === null) return
    const interval = window.setInterval(() => {
      const seconds = Math.max(0, Math.ceil((focusEndsAt - Date.now()) / 1000))
      setRemaining(seconds)
      if (seconds === 0) setFocusEndsAt(null)
    }, 250)
    return () => window.clearInterval(interval)
  }, [focusEndsAt])

  const toggleFocus = () => {
    setRemaining(focus ? 0 : 300)
    setFocusEndsAt(focus ? null : Date.now() + 300_000)
  }

  return (
    <div className="ide-demo">
      <aside className="ide-rail" aria-hidden="true"><span>F</span><span>⌕</span><span>⑂</span></aside>
      <div className="ide-main">
        <div className="ide-tabs"><button aria-pressed={tab === 'code'} className={tab === 'code' ? 'active' : ''} onClick={() => setTab('code')}>worker.py</button><button aria-pressed={tab === 'feed'} className={tab === 'feed' ? 'active' : ''} onClick={() => setTab('feed')}>VSFeed</button><span className="focus-timer" aria-label={focus ? `${remaining} seconds remaining` : 'Reading timer off'}><TimerReset size={13} /> {focus ? clock : 'TIMER OFF'}</span></div>
        {tab === 'code' ? <pre className="fake-code"><span>01</span> from hqde import create_hqde_system{`\n`}<span>02</span>{`\n`}<span>03</span> system = create_hqde_system({`\n`}<span>04</span>     num_workers=4,{`\n`}<span>05</span>     prediction_aggregation="mean"{`\n`}<span>06</span> ){`\n`}<span>07</span>{`\n`}<span>08</span> result = system.predict(batch)</pre> : <div className={`feed-panel ${focus ? 'focus-on' : ''}`}><div className="feed-toolbar"><div><strong>A small break. A useful thought.</strong><span>Sample reading inside your editor.</span></div><button onClick={toggleFocus}>{focus ? <CirclePause size={14} /> : <Play size={14} />}{focus ? ' End timer' : ' Start 5 min'}</button></div>{focus && <p className="feed-focus-note">Your reading timer is running. It keeps counting when you switch to the code tab.</p>}<div className="feed-list">{feedPosts.map((post, index) => <article key={post.title}><small>{post.source} · {post.time}</small><p>{post.title}</p><button aria-expanded={openPost === index} aria-controls={`feed-post-${index}`} onClick={() => setOpenPost(openPost === index ? null : index)}>{openPost === index ? 'Close reading' : 'Read note'} <ChevronDown size={14} /></button>{openPost === index && <div id={`feed-post-${index}`} className="feed-reader">{post.body}<small>Original sample note for this portfolio demo.</small></div>}</article>)}</div></div>}
        <div className="ide-status">main <span>Python</span><span>VSFeed · UI simulation</span></div>
      </div>
    </div>
  )
}

const gameProfiles: Record<string, { ping: number; jitter: number; loss: string; verdict: string }> = {
  Valorant: { ping: 38, jitter: 4, loss: '0.3%', verdict: 'PLAYABLE' },
  CS2: { ping: 52, jitter: 7, loss: '0.8%', verdict: 'PLAYABLE' },
  Fortnite: { ping: 79, jitter: 12, loss: '1.7%', verdict: 'MARGINAL' },
  'Apex Legends': { ping: 94, jitter: 18, loss: '2.4%', verdict: 'UNSTABLE' },
  'Rocket League': { ping: 44, jitter: 5, loss: '0.2%', verdict: 'PLAYABLE' },
}

export function CanIPlayDemo() {
  const [game, setGame] = useState('Valorant')
  const [result, setResult] = useState<typeof gameProfiles[string] | null>(null)
  const { running: testing, simulate } = useSimulation(1100)
  const test = () => {
    setResult(null)
    simulate(() => setResult(gameProfiles[game]))
  }
  return (
    <div className="network-demo">
      <div className="network-title"><Wifi size={22} /><div><span>NETWORK FEASIBILITY CONSOLE</span><h2>Can I play?</h2></div></div>
      <p className="demo-note">Portfolio simulation. The original project uses browser-compatible HTTP requests; results here are predefined examples.</p>
      <label className="game-select">TARGET GAME<select value={game} disabled={testing} onChange={e => { setGame(e.target.value); setResult(null) }}>{Object.keys(gameProfiles).map(name => <option key={name}>{name}</option>)}</select></label>
      <div className={`radar ${testing ? 'testing' : ''}`}><div className="radar-ring r1"/><div className="radar-ring r2"/><div className="radar-sweep"/><i className="server-point one"/><i className="server-point two"/><span>{testing ? 'SIMULATING REGIONAL CHECKS…' : result ? `${game.toUpperCase()} · SAMPLE AP SOUTH` : 'READY TO TRY'}</span></div>
      {result && <div className="network-result" role="status"><div><small>SAMPLE LATENCY</small><strong>{result.ping}<em>ms</em></strong></div><div><small>SAMPLE JITTER</small><strong>{result.jitter}<em>ms</em></strong></div><div><small>SAMPLE PACKET LOSS</small><strong>{result.loss}</strong></div><div className={`verdict ${result.verdict.toLowerCase()}`}><small>SIMULATED RESULT</small><strong>{result.verdict === 'PLAYABLE' && <Check size={18} />}{result.verdict}</strong></div></div>}
      <button className="primary-action" onClick={test} disabled={testing}><RefreshCw className={testing ? 'spin' : ''} size={16} />{testing ? ' TESTING SAMPLE CONNECTION' : ' RUN SAMPLE NETWORK TEST'}</button>
    </div>
  )
}

export function ProjectPreview({ project }: { project: Project }) {
  return <ProjectPreviewContent key={project.github} project={project} />
}

function ProjectPreviewContent({ project }: { project: Project }) {
  const [active, setActive] = useState(0)
  const [request, setRequest] = useState('Compare the available evidence and return one clear, accountable recommendation.')
  const [completedModules, setCompletedModules] = useState<number[]>([])
  const [markers, setMarkers] = useState(0)
  const [query, setQuery] = useState('')
  const [selectedFile, setSelectedFile] = useState('README.md')
  const [includeContext, setIncludeContext] = useState(true)
  const [runCount, setRunCount] = useState(0)
  const { running, complete, simulate } = useSimulation()
  const run = () => simulate(() => setRunCount(count => count + 1))

  const header = <div className="preview-header"><div><span>{project.category} · {project.stage}</span><h2>{project.name}</h2></div><div className="preview-badge">UI simulation</div></div>
  const tabs = (labels: string[]) => labels.map((label, index) => <button className={active === index ? 'active' : ''} aria-pressed={active === index} onClick={() => setActive(index)} key={label}>{label}</button>)
  const sampleNote = <p className="preview-sample-note">Interactive concept preview · values and outputs are illustrative.</p>

  if (project.preview === 'agent') return (
    <div className="project-preview agent-preview">{header}
      <div className="preview-body">
        <aside><Bot/><strong>Agent workspace</strong>{tabs(['Input', 'Specialists', 'Consensus'])}</aside>
        <section>
          {active === 0 && <div className="agent-question"><label htmlFor="agent-sample-request">Sample request</label><textarea id="agent-sample-request" value={request} onChange={event => setRequest(event.target.value)} maxLength={400}/><button onClick={run} disabled={running || !request.trim()}><Sparkles/>{running ? 'Playing agent flow…' : 'Run sample flow'}</button><p className="preview-sample-note">Edit the request to explore the input. This walkthrough shows a fixed example of the review process.</p></div>}
          {active === 1 && <div className="preview-detail-list"><span className="preview-eyebrow">Different perspectives, one review</span>{[
            ['Creative', 'Explore alternative approaches and surface an option the first pass may have missed.'],
            ['Logical', 'Check assumptions, compare supporting evidence, and identify gaps in the reasoning.'],
            ['Ethical', 'Consider who is affected, where information is missing, and what needs human review.'],
          ].map(([name, description]) => <article key={name}><strong>{name}</strong><p>{description}</p></article>)}</div>}
          {active === 2 && <div className="preview-detail-list"><span className="preview-eyebrow">Sample synthesis</span><h3>{complete ? 'A recommendation with its reasoning.' : 'Start with a reviewable process.'}</h3><p>{complete ? 'Begin with a small, reversible pilot. Compare its results with a baseline, record disagreements, and review the evidence before scaling.' : 'Run the sample flow to reveal an example synthesis, including the points that still need a decision.'}</p>{complete ? <><article><strong>Agreement</strong><p>Make the supporting evidence available alongside the answer.</p></article><article><strong>Open question</strong><p>What level of uncertainty is acceptable for this decision?</p></article></> : <button className="lesson-action" onClick={run} disabled={running}>{running ? 'Reviewing sample…' : 'Run sample review'}<Play size={14}/></button>}</div>}
          <div className="agent-flow" aria-hidden="true">{['Context', 'Creative', 'Logical', 'Ethical', 'Synthesis'].map((item, index) => <div className={running || complete ? 'lit' : ''} style={{ '--i': index } as React.CSSProperties} key={item}><i/><span>{item}</span></div>)}</div>
          <div role="status">{complete && <div className="preview-result"><Check/><div><strong>Sample review complete</strong><span>Open Consensus to read the example recommendation.</span></div></div>}</div>
          {sampleNote}
        </section>
      </div>
    </div>
  )

  if (project.preview === 'dashboard') return (
    <div className="project-preview dashboard-preview">{header}
      <div className="dashboard-toolbar"><div>{tabs(['Overview', 'Signals', 'Decisions'])}</div><button className="run-small" onClick={run} disabled={running}>{running ? 'Loading sample…' : 'Refresh sample'}</button></div>
      {active === 0 && <><div className="dashboard-kpis"><div><span>Sample coverage</span><strong>{complete ? '92%' : '84%'}</strong><small>Illustrative dataset</small></div><div><span>Example signal</span><strong>{project.name.includes('F1') ? 'P4' : 'REVIEW'}</strong><small>Simulated recommendation</small></div><div><span>Review status</span><strong>{complete ? 'Ready' : 'Pending'}</strong><small>{complete ? 'Sample refreshed' : 'Refresh to continue'}</small></div></div><div className="preview-chart" role="img" aria-label="Illustrative sample signal chart with eight values from 42 to 92"><div className="chart-copy"><BarChart3/><span>Sample signal values</span><strong>Observe. Compare. Decide.</strong></div><div className="bars">{[42, 67, 54, 82, 71, 92, 76, 88].map((height, index) => <i key={index} style={{ height: `${height}%` }}/>)}</div></div></>}
      {active === 1 && <div className="preview-detail-list"><span className="preview-eyebrow">Sample signal register</span>{[['Historical context', 'Available', 'A baseline for comparing the current sample.'], ['Recent observations', complete ? 'Updated' : 'Awaiting refresh', 'Changes that may affect the next decision.'], ['Missing evidence', 'Needs review', 'Assumptions to verify before acting.']].map(([name, status, detail]) => <article key={name}><div className="preview-detail-heading"><strong>{name}</strong><span>{status}</span></div><p>{detail}</p></article>)}</div>}
      {active === 2 && <div className="preview-detail-list"><span className="preview-eyebrow">Decision brief</span><h3>Make the next step inspectable.</h3><p>{complete ? 'The refreshed sample is ready for review. Check the source coverage and uncertainty before accepting its recommendation.' : 'Refresh the sample to prepare an example decision brief.'}</p><ol><li>Compare the current signal with the baseline.</li><li>Review the evidence gaps and likely impact.</li><li>Record the decision and the assumption behind it.</li></ol></div>}
      <div role="status">{complete && <p className="preview-inline-status"><Check size={14}/> Sample refresh {runCount} complete</p>}</div>{sampleNote}
    </div>
  )

  if (project.preview === 'learning') {
    const lessonDone = completedModules.includes(active)
    const examples = project.name.includes('Python')
      ? ['name = "Ada"\nprint(f"Hello, {name}")', 'def double(value):\n    return value * 2', 'values = [2, 4, 6]\nresult = [double(n) for n in values]', 'assert double(3) == 6\nassert double(0) == 0']
      : project.name.includes('TypeScript')
        ? ['const name: string = "Ada"', 'function double(value: number): number {\n  return value * 2\n}', 'type Result<T> = { data: T; ok: boolean }', 'const result: Result<number> = {\n  data: 6, ok: true\n}']
        : ['Input → transformation → output', 'Define the contract.\nSeparate policy from mechanism.', 'Request → coordinator → workers\nResponse ← aggregation ← results', 'Arrange a known input.\nRun one behavior.\nCompare the observed result.']
    return <div className="project-preview learning-preview">{header}<div className="course-layout"><aside><BookOpen/><span>Sample course index</span>{['Foundations', 'Core patterns', 'Applied systems', 'Practice lab'].map((item, index) => <button className={active === index ? 'active' : ''} aria-pressed={active === index} onClick={() => setActive(index)} key={item}><i>{completedModules.includes(index) ? '✓' : index + 1}</i>{item}</button>)}</aside><section><div className="lesson-meta"><span>Sample module {active + 1} of 4</span><strong>{completedModules.length} / 4 complete</strong></div><BookOpen/><h3>{['Build a reliable mental model', 'Recognize reusable patterns', 'Connect the moving parts', 'Practice with feedback'][active]}</h3><p>{['Start with one small example. Identify the input, the transformation, and the result before adding complexity.', 'Give a repeated operation a name and a clear contract. A small, predictable building block is easier to reuse.', 'Combine the pieces while keeping their boundaries visible. Follow one input through the system to see where it changes.', 'Try a known case, predict the result, and compare it with what happens. Use the difference to refine your understanding.'][active]}</p><pre className="lesson-code">{examples[active]}</pre><button className="lesson-action" onClick={() => setCompletedModules(current => lessonDone ? current.filter(index => index !== active) : [...current, active])}>{lessonDone ? 'Completed · undo' : 'Mark lesson complete'}{lessonDone ? <Check/> : <ArrowRight/>}</button><p className="preview-sample-note" role="status">{lessonDone ? 'This sample module is complete. ' : ''}Progress lasts while this preview is open.</p></section></div></div>
  }

  if (project.preview === 'mobile') return <div className="project-preview mobile-preview">{header}<div className="phone-stage"><div className="phone"><div className="phone-status"><span>9:41</span><i/></div><div className="voice-app"><span>Sample voice note</span><h3>A thought, captured.</h3><div className={`voice-orb ${running ? 'recording' : ''}`} aria-hidden="true"><Mic/></div><p role="status">{running ? 'Transcribing the example…' : complete ? '“Review the experiment results and write down the next three questions.”' : 'Explore a sample voice-to-text interaction.'}</p><button onClick={run} disabled={running}>{running ? 'Transcribing…' : complete ? 'Replay example' : 'Try sample transcript'}</button><small className="preview-sample-note">Simulated transcript. No microphone access.</small></div></div></div></div>

  if (project.preview === 'game') return <div className="project-preview game-preview">{header}<div className="ar-stage"><div className="camera-grid" aria-hidden="true"><span className="corner a"/><span className="corner b"/><span className="corner c"/><span className="corner d"/><div className={complete && markers > 0 ? 'marker found' : 'marker'}><span>{running ? 'SCANNING' : markers === 5 ? 'HUNT COMPLETE' : complete && markers > 0 ? 'CLUE FOUND' : '?'}</span></div></div><div><span role="status">{markers} of 5 sample markers found</span><h3>{markers === 5 ? 'Every clue connected.' : 'Find the next clue.'}</h3><p>Try the discovery loop from a marker-based AR treasure hunt. This example runs without a camera.</p><button disabled={running} onClick={() => markers === 5 ? setMarkers(0) : simulate(() => setMarkers(count => count + 1))}>{running ? 'Scanning sample…' : markers === 5 ? 'Start another hunt' : markers ? 'Scan next marker' : 'Scan sample marker'}</button></div></div></div>

  if (project.preview === 'notebook' || project.preview === 'research') return <div className="project-preview research-preview">{header}<div className="lab-tabs">{tabs(['Experiment', 'Pipeline', 'Results'])}</div><div className="lab-canvas"><div className="lab-note">
    {active === 0 && <><FileCode2/><span>research_notebook.ipynb</span><p>{project.description}</p><div className="code-cell"><i>In [{runCount || ' '}]</i><code>system.evaluate(sample_batch, report=True)</code><button onClick={run} disabled={running} aria-label={running ? 'Sample evaluation running' : 'Run sample evaluation'}><Play size={16}/></button></div><div role="status">{(running || complete) && <div className="cell-output"><span>{running ? 'Playing sample evaluation…' : 'Sample evaluation complete · illustrative values'}</span><div aria-hidden="true">{[78, 61, 89, 72].map((value, index) => <i key={index} style={{ width: `${complete ? value : 20}%` }}/>)}</div></div>}</div></>}
    {active === 1 && <div className="preview-detail-list"><span className="preview-eyebrow">Evaluation walkthrough</span>{[['01 · Prepare', 'Choose a fixed sample and keep evaluation data separate from training.'], ['02 · Evaluate', 'Apply the configured system to the same inputs as the baseline.'], ['03 · Inspect', 'Compare outcomes, disagreements, and failure cases before drawing a conclusion.']].map(([name, detail]) => <article key={name}><strong>{name}</strong><p>{detail}</p></article>)}</div>}
    {active === 2 && <div className="preview-detail-list"><span className="preview-eyebrow">Illustrative output</span><h3>{complete ? 'A result is the start of an inspection.' : 'Run an example first.'}</h3>{complete ? <><p>These four values demonstrate the report layout. They are not measured results from {project.name}.</p><div className="sample-result-grid">{[78, 61, 89, 72].map((value, index) => <div key={index}><span>Sample {index + 1}</span><strong>{value}<small>%</small></strong></div>)}</div></> : <><p>The Experiment tab runs a local animation and reveals an example results panel.</p><button className="lesson-action" onClick={run} disabled={running}>{running ? 'Evaluating sample…' : 'Run sample evaluation'}<Play size={14}/></button></>}</div>}
    {sampleNote}</div><aside><Gauge/><strong>Repository context</strong><dl><div><dt>Evidence</dt><dd>{project.evidence}</dd></div><div><dt>Stage</dt><dd>{project.stage}</dd></div><div><dt>Updated</dt><dd>{project.updated}</dd></div></dl></aside></div></div>

  if (project.preview === 'network') return <div className="project-preview network-preview">{header}<div className="mini-network"><div className={`network-map ${running ? 'active' : ''}`} aria-hidden="true"><span className="node client">YOU</span><span className="node edge">EDGE</span><span className="node server">SERVER</span><i/><i/></div><div className="network-panel"><Wifi/><h3>Know before you queue.</h3><p>Follow a sample connection from your device to a regional game server.</p><button onClick={run} disabled={running}>{running ? 'Testing sample…' : complete ? 'Run sample again' : 'Try sample connection'}</button><div role="status">{complete && <div className="network-readout"><span>42 ms · sample latency</span><span>4 ms · sample jitter</span><strong>Simulated verdict: playable</strong></div>}</div>{sampleNote}</div></div></div>

  const cards = [
    { name: 'Project overview', detail: project.description },
    { name: 'Evidence and history', detail: project.evidence },
    { name: 'Technology', detail: project.technologies.join(' · ') },
  ].filter(card => `${card.name} ${card.detail}`.toLowerCase().includes(query.toLowerCase()))
  const files: Record<string, string> = {
    'README.md': `# ${project.name}\n\n${project.description}\n\nSource: ${project.github}`,
    'sample-input.txt': includeContext ? `Sample request: review the project workflow.\nContext: ${project.technologies.join(', ')}` : 'Sample request: review the project workflow.',
    'sample-output.txt': complete ? `Sample run ${runCount} complete.\nContext ${includeContext ? 'included' : 'excluded'}.\nThis is an illustrative preview output.` : 'Run a sample from Workspace to generate an example output.',
  }
  return <div className="project-preview tool-preview">{header}<div className="tool-shell"><aside><div className="tool-logo">{project.preview === 'meta' ? <ShieldCheck/> : <FileCode2/>}</div>{tabs(['Workspace', 'Activity', 'Files', 'Settings'])}</aside><section>
    {active === 0 && <><div className="tool-search"><Search size={16}/><input aria-label={`Search ${project.name} preview`} placeholder="Filter workspace…" value={query} onChange={event => setQuery(event.target.value)}/><button onClick={run} disabled={running}>{running ? 'Working…' : 'Run sample'}</button></div><div className="tool-cards">{cards.map((card, index) => <article key={card.name}><span>0{index + 1}</span><h3>{card.name}</h3><p>{card.detail}</p></article>)}</div>{!cards.length && <p className="preview-empty">No matching workspace items. Try another search.</p>}<div role="status">{complete && <p className="preview-inline-status"><Check size={14}/> Sample {runCount} complete. Open Activity or Files to inspect it.</p>}</div></>}
    {active === 1 && <div className="preview-detail-list"><span className="preview-eyebrow">This preview session</span><h3>Activity</h3>{runCount ? Array.from({ length: runCount }, (_, index) => <article key={index}><div className="preview-detail-heading"><strong>Sample run {runCount - index}</strong><span>Complete</span></div><p>Example workflow finished. Its output is available in Files.</p></article>) : <p>No runs yet. Start a sample from Workspace to see the activity here.</p>}</div>}
    {active === 2 && <div className="preview-detail-list"><span className="preview-eyebrow">Example files</span><div className="preview-file-tabs">{Object.keys(files).map(name => <button aria-pressed={selectedFile === name} className={selectedFile === name ? 'active' : ''} onClick={() => setSelectedFile(name)} key={name}><FileCode2 size={14}/>{name}</button>)}</div><pre className="preview-file-content">{files[selectedFile]}</pre></div>}
    {active === 3 && <div className="preview-detail-list"><span className="preview-eyebrow">Preview preferences</span><h3>Keep the context visible.</h3><label className="preview-setting"><input type="checkbox" checked={includeContext} onChange={event => setIncludeContext(event.target.checked)}/><span><strong>Include project context</strong><small>Include the technology list in the sample input file.</small></span></label><p>Changes apply to this preview session. Open Files to inspect the example input.</p></div>}
    {sampleNote}</section></div></div>
}
