import { View, ActivityIndicator, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import WebView from "react-native-webview";
import Video from "react-native-video";

const MaterialViewer = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const item = route.params?.item;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
console.log(item);

  useEffect(() => {
    if (item?.content) {
      navigation.setOptions({ headerTitle: item.content.charAt(0).toUpperCase() + item.content.slice(1) });
    }
  }, [navigation, item?.content]);

  if (!item || !item.fileUrl) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>No content available</Text>
      </View>
    );
  }

  const fileUrl = item.fileUrl;
  const contentType = item.content_type?.toLowerCase() || "";

  return (
    <View style={{ flex: 1 }}>
      {/* Show loading overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {/* Show error message if content fails to load */}
      {error ? (
        <View style={styles.centeredContainer}>
          <Text style={styles.errorText}>Failed to load content</Text>
        </View>
      ) : contentType === "pdf" ? (
        <WebView
          source={{ uri: fileUrl }}
          style={{ flex: 1 }}
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
      ) : contentType.includes("video") ? (
        <Video
          source={{ uri: fileUrl }}
          style={{ flex: 1 }}
          controls
          resizeMode="contain"
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
      ) : (
        <WebView
          source={{ uri: fileUrl }}
          style={{ flex: 1 }}
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
      )}
    </View>
  );
};

const styles = {
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
    zIndex: 1,
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
};

export default MaterialViewer;
