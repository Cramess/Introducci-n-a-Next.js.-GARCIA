"use client"

import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import MovieDetailsModal from './MovieDetailsModal'

const apiKey = 'f1def80d'

type MovieSearchItem = {
  imdbID: string
  Title: string
  Year: string
  Poster: string
  Type: string
}

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
  imdbVotes: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
}

export default function SearchMovies() {
  const [query, setQuery] = useState('marvel')
  const [year, setYear] = useState('')
  const [results, setResults] = useState<MovieSearchItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const searchKey = useMemo(() => query.trim(), [query])

  useEffect(() => {
    const controller = new AbortController()
    const timer = setTimeout(async () => {
      if (!searchKey || searchKey.length < 2) {
        setResults([])
        setError('MIN_CHARS: 2')
        return
      }

      setLoading(true)
      setError('')

      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchKey)}${year ? `&y=${year}` : ''}`,
          { signal: controller.signal }
        )

        if (response.data.Response === 'True') {
          setResults(response.data.Search)
        } else {
          setResults([])
          setError(response.data.Error || 'NO_RESULTS_FOUND')
        }
      } catch {
        if (!controller.signal.aborted) {
          setError('CONNECTION_ERROR')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }, 400)

    return () => {
      controller.abort()
      clearTimeout(timer)
    }
  }, [searchKey, year])

  const openDetails = async (id: string) => {
    setDetailsOpen(true)
    setSelectedMovie(null)
    setLoading(true)

    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`
      )

      if (response.data.Response === 'True') {
        setSelectedMovie(response.data)
      } else {
        setError(response.data.Error || 'DETAIL_FETCH_ERROR')
      }
    } catch {
      setError('CONNECTION_ERROR')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="scifi-card animate-border-glow" style={{ padding: '24px', height: '100%' }}>

      {/* Panel header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <div style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.35em', color: 'rgba(0,255,136,0.5)', marginBottom: '6px' }}>
            // INTERACTIVE_SEARCH :: CSR
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#e0ffe8' }}>
            Buscador
          </h2>
        </div>
        <span className="scifi-badge">CSR</span>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'linear-gradient(to right, rgba(0,255,136,0.4), transparent)', marginBottom: '20px' }} />

      {/* Search fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        <div>
          <label style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(0,255,136,0.5)', display: 'block', marginBottom: '6px' }}>
            QUERY::TITLE_OR_SERIES
          </label>
          <input
            className="scifi-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="// buscar..."
            style={{ width: '100%', padding: '10px 14px', fontSize: '13px', borderRadius: '2px' }}
          />
        </div>
        <div>
          <label style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(0,255,136,0.5)', display: 'block', marginBottom: '6px' }}>
            FILTER::YEAR [OPTIONAL]
          </label>
          <input
            className="scifi-input"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="// 2024"
            style={{ width: '100%', padding: '10px 14px', fontSize: '13px', borderRadius: '2px' }}
          />
        </div>
      </div>

      {/* Status bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '6px 12px', marginBottom: '16px',
        background: 'rgba(0,255,136,0.03)',
        border: '1px solid rgba(0,255,136,0.1)',
        fontFamily: 'monospace', fontSize: '10px',
      }}>
        <span style={{ color: 'rgba(0,255,136,0.5)' }}>
          {loading ? (
            <span className="animate-pulse-neon" style={{ color: '#00ff88' }}>⬤ SCANNING...</span>
          ) : results.length > 0 ? (
            <span>⬤ <span style={{ color: '#00ff88' }}>{results.length}</span> RESULTS</span>
          ) : (
            <span>⬤ READY</span>
          )}
        </span>
        <span style={{ color: 'rgba(0,255,136,0.3)', letterSpacing: '0.1em' }}>
          API::OMDB
        </span>
      </div>

      {/* Error */}
      {error && !loading && (
        <div style={{
          padding: '10px 14px', marginBottom: '12px',
          border: '1px solid rgba(255,60,60,0.3)',
          background: 'rgba(255,60,60,0.05)',
          fontFamily: 'monospace', fontSize: '11px',
          color: '#ff6060', letterSpacing: '0.05em',
        }}>
          ERR :: {error}
        </div>
      )}

      {/* Results list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '520px', overflowY: 'auto', paddingRight: '4px' }}>
        {loading && !selectedMovie && (
          <div style={{
            padding: '24px', textAlign: 'center',
            fontFamily: 'monospace', fontSize: '12px',
            color: 'rgba(0,255,136,0.5)', letterSpacing: '0.2em',
          }}>
            <div className="animate-pulse-neon" style={{ color: '#00ff88', fontSize: '24px', marginBottom: '8px' }}>◈</div>
            LOADING...
          </div>
        )}

        {results.map((movie) => (
          <button
            key={movie.imdbID}
            type="button"
            onClick={() => openDetails(movie.imdbID)}
            className="scifi-card scifi-card-hover"
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '10px', width: '100%', textAlign: 'left',
              cursor: 'pointer', overflow: 'hidden',
              background: 'rgba(0,255,136,0.02)',
              transition: 'all 0.25s',
            }}
          >
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : '/vercel.svg'}
                alt={movie.Title}
                style={{
                  width: '52px', height: '72px', objectFit: 'cover',
                  filter: 'brightness(0.85) saturate(0.9)',
                  display: 'block',
                }}
              />
              <div className="scanlines" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
            </div>

            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontFamily: 'monospace', fontSize: '8px', letterSpacing: '0.25em', color: '#00ff88', marginBottom: '3px' }}>
                {movie.Type.toUpperCase()} · {movie.imdbID}
              </div>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#e0ffe8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {movie.Title}
              </h3>
              <div style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(0,255,136,0.4)', marginTop: '3px' }}>
                YEAR: {movie.Year}
              </div>
            </div>

            <div style={{ fontFamily: 'monospace', fontSize: '10px', color: '#00ff88', letterSpacing: '0.1em', flexShrink: 0 }}>
              VIEW →
            </div>
          </button>
        ))}
      </div>

      {/* Inline details panel */}
      {selectedMovie && !detailsOpen && (
        <div className="scifi-card animate-slide-up" style={{ marginTop: '16px', padding: '20px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img
                src={selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : '/vercel.svg'}
                alt={selectedMovie.Title}
                style={{ width: '100px', height: '140px', objectFit: 'cover', display: 'block' }}
              />
              <div className="scanlines" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'monospace', fontSize: '8px', letterSpacing: '0.3em', color: 'rgba(0,255,136,0.5)', marginBottom: '4px' }}>
                {selectedMovie.Type.toUpperCase()}
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#e0ffe8', lineHeight: 1.2, marginBottom: '8px' }}>
                {selectedMovie.Title}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginBottom: '8px' }}>
                {[
                  ['YEAR', selectedMovie.Year],
                  ['IMDB', selectedMovie.imdbRating],
                  ['TIME', selectedMovie.Runtime],
                  ['GENRE', selectedMovie.Genre],
                ].map(([k, v]) => (
                  <div key={k} style={{ fontFamily: 'monospace', fontSize: '10px' }}>
                    <span style={{ color: 'rgba(0,255,136,0.45)' }}>{k}: </span>
                    <span style={{ color: '#cfffdf' }}>{v}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '12px', color: '#8ab09a', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                {selectedMovie.Plot}
              </p>
              <button
                type="button"
                onClick={() => setDetailsOpen(true)}
                className="scifi-btn"
                style={{ marginTop: '10px', display: 'block', width: '100%', textAlign: 'center' }}
              >
                FULL_DETAIL →
              </button>
            </div>
          </div>
        </div>
      )}

      <MovieDetailsModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        movie={selectedMovie}
      />
    </div>
  )
}
