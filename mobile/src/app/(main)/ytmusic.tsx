import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import { searchMusic, getStreamUrl } from '../../api/piped';
import { cacheAudioFile } from '../../utils/ytmusicCache';
import TrackPlayer from '@weights-ai/react-native-track-player';

export default function YTMusicScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await searchMusic(query);
      setResults(data.music || []);
    } catch (e) {
      setResults([]);
    }
    setLoading(false);
  };

  const handlePlay = async (videoId: string, title: string, artist: string) => {
    const streams = await getStreamUrl(videoId);
    const audioUrl = streams.audioStreams?.[0]?.url;
    if (audioUrl) {
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: videoId,
        url: audioUrl,
        title: title,
        artist: artist || 'Unknown',
        artwork: streams.thumbnailUrl || undefined,
      });
      await TrackPlayer.play();
    }
  };

  const handleDownload = async (videoId: string, title: string) => {
    setDownloading(videoId);
    const streams = await getStreamUrl(videoId);
    const audioUrl = streams.audioStreams?.[0]?.url;
    if (audioUrl) {
      try {
        const fileName = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${videoId}.mp3`;
        const localPath = await cacheAudioFile(audioUrl, fileName);
        alert('Downloaded to: ' + localPath);
      } catch (e) {
        alert('Download failed: ' + e);
      }
    }
    setDownloading(null);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        placeholder="Search YT Music..."
        value={query}
        onChangeText={setQuery}
        style={{ borderWidth: 1, marginBottom: 8, padding: 8 }}
      />
      <Button title="Search" onPress={handleSearch} disabled={loading} />
      <FlatList
        data={results}
        keyExtractor={item => item.videoId}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePlay(item.videoId, item.title, item.artist)} onLongPress={() => handleDownload(item.videoId, item.title)}>
            <Text style={{ padding: 8 }}>{item.title} - {item.artist} {downloading === item.videoId ? '(Downloading...)' : ''}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
