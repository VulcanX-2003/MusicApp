import AsyncStorage from '@react-native-async-storage/async-storage';

const MUSIC_DIR_KEY = 'music_download_directory';

export async function setMusicDirectory(dir: string) {
  await AsyncStorage.setItem(MUSIC_DIR_KEY, dir);
}

export async function getMusicDirectory(): Promise<string> {
  const dir = await AsyncStorage.getItem(MUSIC_DIR_KEY);
  if (dir) return dir;
  // Default to Android Music folder
  return '/storage/emulated/0/Music';
}
