import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Svg, { Path } from 'react-native-svg';
import HomeScreen from './HomeScreen';
import { useAuth } from './AuthContext';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import { app_config } from '../assets/app_config';
import { colors } from '../assets/styles/colors';
import LibraryScreen from './LibraryScreen';
import styles from '../assets/styles/main_style';
import QuizScreen from './QuizScreen';
import PerfomanceScreen from './PerfomanceScreen';
import LeaderBoard from './LeaderBoard';
import LeaderBoardScreen from './LeaderBoard';
import ProfileScreen from './ProfileScreen';
import GroupScreen from './GroupScreen';
import TestScreen from './TestScreen';
import style from '../assets/styles/main_style';
import MaterialViewer from './MaterialViewer';
import Settings from './Setting';
import Announcement from './Announcment';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
    const styles = style();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TestScreen" component={TestScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Announcement" component={Announcement} options={{ headerShown: true }} />
            <Stack.Screen name="Material" component={MaterialViewer} options={{ headerShown: true, headerTitleStyle: [styles.home_banner_txt, { color: colors.primary, }], headerStyle: { backgroundColor: colors.white } }} />
        </Stack.Navigator>
    );
};

const LibraryStack = () => {
    const styles = style();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Library" component={LibraryScreen} options={{ headerShown: false, headerTitleStyle: [styles.home_banner_txt, { color: colors.primary, }], headerTransparent: true }} />
            <Stack.Screen name="Announcement" component={Announcement} options={{ headerShown: true }} />
            <Stack.Screen name="Material" component={MaterialViewer} options={{ headerShown: true, headerTitleStyle: [styles.home_banner_txt, { color: colors.primary, }], headerStyle: { backgroundColor: colors.white } }} />
        </Stack.Navigator>
    );
}

const QuizStack = () => {
    const styles = style();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Quizzes" component={QuizScreen} options={{ headerShown: false, headerTitleStyle: [styles.home_banner_txt, { color: colors.primary, }], headerTransparent: true, headerStyle: { backgroundColor: colors.white } }} />
            <Stack.Screen name="TestScreen" component={TestScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Announcement" component={Announcement} options={{ headerShown: true }} />

        </Stack.Navigator>
    );
}

const PerfomanceStack = () => {
    const styles = style();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Perfomances" component={PerfomanceScreen} options={{ headerShown: false, headerTitleStyle: [styles.home_banner_txt, { color: colors.primary, }], headerTransparent: true, }} />
            <Stack.Screen name="TestScreen" component={TestScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Announcement" component={Announcement} options={{ headerShown: true }} />
            <Stack.Screen name="LeaderBoard" component={LeaderBoardScreen} options={{ headerShown: false, headerTitleStyle: [styles.home_banner_txt, { color: colors.primary, }], headerTransparent: true, }} />
        </Stack.Navigator>
    );
}


const ProfileStack = () => {
    const styles = style();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false, headerTitleStyle: [styles.home_banner_txt, { color: colors.primary, }], headerTransparent: true, }} />
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: true, headerTitleStyle: [styles.home_banner_txt, { color: colors.primary, }], headerTransparent: true, }} />
            <Stack.Screen name="Announcement" component={Announcement} options={{ headerShown: true }} />
        </Stack.Navigator>
    );
}
const AuthStack = () => {
    const styles = style();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Group" component={GroupScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
};

const MainTabs = () => {
    const styles = style();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let fillColor = focused ? '#FEEFA0' : '#ffffff';
                    return app_config.svgs[route.name]?.(fillColor);
                },
                tabBarActiveTintColor: '#FEEFA0',
                tabBarInactiveTintColor: '#fff',
                headerShown: false,
                tabBarLabelStyle: { fontSize: 12 },
                tabBarStyle: {
                    height: 60,
                    backgroundColor: colors.TabBarColor,
                    alignContent: 'center',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',

                },
                tabBarItemStyle: {
                    gap: 0,
                    paddingTop: 5,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }
            })}
        >
            <Tab.Screen name="Test" component={HomeStack} />
            <Tab.Screen name="Library" component={LibraryStack} />
            <Tab.Screen name="Quizzes" component={QuizStack} />
            <Tab.Screen name="Perfomance" component={PerfomanceStack} />
            <Tab.Screen name="Profile" component={ProfileStack} />
        </Tab.Navigator>
    );
};

const RootNavigator = () => {
    const { userLoggedIn } = useAuth();

    return (
        <>
            {userLoggedIn ? <MainTabs /> : <AuthStack />}
        </>
    );
};

export default RootNavigator;
