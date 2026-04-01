/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
*/
import './App.css'
import { Footer } from './components/Footer'
import { FileTree } from './components/FileTree'
import { Preview } from './components/Preview'

function App() {
  return (
    <>
      <section id="header"></section>
      <section id="center" className='h-full'>
        <h1>NSC document utility</h1>
        <div className="w-full h-full flex">
          <Preview url={'assets\\egs\\sop\\EGS SOP-SCRAM-QC v2 (1).pdf'} />
        </div>
      </section>
      <div className="ticks"></div>
      <div className="ticks"></div>
      <Footer />
    </>
  )
}

export default App