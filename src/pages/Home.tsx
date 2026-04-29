import React from 'react';
import { Heading } from '../components/Heading';
import { DiscordIcon, XIcon, YouTubeIcon, RobloxIcon } from '../components/Icons';

export const Home = () => (
  <div>
    <Heading>ABOUT ME</Heading>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <div className="box" style={{ width: '200px', height: '200px', padding: '10px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
        <img 
          src="/image04.jpg" 
          alt="TDX Avatar" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a href="https://discord.com/users/636509584068050945" target="_blank" rel="noopener noreferrer" className="box social-icon" style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <DiscordIcon size={24} />
        </a>
        <a href="https://x.com/thedragonex10" target="_blank" rel="noopener noreferrer" className="box social-icon" style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <XIcon size={22} />
        </a>
        <a href="https://www.youtube.com/@thedragonx1057" target="_blank" rel="noopener noreferrer" className="box social-icon" style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <YouTubeIcon size={26} />
        </a>
        <a href="https://www.roblox.com/users/3330010014/profile" target="_blank" rel="noopener noreferrer" className="box social-icon" style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <RobloxIcon size={24} />
        </a>
      </div>

      <div className="box" style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '1.1rem', color: '#ccc', lineHeight: '1.8' }}>
          Hi, I'm <span style={{ color: '#fff', fontWeight: 700 }}>TDX</span>. I'm a Roblox scripter with <br />
          <span style={{ fontSize: '2.5rem', color: '#fff', fontWeight: 900, display: 'block', margin: '0.5rem 0' }}>4+ YEARS</span>
          of experience in <span style={{ color: '#fff', fontWeight: 700 }}>LUAU</span>.
        </p>
        <p style={{ marginTop: '1.5rem', color: '#aaa', fontSize: '1rem', textAlign: 'left' }}>
          I'm a fairly fast, experienced, trustworthy, and passionate scripter that has been on the platform for more than 4 years, I assure to keep my scripts optimized and easy to read. In my 4 years of experience, I've gained a high understanding of the engine and worked for many up-coming games/projects. I am primarily known for my discord server "TDX Scripting" where I provide various amounts of high-quality examples, breakdown of my scripts, and script showcases.
        </p>
        <p style={{ marginTop: '2rem', color: '#555', fontSize: '0.8rem', letterSpacing: '0.1em', fontWeight: 700 }}>TIMEZONE : GMT+3</p>
      </div>
    </div>
  </div>
);

