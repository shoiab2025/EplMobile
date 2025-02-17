import React, { useState, useCallback } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

function TabViewExample({ screens = [] }) {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const renderScene = SceneMap(
    screens.reduce((acc, { key, component: Component }) => {
      acc[key] = () => <Component />;
      return acc;
    }, {})
  );

  const handleIndexChange = useCallback((newIndex) => {
    setIndex(newIndex);
  }, []);

  return (
    <View style={{ flex: 1 }}> 
      <TabView
        navigationState={{ index, routes: screens }}
        renderScene={renderScene}
        onIndexChange={handleIndexChange}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#0147ab' }}
            inactiveColor='#000'
            activeColor='#0147ab'
            style={{ backgroundColor: '#F0F4F8' }}
          />
        )}
      />
    </View>
  );
}

export default TabViewExample;
