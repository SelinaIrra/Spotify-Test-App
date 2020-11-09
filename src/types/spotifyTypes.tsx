/* eslint-disable camelcase */
export interface Image {
    url: string,
    height?: number,
    width?: number,
}

interface ExternalURL {
    spotify: string
}

export interface User {
    display_name: string,
    previewUrl: string,
}

export interface SimpleArtist {
    id: string,
    name: string,
}

export interface Artist extends SimpleArtist {
    genres: string[],
    images: Image[]
}

export interface Album {
    images: Image[]
}

export interface SimpleTrack {
    artists: SimpleArtist[],
    preview_url: string | null,
    name: string,
    id: string,
    external_urls: ExternalURL,
}

export interface Track extends SimpleTrack {
    album: Album,
}
