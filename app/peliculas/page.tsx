import axios from 'axios'
import SearchMovies from './SearchMovies'

const apiKey = 'f1def80d'

type MovieSummary = {
  imdbID: string
  Title: string
  Year: string
  Poster: string
  Type: string
}

async function getPopularMovies(): Promise<MovieSummary[]> {
  const response = await axios.get(
    `http://www.omdbapi.com/?apikey=${apiKey}&s=marvel&type=movie&page=1`
  )
  return response.data?.Search ?? []
}

export default async function PeliculasPage() {
  const popularMovies = await getPopularMovies()

  return (
    <div className="scifi-grid-bg min-h-screen text-white py-10 px-4 sm:px-6 lg:px-10" style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Top ambient glow */}
      <div style={{
        position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '1px',
        background: 'linear-gradient(to right, transparent, #00ff88, transparent)',
        boxShadow: '0 0 80px 30px rgba(0,255,136,0.12)',
        zIndex: 0, pointerEvents: 'none',
      }} />

      {/* Bottom ambient glow */}
      <div style={{
        position: 'fixed', bottom: 0, right: '10%',
        width: '400px', height: '1px',
        background: 'linear-gradient(to right, transparent, #9b5eff, transparent)',
        boxShadow: '0 0 60px 20px rgba(155,94,255,0.1)',
        zIndex: 0, pointerEvents: 'none',
      }} />

      <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ────────────────────────────────── */}
        <header className="mb-14 text-center">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ height: '1px', width: '100px', background: 'linear-gradient(to right, transparent, #00ff88)' }} />
            <span style={{
              fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.45em',
              color: '#00ff88', textShadow: '0 0 10px #00ff88',
            }}>
              SYS://CINE.DATABASE.v2.1
            </span>
            <div style={{ height: '1px', width: '100px', background: 'linear-gradient(to left, transparent, #00ff88)' }} />
          </div>

          <h1 style={{
            fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', fontWeight: 900,
            letterSpacing: '-0.03em', lineHeight: 1,
            color: '#fff', textShadow: '0 0 60px rgba(0,255,136,0.2)',
          }}>
            MOVIE
            <span className="neon-text animate-flicker">BASE</span>
          </h1>

          <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(0,255,136,0.4)', letterSpacing: '0.1em' }}>
              SERVER_RENDER=<span style={{ color: '#00ff88' }}>TRUE</span>
            </span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#00ff88', display: 'inline-block', boxShadow: '0 0 8px #00ff88' }} />
            <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(0,255,136,0.4)', letterSpacing: '0.1em' }}>
              INTERACTIVE=<span style={{ color: '#00ff88' }}>ENABLED</span>
            </span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#00ff88', display: 'inline-block', boxShadow: '0 0 8px #00ff88' }} />
            <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(0,255,136,0.4)', letterSpacing: '0.1em' }}>
              API=<span style={{ color: '#00ff88' }}>OMDB</span>
            </span>
          </div>
        </header>

        {/* ── Main grid ─────────────────────────────── */}
        <section style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'minmax(0,1.5fr) minmax(0,1fr)' }}
          className="lg:grid-cols-[1.5fr_1fr] grid-cols-1">

          {/* Left: SSR popular movies */}
          <div>
            <div className="scifi-card animate-border-glow" style={{ padding: '24px', marginBottom: '0' }}>

              {/* Panel header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div>
                  <div style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.35em', color: 'rgba(0,255,136,0.5)', marginBottom: '6px' }}>
                    // POPULAR_MOVIES :: PAGE_01
                  </div>
                  <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#e0ffe8', letterSpacing: '0.02em' }}>
                    Películas Populares
                  </h2>
                </div>
                <span className="scifi-badge">SSR</span>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'linear-gradient(to right, rgba(0,255,136,0.4), transparent)', marginBottom: '20px' }} />

              {/* Movie grid */}
              <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
                {popularMovies.length > 0 ? (
                  popularMovies.map((movie) => (
                    <article
                      key={movie.imdbID}
                      className="scifi-card scifi-card-hover animate-slide-up"
                      style={{ overflow: 'hidden', cursor: 'default' }}
                    >
                      {/* Poster */}
                      <div style={{ position: 'relative', overflow: 'hidden' }}>
                        <img
                          src={movie.Poster !== 'N/A' ? movie.Poster : '/vercel.svg'}
                          alt={movie.Title}
                          style={{
                            width: '100%', height: '210px', objectFit: 'cover', display: 'block',
                            filter: 'brightness(0.8) saturate(0.85) contrast(1.1)',
                            transition: 'filter 0.4s',
                          }}
                        />
                        {/* Scanline overlay */}
                        <div className="scanlines" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
                        {/* Type badge */}
                        <div style={{
                          position: 'absolute', top: '8px', left: '8px',
                          fontFamily: 'monospace', fontSize: '8px', letterSpacing: '0.2em',
                          padding: '2px 7px',
                          background: 'rgba(0,0,0,0.85)',
                          border: '1px solid rgba(0,255,136,0.5)',
                          color: '#00ff88',
                        }}>
                          {movie.Type.toUpperCase()}
                        </div>
                        {/* Bottom gradient */}
                        <div style={{
                          position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
                          background: 'linear-gradient(to top, #030806, transparent)',
                        }} />
                      </div>

                      {/* Info */}
                      <div style={{ padding: '10px 12px 12px' }}>
                        <div style={{ fontFamily: 'monospace', fontSize: '8px', color: 'rgba(0,255,136,0.3)', letterSpacing: '0.15em', marginBottom: '4px' }}>
                          {movie.imdbID}
                        </div>
                        <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#cfffdf', lineHeight: 1.35 }}>
                          {movie.Title}
                        </h3>
                        <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 6px #00ff88', flexShrink: 0 }} />
                          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(0,255,136,0.5)' }}>
                            {movie.Year}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <p style={{ fontFamily: 'monospace', color: 'rgba(0,255,136,0.4)', fontSize: '12px', gridColumn: '1/-1' }}>
                    // ERROR: NO_RESULTS_FOUND
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right: CSR search */}
          <div>
            <SearchMovies />
          </div>
        </section>

      </div>
    </div>
  )
}
