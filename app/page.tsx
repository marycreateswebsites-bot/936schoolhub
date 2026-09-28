'use client'

import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Gamepad2,
  Globe2,
  Menu,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Tv2,
  PlayCircle,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

type LinkItem = {
  id: string
  name: string
  description: string
  url: string
  category: 'Games' | 'Watch' | 'Tools'
  icon: typeof Gamepad2
  tone: string
  iconTone: string
}

const starterLinks: LinkItem[] = [
  { id: 'games', name: 'Games', description: 'Your favorite games, all in one place.', url: 'https://www.crazygames.com', category: 'Games', icon: Gamepad2, tone: 'bg-[#eee9ff]', iconTone: 'text-[#7563c7]' },
  { id: 'youtube', name: 'YouTube', description: 'Watch, learn, and find your next thing.', url: 'https://www.youtube.com', category: 'Watch', icon: PlayCircle, tone: 'bg-[#ffe8ee]', iconTone: 'text-[#e95773]' },
  { id: 'google', name: 'Google', description: 'Search the web and find what you need.', url: 'https://www.google.com', category: 'Tools', icon: Globe2, tone: 'bg-[#e3f4ff]', iconTone: 'text-[#4285f4]' },
  { id: 'kisskh', name: 'KissKH', description: 'Catch up on your favorite shows and movies.', url: 'https://kisskh.co', category: 'Watch', icon: Tv2, tone: 'bg-[#e5f8f4]', iconTone: 'text-[#1c9b8d]' },
]

const toneOptions = [
  ['bg-[#fff0f5]', 'text-[#e95773]'],
  ['bg-[#eee9ff]', 'text-[#7563c7]'],
  ['bg-[#e3f4ff]', 'text-[#4285f4]'],
  ['bg-[#e5f8f4]', 'text-[#1c9b8d]'],
]

