import RNFS from 'react-native-fs';
import { getMusicDirectory } from './musicDirectory';

export async function cacheAudioFile(url: string, fileName: string): Promise<string> {
  const dir = await getMusicDirectory();
  const localPath = `${dir}/${fileName}`;
  try {
    const exists = await RNFS.exists(localPath);
    if (!exists) {
      await RNFS.downloadFile({ fromUrl: url, toFile: localPath }).promise;
    }
    return localPath;
  } catch (e) {
    throw new Error('Failed to cache audio: ' + e);
  }
}
