import { useState, useEffect, useRef } from 'react'

import './App.css'

async function fetchAPI(endpoint, options = {}) {
  if (endpoint === '/data/stats') return { total_students: 64, total_submissions: 294, auto_approved_rate: 49.3, avg_confidence: 0.84 }
  if (endpoint === '/data/schools') return [{ code: 'SCIS', name: 'Computer & Information Sciences', department_count: 2, course_count: 4, description: 'Illustrative school record for this frontend demonstration.' }]
  if (endpoint.startsWith('/data/schools/')) return { name: 'Computer & Information Sciences', director: 'Sample faculty profile', students_by_semester: { 'Semester 1': [{ reg: 'DEMO-01', name: 'Sample student', course: 'Information Technology' }] } }
  if (endpoint === '/data/resources') return [{ title: 'Sample course reading', type: 'document', description: 'Example learning resource. No document is uploaded or retrieved.', url: 'https://github.com/Prathmesh333/TRACE_Transparent_Results_and_Academic_Compliance_Engine' }]
  return null
}

const Icons = {
  Dashboard: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
  Upload: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17,8 12,3 7,8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>,
  FileText: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
  Users: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>,
  AlertTriangle: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
  BarChart: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
  CheckCircle: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22,4 12,14.01 9,11.01" /></svg>,
  Clock: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" /></svg>,
  Settings: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" /></svg>,
  Bell: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>,
  Target: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
  Book: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>,
  Camera: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" /></svg>,
  GraduationCap: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>,
  LogOut: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>,
  Building: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><line x1="9" y1="22" x2="9" y2="2" /><line x1="14" y1="2" x2="14" y2="22" /></svg>,
  Message: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>,
  Search: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
  Bot: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /><line x1="8" y1="16" x2="8" y2="16" /><line x1="16" y1="16" x2="16" y2="16" /></svg>,
  Sun: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>,
  Moon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
}

function Sparkline({ data, positive = true, height = 32 }) {
  if (!data || data.length < 2) return null
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 100
    const y = 100 - ((val - min) / range) * 100
    return `${x},${y}`
  }).join(' ')
  const strokeColor = positive ? 'var(--success)' : 'var(--danger)'

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '80px', height: `${height}px` }}>
      <defs>
        <linearGradient id={`gradient-${positive}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,100 ${points} 100,100`} fill={`url(#gradient-${positive})`} />
      <polyline points={points} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StatCard({ label, value, data, variant = '', icon, positive = true }) {
  return (
    <div className={`stat-card ${variant}`}>
      <div className="stat-header">
        <span className="stat-label">{label}</span>
        <div className="stat-icon">{Icons[icon] && Icons[icon]()}</div>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-graph">
        <Sparkline data={data} positive={positive} />
      </div>
    </div>
  )
}

function LoadingSpinner() {
  return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>
}

function EmptyState({ title, message, icon }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{Icons[icon] ? Icons[icon]() : Icons.FileText()}</div>
      <div className="empty-title">{title}</div>
      <div className="empty-text">{message}</div>
    </div>
  )
}

function ResourcesView() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const data = await fetchAPI('/data/resources')
      setResources(data || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Learning Resources</h1>
        <p className="page-description">Platform-wide study materials and references</p>
      </div>
      <div className="card fade-in">
        <div className="card-body">
          {resources.length > 0 ? (
            <div className="resources-grid">
              {resources.map((res, i) => (
                <div key={i} className="resource-card">
                  <div className="resource-icon">{res.type === 'video' ? Icons.Camera() : Icons.FileText()}</div>
                  <div className="resource-info">
                    <h4>{res.title}</h4>
                    <p>{res.difficulty} • {res.type}</p>
                  </div>
                  <a href={res.url} target="_blank" className="btn btn-sm btn-ghost">View</a>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="No Resources Found" message="Check back later for uploaded materials." icon="Upload" />
          )}
        </div>
      </div>
    </>
  )
}

function AdminDashboard({ user }) {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const trend = [1, 2, 3, 4, 5, 6, 7]

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchAPI('/data/stats')
        setStats(data)
      } catch (e) {
        setStats({ total_students: 64, total_submissions: 294, auto_approved_rate: 49.3, avg_confidence: 0.84 })
      }
      setLoading(false)
    }
    loadData()
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-description">System Overview & Health</p>
      </div>

      <div className="stats-grid fade-in">
        <StatCard label="Total Students" value={stats?.total_students || 0} data={trend} positive={true} icon="Users" />
        <StatCard label="Total Submissions" value={stats?.total_submissions || 0} data={trend} positive={true} icon="FileText" />
        <StatCard label="Auto-Approved" value={`${stats?.auto_approved_rate || 0}%`} data={trend} positive={true} variant="success" icon="CheckCircle" />
        <StatCard label="AI Confidence" value={(stats?.avg_confidence || 0).toFixed(2)} data={trend} positive={true} variant="info" icon="Target" />
      </div>

      <div className="schools-grid fade-in">
        {['SCIS', 'SoP', 'SoC', 'SMS', 'SLS', 'SoE', 'SoH', 'SoSS'].map((code, i) => (
          <div key={i} className="school-card">
            <div className="school-icon">{Icons.Building()}</div>
            <div className="school-code">{code}</div>
            <div className="school-name">{{
              SCIS: 'Computer & Information Sciences', 
              SoP: 'Physics', 
              SoC: 'Chemistry', 
              SMS: 'Maths & Stats', 
              SLS: 'Life Sciences',
              SoE: 'Economics',
              SoH: 'Humanities',
              SoSS: 'Social Sciences'
            }[code]}</div>
          </div>
        ))}
      </div>
    </>
  )
}

