import Header from '@/components/header/header'
import Link from 'next/link'
import React from 'react'
import resultsStyle from './results.css'

const Results = () => {
  return (
    <div id='results'>
      <Header />
      <div className="resultsContainer">
        <p className='resultsTitle uppercase'>To start analysis</p>
        <div className='resultsMiddle'>
          <img src='/camera.png'/>
          <img src='/gallery.png'/>
        </div>
        <Link href="/Test" className="startButton uppercase">
            <img className="arrowIcon" src="/button-icon-shrunk.png" />
            Back
          </Link>
      </div>
    </div>
  )
}

export default Results