export default function Page() {
  const [links, setLinks] = useState(starterLinks)
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<'All' | LinkItem['category']>('All')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [newLink, setNewLink] = useState({ name: '', url: '', description: '', category: 'Games' as LinkItem['category'] })

  const filteredLinks = useMemo(() => links.filter((link) => {
    const matchesQuery = `${link.name} ${link.description}`.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (activeCategory === 'All' || link.category === activeCategory)
  }), [links, query, activeCategory])

  function addLink(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!newLink.name.trim() || !newLink.url.trim()) return
    const [background, foreground] = toneOptions[links.length % toneOptions.length]
    setLinks((current) => [...current, {
      id: crypto.randomUUID(),
      name: newLink.name.trim(),
      description: newLink.description.trim() || 'A link saved to your school hub.',
      url: newLink.url.startsWith('http') ? newLink.url : `https://${newLink.url}`,
      category: newLink.category,
      icon: Globe2,
      tone: background,
      iconTone: foreground,
    }])
    setNewLink({ name: '', url: '', description: '', category: 'Games' })
    setShowAdd(false)
  }

  return (
    <main className="hub-shell min-h-screen overflow-hidden px-4 py-5 text-slate-900 sm:px-8 sm:py-7">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3" aria-label="936schoolhub home">
            <span className="brand-mark"><Sparkles aria-hidden="true" /></span>
            <span className="text-lg font-black tracking-tight text-slate-800 sm:text-xl">936schoolhub</span>
          </a>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-xl text-slate-500 hover:bg-white hover:text-slate-800" onClick={() => setSettingsOpen((open) => !open)} aria-label="Open settings" aria-expanded={settingsOpen}>
              <Settings2 aria-hidden="true" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-xl text-slate-500 hover:bg-white hover:text-slate-800 md:hidden" aria-label="Open navigation"><Menu aria-hidden="true" /></Button>
          </div>
        </header>

        {settingsOpen && (
          <section className="settings-panel animate-in" aria-label="Settings">
            <div><p className="text-sm font-bold text-slate-800">Quick settings</p><p className="mt-1 text-xs text-slate-500">Personalize your launcher and add more links.</p></div>
            <Button variant="outline" className="rounded-xl border-slate-200 bg-white" onClick={() => setShowAdd(true)}><Plus data-icon="inline-start" /> Add a link</Button>
          </section>
        )}

        <section id="top" className="flex flex-col gap-6 pt-2 sm:pt-5">
          <div className="max-w-2xl">
            <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#1c9b8d]"><span className="size-2 rounded-full bg-[#1c9b8d]" /> Your everyday launchpad</p>
            <h1 className="text-balance text-4xl font-black tracking-[-0.05em] text-slate-900 sm:text-6xl">Everything you need,<br /><span className="gradient-text">one click away.</span></h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-500 sm:text-lg">A cozy corner for your favorite games, videos, tools, and places to explore.</p>
          </div>

          <div className="search-wrap flex max-w-2xl items-center gap-3 rounded-2xl bg-white px-4 py-2.5 shadow-[0_12px_32px_rgba(83,74,126,0.08)] ring-1 ring-white">
            <Search className="text-slate-400" aria-hidden="true" />
            <label htmlFor="link-search" className="sr-only">Search your links</label>
            <input id="link-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search games, websites, and more..." className="min-w-0 flex-1 bg-transparent py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400" />
            <kbd className="hidden rounded-lg bg-slate-50 px-2 py-1 text-[10px] font-bold text-slate-400 sm:block">⌘ K</kbd>
          </div>
        </section>

        <nav className="flex items-center gap-2 overflow-x-auto pb-1" aria-label="Link categories">
          {(['All', 'Games', 'Watch', 'Tools'] as const).map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${activeCategory === category ? 'bg-[#1c9b8d] text-white shadow-md shadow-[#1c9b8d]/20' : 'bg-white/70 text-slate-500 hover:bg-white hover:text-slate-800'}`}>{category}</button>)}
        </nav>

        <section aria-labelledby="quick-links-heading">
          <div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Quick access</p><h2 id="quick-links-heading" className="mt-1 text-2xl font-black tracking-tight text-slate-800">Your links</h2></div><span className="text-sm font-semibold text-slate-400">{filteredLinks.length} {filteredLinks.length === 1 ? 'link' : 'links'}</span></div>
          {filteredLinks.length ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{filteredLinks.map((link) => { const Icon = link.icon; return <article key={link.id} className="link-card group flex min-h-[270px] flex-col rounded-[1.5rem] bg-white p-5 shadow-[0_12px_30px_rgba(83,74,126,0.07)] ring-1 ring-white transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(83,74,126,0.14)]"><div className="flex items-start justify-between"><div className={`flex size-14 items-center justify-center rounded-2xl ${link.tone}`}><Icon className={link.iconTone} aria-hidden="true" /></div><span className="rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400">{link.category}</span></div><div className="mt-auto pt-8"><h3 className="text-xl font-black tracking-tight text-slate-800">{link.name}</h3><p className="mt-1 min-h-10 text-sm leading-5 text-slate-500">{link.description}</p><a href={link.url} target="_blank" rel="noreferrer" className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-50 text-sm font-bold text-slate-700 transition-colors hover:bg-[#e5f8f4] hover:text-[#147d72]">Open website <ArrowUpRight aria-hidden="true" /></a></div></article> })}<button onClick={() => setShowAdd(true)} className="add-card flex min-h-[270px] flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed border-[#bededb] bg-white/45 p-5 text-center transition-all hover:border-[#1c9b8d] hover:bg-white"><span className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-[#e5f8f4] text-[#1c9b8d]"><Plus aria-hidden="true" /></span><span className="font-black text-slate-700">Add a link</span><span className="mt-1 text-sm text-slate-400">Save another favorite</span></button></div> : <div className="rounded-3xl bg-white/70 p-10 text-center"><p className="font-bold text-slate-700">No links found</p><p className="mt-1 text-sm text-slate-500">Try a different search or add a new favorite.</p></div>}
        </section>

        <footer className="flex flex-col gap-2 border-t border-white/70 py-5 text-xs font-semibold text-slate-400 sm:flex-row sm:items-center sm:justify-between"><span>Made for curious minds · 936schoolhub</span><button className="text-left text-[#1c9b8d] hover:underline" onClick={() => setShowAdd(true)}>Customize your links →</button></footer>
      </div>

      {showAdd && <div className="fixed inset-0 z-10 flex items-center justify-center bg-slate-900/20 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setShowAdd(false) }}><form onSubmit={addLink} className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl" aria-label="Add a link"><div className="mb-5 flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-[#1c9b8d]">New favorite</p><h2 className="mt-1 text-2xl font-black text-slate-800">Add a link</h2></div><button type="button" onClick={() => setShowAdd(false)} className="text-2xl leading-none text-slate-400" aria-label="Close">×</button></div><div className="flex flex-col gap-3"><label className="text-sm font-bold text-slate-700">Name<input required value={newLink.name} onChange={(event) => setNewLink({ ...newLink, name: event.target.value })} placeholder="e.g. Cool Math Games" className="form-input" /></label><label className="text-sm font-bold text-slate-700">Website URL<input required type="url" value={newLink.url} onChange={(event) => setNewLink({ ...newLink, url: event.target.value })} placeholder="https://example.com" className="form-input" /></label><label className="text-sm font-bold text-slate-700">Short description<input value={newLink.description} onChange={(event) => setNewLink({ ...newLink, description: event.target.value })} placeholder="What is this link for?" className="form-input" /></label><label className="text-sm font-bold text-slate-700">Category<select value={newLink.category} onChange={(event) => setNewLink({ ...newLink, category: event.target.value as LinkItem['category'] })} className="form-input"><option>Games</option><option>Watch</option><option>Tools</option></select></label></div><Button type="submit" className="mt-5 h-11 w-full rounded-xl bg-[#1c9b8d] text-white hover:bg-[#147d72]">Save link</Button></form></div>}
    </main>
  )
}

