'use client'

import React from 'react'

export const AfterNavLinks: React.FC = () => {
  return (
    <div
      style={{
        marginTop: 'auto',
        padding: '24px 16px',
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
      }}
    >
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 12px',
          borderRadius: '8px',
          color: 'rgba(255, 255, 255, 0.5)',
          textDecoration: 'none',
          fontSize: '11px',
          fontFamily: "'SF Mono', 'Fira Code', monospace",
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 215, 0, 0.05)'
          e.currentTarget.style.color = 'rgba(255, 215, 0, 0.8)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)'
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        View Live Site
      </a>
    </div>
  )
}
