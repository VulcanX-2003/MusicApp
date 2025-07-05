// src/api/piped.ts
// API functions for browsing and streaming YouTube Music via Piped API
// See: https://pipedapi.kavin.rocks/

import axios from 'axios';

const BASE_URL = 'https://pipedapi.kavin.rocks';

export async function searchMusic(query: string) {
  const res = await axios.get(`${BASE_URL}/search`, {
    params: { q: query },
  });
  return res.data;
}

export async function getStreamUrl(videoId: string) {
  const res = await axios.get(`${BASE_URL}/streams/${videoId}`);
  // Returns stream URLs for audio/video
  return res.data;
}

export async function getTrackInfo(videoId: string) {
  const res = await axios.get(`${BASE_URL}/videos/${videoId}`);
  return res.data;
}

// Add more functions as needed (e.g., for playlists, channels, etc.)
