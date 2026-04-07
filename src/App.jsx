import { useState } from 'react'
import './App.css'
import Katana from './components/Katana'
import { useEffect } from "react";
import GradientText from './components/GradientText'
import ChangingText from './components/ChangingText'
import SpotlightCard from './components/SpotlightCard'
import BlurText from './components/BlurText'
import React from "react";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { Canvas } from '@react-three/fiber'
function App() {




  return (
    <>
      <main>

        {/* BOTTOM: Background image */}
        <div className="bg-layer" />

        {/* MIDDLE: 3D Canvas */}
        <Canvas
          style={{
            height: "100vh",
            width: "100vw",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 2,
          }}
        >
          <Katana />
        </Canvas>

        {/* TOP: All page content */}
        <div className="content-layer">
          <section id='section-1'>
            <div className="main-1">
              <div className='main-1-top'>
                <div className="main-heading">
                  <div className="logo">
                    <img src="/logo.png" alt="" />
                  </div>
                  <p><span>The Rogue</span> <br />
                    Programming Language
                  </p>
                </div>
              </div>
              <div className='main-1-bottom'>
                <div className="main-qoutes">
                  <GradientText
                    colors={["#ff6f27", "#ff9f9f", "#ff0026"]}
                    animationSpeed={8}
                    showBorder={false}
                    className="custom-class"
                  >
                    <p className="slide-up">Ronin</p>
                  </GradientText>

                </div>
                <div className="main-links">
                  <div className="custom-spotlight-card" >
                    <div>Code like a lone warrior. No masters, no boilerplate.</div>
                    <div className='section1-buttons'>
                      {/* <ShurikenButton>hgfsdjf</ShurikenButton> */}
                      <button className='button-1'>Start Coding</button>
                      <button className='button-2'>Veiw Documentation</button>
                    </div>
                    <span>Try Playground →</span>

                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="section-2">
            <div className="text-center">
              <ChangingText />
            </div>
          </section>

          <section id='section-3' className="blade-section">
            <div className="blade-container">

              {/* LEFT SIDE */}
              <div className="blade-left">
                <p className="tag">// SYNTAX</p>

                <h1 className="title">
                  The Language of the Blade
                </h1>

                <p className="description">
                  Ronin replaces boring keywords with expressive commands.
                  Every line is a strike. Every function is a technique.
                </p>

                <div className="commands">
                  <div><span>attack</span> → Print to console</div>
                  <div><span>summon</span> → Declare a variable</div>
                  <div><span>honor</span> → Declare a constant</div>
                  <div><span>strike</span> → While loop</div>
                  <div><span>meditate</span> → Sleep/delay</div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="blade-right">
                <div className="code-window">
                  <div className="window-header">
                    <div className="dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <p>ronin.rn</p>
                  </div>

                  <pre className="code">
                    {`// The way of the Ronin

summon warrior = "Ronin"

attack "Hello, " + warrior + "!"

honor lives = 3
meditate 500

strike (lives > 0) {
  attack "Strike #" + lives
  lives = lives - 1
}

attack "The battle is over."`}
                  </pre>
                </div>
              </div>

            </div>
          </section>





          {/* section 4 */}

          <section className="join-section">
            <div className="join-container">

              {/* Top Icon */}
              <div className="star">✦</div>

              {/* Subtitle */}
              <p className="subtitle">// COMMUNITY</p>

              {/* Title */}
              <h1 className="title">Join the Clan</h1>

              {/* Description */}
              <p className="description">
                Ronin is open source. The code belongs to the clan. Fork it, shape it,
                make it yours. Every contribution is a strike that makes us stronger.
              </p>

              {/* Buttons */}
              <div className="buttons">
                <button className="btn primary">
                  <FaGithub /> GitHub
                </button>

                <button className="btn secondary">
                  <FaDiscord /> Discord
                </button>
              </div>
            </div>

            {/* Footer line */}
            <div className="footer">
              <span className="footer-left">✦ Forge your code like a true Ronin.</span>

              <div className="footer-right">
                <a href="#">GitHub</a>
                <a href="#">Docs</a>
                <a href="#">Playground</a>
              </div>
            </div>
          </section>


        </div>

      </main>
    </>
  )
}

export default App
