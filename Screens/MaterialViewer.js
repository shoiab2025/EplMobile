import { View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import {WebView} from 'react-native-webview';

const MaterialViewer = () => {
  const route = useRoute();
  const item = route.params.item; 

  return (
    <View style={{ flex: 1 }}>
      <WebView 
        source={{ uri: item.fileUrl }} 
        style={{ flex: 1 }} 
      />
    </View>
  );
};

export default MaterialViewer;
