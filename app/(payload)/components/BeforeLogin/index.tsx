'use client'

import React from 'react'

export const BeforeLogin: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '40px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          border: '2px solid rgba(255, 215, 0, 0.3)',
          overflow: 'hidden',
          marginBottom: '24px',
          boxShadow: '0 0 40px rgba(255, 215, 0, 0.15)',
        }}
      >
        <img
          src="/david-joseph.jpg"
          alt="David Joseph"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      <h1
        style={{
          fontSize: '28px',
          fontWeight: 800,
          color: 'rgba(255, 255, 255, 0.9)',
          margin: '0 0 8px 0',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        }}
      >
        DAVID JOSEPH
      </h1>
      <p
        style={{
          fontSize: '11px',
          fontFamily: "'SF Mono', 'Fira Code', monospace",
          color: '#FFD700',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          margin: '0 0 16px 0',
          opacity: 0.8,
        }}
      >
        Your Special Developer
      </p>
      <p
        style={{
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.4)',
          margin: 0,
          maxWidth: '300px',
          lineHeight: 1.6,
        }}
      >
        Content Management System
      </p>
    </div>
  )
}
