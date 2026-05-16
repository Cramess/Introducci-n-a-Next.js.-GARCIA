"use client"

type MovieDetail = {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Array<{ Source: string; Value: string }>
  imdbRating: string
  BoxOffice: string
  Production: string
  Website: string
  Type: string
}

type Props = {
  open: boolean
  onClose: () => void
  movie: MovieDetail | null
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
      <span style={{
        fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.25em',
        color: 'rgba(0,255,136,0.45)', whiteSpace: 'nowrap', paddingTop: '1px',
        minWidth: '90px',
      }}>
        {label}
      </span>
      <span style={{ fontSize: '12px', color: '#cfffdf', lineHeight: 1.5 }}>
        {value || '—'}
      </span>
    </div>
  )
}

export default function MovieDetailsModal({ open, onClose, movie }: Props) {
  if (!open || !movie) return null

  const imdbScore = parseFloat(movie.imdbRating)
  const scorePercent = isNaN(imdbScore) ? 0 : (imdbScore / 10) * 100

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Ambient glow behind modal */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Modal panel */}
      <div
        className="scifi-card animate-modal-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '860px',
          maxHeight: '90vh', overflowY: 'auto',
          position: 'relative',
        }}
      >
        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 20px',
          borderBottom: '1px solid rgba(0,255,136,0.12)',
          background: 'rgba(0,255,136,0.03)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Traffic-light dots */}
            {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
              <span key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, display: 'inline-block' }} />
            ))}
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(0,255,136,0.4)', letterSpacing: '0.2em', marginLeft: '4px' }}>
              MOVIE_DETAIL :: {movie.imdbRating !== 'N/A' ? `IMDb_${movie.imdbRating}` : 'DATA_LOADED'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em',
              padding: '4px 12px',
              border: '1px solid rgba(255,60,60,0.4)',
              color: 'rgba(255,100,100,0.8)',
              background: 'rgba(255,60,60,0.05)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,60,60,0.15)'
              e.currentTarget.style.color = '#ff6060'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,60,60,0.05)'
              e.currentTarget.style.color = 'rgba(255,100,100,0.8)'
            }}
          >
            ✕ CLOSE
          </button>
        </div>

        {/* Body */}
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '0' }}>

          {/* Left: Poster column */}
          <div style={{ padding: '24px', borderRight: '1px solid rgba(0,255,136,0.1)' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : '/vercel.svg'}
                alt={movie.Title}
                style={{
                  width: '100%', aspectRatio: '2/3', objectFit: 'cover',
                  display: 'block',
                  filter: 'brightness(0.9) saturate(0.85) contrast(1.05)',
                  border: '1px solid rgba(0,255,136,0.2)',
                }}
              />
              {/* Scanlines */}
              <div
                style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
                }}
              />
              {/* Type badge */}
              <div style={{
                position: 'absolute', bottom: '10px', left: '10px',
                fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.2em',
                padding: '3px 8px',
                background: 'rgba(0,0,0,0.9)',
                border: '1px solid rgba(0,255,136,0.5)',
                color: '#00ff88',
                textShadow: '0 0 8px #00ff88',
              }}>
                {movie.Type.toUpperCase()}
              </div>
            </div>

            {/* IMDb score bar */}
            <div style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '9px', color: 'rgba(0,255,136,0.45)', letterSpacing: '0.2em' }}>IMDb SCORE</span>
                <span className="neon-text" style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: 700 }}>{movie.imdbRating}</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(0,255,136,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                <div
                  className="animate-pulse-neon"
                  style={{
                    height: '100%', width: `${scorePercent}%`,
                    background: 'linear-gradient(to right, #00ff88, #00e5ff)',
                    boxShadow: '0 0 8px rgba(0,255,136,0.6)',
                    borderRadius: '2px',
                    transition: 'width 1s ease',
                  }}
                />
              </div>
            </div>

            {/* Ratings from sources */}
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {movie.Ratings?.map((r) => (
                <div key={r.Source} style={{
                  padding: '8px 10px',
                  background: 'rgba(0,255,136,0.03)',
                  border: '1px solid rgba(0,255,136,0.1)',
                }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '8px', color: 'rgba(0,255,136,0.4)', letterSpacing: '0.2em', marginBottom: '2px' }}>
                    {r.Source.toUpperCase()}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#e0ffe8' }}>{r.Value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info column */}
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Title block */}
            <div>
              <div style={{ fontFamily: 'monospace', fontSize: '9px', color: 'rgba(0,255,136,0.45)', letterSpacing: '0.35em', marginBottom: '8px' }}>
                // TITLE_RECORD
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                {movie.Title}
              </h2>
              <p style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(0,255,136,0.5)', marginTop: '6px', letterSpacing: '0.1em' }}>
                {movie.Year} &nbsp;·&nbsp; {movie.Runtime} &nbsp;·&nbsp; {movie.Rated}
              </p>

              {/* Genre pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
                {movie.Genre?.split(', ').map((g) => (
                  <span key={g} style={{
                    fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.15em',
                    padding: '3px 9px',
                    border: '1px solid rgba(0,229,255,0.3)',
                    color: '#00e5ff',
                    background: 'rgba(0,229,255,0.05)',
                    textShadow: '0 0 6px rgba(0,229,255,0.5)',
                  }}>
                    {g.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'linear-gradient(to right, rgba(0,255,136,0.3), transparent)' }} />

            {/* Synopsis */}
            <div>
              <div style={{ fontFamily: 'monospace', fontSize: '9px', color: 'rgba(0,255,136,0.45)', letterSpacing: '0.35em', marginBottom: '8px' }}>
                // SYNOPSIS
              </div>
              <p style={{ fontSize: '13px', color: '#8ab09a', lineHeight: 1.7 }}>
                {movie.Plot}
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'linear-gradient(to right, rgba(0,255,136,0.3), transparent)' }} />

            {/* Data table */}
            <div>
              <div style={{ fontFamily: 'monospace', fontSize: '9px', color: 'rgba(0,255,136,0.45)', letterSpacing: '0.35em', marginBottom: '12px' }}>
                // METADATA
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <DataRow label="DIRECTOR::" value={movie.Director} />
                <DataRow label="WRITER::" value={movie.Writer} />
                <DataRow label="ACTORS::" value={movie.Actors} />
                <DataRow label="COUNTRY::" value={movie.Country} />
                <DataRow label="LANGUAGE::" value={movie.Language} />
                <DataRow label="RELEASED::" value={movie.Released} />
                <DataRow label="BOX_OFFICE::" value={movie.BoxOffice} />
                <DataRow label="AWARDS::" value={movie.Awards} />
              </div>
            </div>

            {/* Bottom accent line */}
            <div style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(0,255,136,0.2), transparent)' }} />
              <span style={{ fontFamily: 'monospace', fontSize: '9px', color: 'rgba(0,255,136,0.3)', letterSpacing: '0.2em' }}>
                SRC::OMDB_API
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
