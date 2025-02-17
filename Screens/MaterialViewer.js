import { View, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import WebView from 'react-native-webview';

const MaterialViewer = () => {
  const route = useRoute();
  const item = route.params?.item;
  const [loading, setLoading] = useState(true);

  if (!item || !item.fileUrl) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Safe content type check
  // const source =
  //   item?.contentType?.toLowerCase() === 'pdf'
  //     ? `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(item.fileUrl)}/preview`
  //     : item.fileUrl;

  return (
    <View style={{ flex: 1 }}>
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.8)', // Semi-transparent background
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <WebView
        source={{ uri: item.fileUrl }}
        style={{ flex: 1 }}
        onLoadEnd={() => setLoading(false)} // Ensure loading state updates correctly
        onError={() => setLoading(false)}
      />
    </View>
  );
};

export default MaterialViewer;
