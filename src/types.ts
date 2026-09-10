export type AppId = 'welcome' | 'projects' | 'research' | 'terminal' | 'skills' | 'about' | 'education' | 'resume' | 'contact' | 'games' | 'monitor' | 'hqde' | 'vsfeed' | 'caniplay' | 'preview'

export type WindowState = {
  id: AppId
  title: string
  isOpen: boolean
  minimized: boolean
  maximized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
}
