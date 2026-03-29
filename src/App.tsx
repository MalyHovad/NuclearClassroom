/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
*/
import './App.css'
import { Footer } from './components/Footer'
import { FileTree } from './components/FileTree'

function App() {
  return (
    <>
      <section id="header"></section>
      <section id="center">
        <h1>NSC document utility</h1>
        <div id="content">
          <FileTree />
        </div>
      </section>
      <div className="ticks"></div>
      <div className="ticks"></div>
      <Footer />
    </>
  )
}

export default App