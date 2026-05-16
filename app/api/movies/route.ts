import { NextRequest, NextResponse } from 'next/server'

const apiKey = process.env.OMDB_API_KEY

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)

    const search = searchParams.get('search')
    const year = searchParams.get('year')
    const id = searchParams.get('id')

    let url = ''

    if (id) {
        url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`
    } else {
        url =
            `https://www.omdbapi.com/?apikey=${apiKey}&s=${search}` +
            (year ? `&y=${year}` : '')
    }

    const response = await fetch(url)
    const data = await response.json()

    return NextResponse.json(data)
}