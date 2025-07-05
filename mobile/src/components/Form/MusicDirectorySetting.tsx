import React, { useState } from 'react';
import { View, Text, TextInput, Button, Platform } from 'react-native';
import RNFS from 'react-native-fs';
import { setMusicDirectory } from '../../utils/musicDirectory';

const defaultDir = Platform.OS === 'android'
  ? '/storage/emulated/0/Music'
  : RNFS.DocumentDirectoryPath;

export default function MusicDirectorySetting({ onSave }: { onSave?: (dir: string) => void }) {
  const [directory, setDirectory] = useState<string>(defaultDir);
  const [status, setStatus] = useState<string>('');

  const handleSave = () => {
    setMusicDirectory(directory);
    setStatus('Saved!');
    onSave?.(directory);
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ marginBottom: 8 }}>Music Download Directory</Text>
      <TextInput
        value={directory}
        onChangeText={setDirectory}
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />
      <Button title="Save" onPress={handleSave} />
      {status ? <Text style={{ color: 'green', marginTop: 8 }}>{status}</Text> : null}
      <Text style={{ marginTop: 16, color: '#888' }}>
        By default, downloads go to the Android Music folder. You can change it here.
      </Text>
    </View>
  );
}
