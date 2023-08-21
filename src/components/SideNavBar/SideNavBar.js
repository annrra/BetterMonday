'use client';
import React, { useState, useRef } from 'react';
import styles from './nav.module.css';
import Image from 'next/image';
import Link from 'next/link';

const SideNavBar = () => {
  const [navState, setNavState] = useState(false);
  const ref = useRef(null);

  const handleNav = () => {
    setNavState(!navState); 
  }

  const idleNav = () => {
    setNavState(false);
    ref.current.checked = false;
  }

  return (
    <div id='nav' className={styles.sidebar} data-nav={navState ? 'active' : 'idle'}>
      <div className={styles.sidenav}>
        <label htmlFor="check">
          <input ref={ref} type="checkbox" id='check' className={styles.check} onChange={handleNav} /> 
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
      <div className={styles.menu} data-state={navState ? 'on' : 'off'}>
        <div className={`${styles['menu-roll']}`}>
          <div className={`${styles['nav-header']}`}>
            <Link href="/">
              <Image
                src="/bettermonday.svg"
                alt="logo"
                className={styles.bettermonday}
                width={147}
                height={30}
                priority
              />
            </Link>
          </div>
          <div className={styles.nav}>
            <div className={`${styles['nav-col']} ${styles.col1}`}>
              <ul>
                <li>
                  <Link href="/" onClick={idleNav}>
                    <h3>Home</h3>
                    <div className={`${styles['nav-subtitle']}`}>Get back to the home page</div>
                  </Link>
                </li>
                <li>
                  <Link href="/" onClick={idleNav} className={styles.disable} title='Under development'>
                    <h3>About</h3>
                    <div className={`${styles['nav-subtitle']}`}>Always out there to experience a breath of fresh air. Read a little bit more ... Under development</div>
                  </Link>
                </li>
                <li>
                  <Link href="/#cases" onClick={idleNav}>
                    <h3>Case Studies</h3>
                    <div className={`${styles['nav-subtitle']}`}>Some of the projects I have been working on recently. I am learning and making the space to progress on my own terms.</div>
                  </Link>
                </li>
              </ul>
            </div>
            <div className={`${styles['nav-col']} ${styles.col2}`}></div>
          </div>
          <div className={`${styles['nav-footer']}`}>
            <div className={`${styles['nav-col']} ${styles.col1}`}>
              <p>Here can be found some of the stuff over which I’ve been working lately. My recent work consists mostly of design, Front-end development and its implementation into different content management systems.</p>
            </div>
            <div className={`${styles['nav-col']} ${styles.col2}`}>
              <p>I’m currently available for web design and development projects. If you are looking for a way to present your ideas online I would love to connect…</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default SideNavBar;