function AdminSchoolsView({ onSelectSchool }) {
  const [schools, setSchools] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const data = await fetchAPI('/data/schools')
      setSchools(data || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">School Management</h1>
        <p className="page-description">Manage University Schools and Departments</p>
      </div>
      <div className="schools-grid fade-in">
        {schools.map((s, i) => (
          <div key={i} className="school-card"><button className="btn btn-ghost" onClick={() => onSelectSchool(s.code)} aria-label={`Open ${s.name}`}>
            <div className="school-icon">{Icons.Building()}</div>
            <div className="school-code">{s.code}</div>
            <div className="school-name">{s.name}</div>
            <div className="school-stats">
              <span>{s.department_count} Departments</span> • <span>{s.course_count} Courses</span>
            </div>
            <div style={{ marginTop: '10px', fontSize: '13px', color: 'var(--text-muted)' }}>{s.description}</div></button>
          </div>
        ))}
      </div>
    </>
  )
}

function SchoolDetailsView({ code, onBack }) {
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const data = await fetchAPI(`/data/schools/${code}`)
      setDetails(data)
      setLoading(false)
    }
    load()
  }, [code])

  if (loading) return <LoadingSpinner />
  if (!details) return <EmptyState title="School Not Found" />

  return (
    <>
      <div className="page-header">
        <button className="btn btn-sm btn-ghost" onClick={onBack} style={{ marginBottom: '10px' }}>← Back to Schools</button>
        <h1 className="page-title">{details.name}</h1>
        <p className="page-description">Director: {details.director}</p>
      </div>

      <div className="content-grid fade-in">
        {Object.entries(details.students_by_semester).map(([sem, students]) => (
          <div key={sem} className="card">
            <div className="card-header"><h3 className="card-title">{sem} Students</h3></div>
            <div className="card-body" style={{ padding: 0 }}>
              <table className="data-table">
                <thead><tr><th>Reg No.</th><th>Name</th><th>Course</th></tr></thead>
                <tbody>
                  {students.map((s, i) => (
                    <tr key={i}>
                      <td style={{ fontFamily: 'monospace' }}>{s.reg}</td>
                      <td>{s.name}</td>
                      <td>{s.course}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default function FrontendDemo() {
  const [view, setView] = useState('dashboard')
  const [school, setSchool] = useState(null)
  return <main style={{ padding: 'clamp(16px, 3vw, 40px)', maxWidth: 1300, margin: 'auto' }}>
    <header style={{ marginBottom: 24 }}><h1>TRACE frontend demo</h1><p>Original dashboard components with illustrative local data. No login, student records, grading, camera, uploads, or server connections.</p>
      <nav aria-label="Demo views" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 16 }}>{['dashboard', 'schools', 'resources'].map(item => <button key={item} className="btn btn-primary" aria-pressed={view === item} onClick={() => { setView(item); setSchool(null) }}>{item === 'dashboard' ? 'Dashboard' : item === 'schools' ? 'Schools' : 'Resources'}</button>)}</nav>
    </header>
    {view === 'dashboard' && <AdminDashboard user={{ role: 'admin' }}/>}
    {view === 'schools' && (school ? <SchoolDetailsView code={school} onBack={() => setSchool(null)}/> : <AdminSchoolsView onSelectSchool={setSchool}/>)}
    {view === 'resources' && <ResourcesView/>}
  </main>
}
