import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer' 
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import HomeScreen from '../screens/Home/HomeScreen';
import SplashScreen from '../screens/Splash/SplashScreen';
import LoginScreen from '../screens/login/LogInScreen';
import SignUpScreen from '../screens/register/SignUpScreen';
import InfoScreen from  '../screens/Info/InfoScreen';
import ChangeInfoScreen from  '../screens/ChangeInfo/ChangeInfoScreen';
import SystemLogScreen from  '../screens/SystemLog/SystemLogScreen';
import SearchScreen from  '../screens/Search/SearchScreen';
import FeatureScreen from  '../screens/Feature/FeatureScreen';
import DeviceListScreen from  '../screens/DeviceList/DeviceListScreen';
import DevicesScreen from  '../screens/Devices/DevicesScreen';
import RoomsScreen from  '../screens/Rooms/RoomsScreen';
import ConditionsScreen from  '../screens/Conditions/ConditionsScreen';
import AnalysisScreen from  '../screens/Analysis/AnalysisScreen';
import VoiceScreen from  '../screens/Voice/VoiceScreen';
 const Stack = createStackNavigator();
function MainNavigator() {
  return(
    <Stack.Navigator
      screenOptions={{
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            flex: 1,
          }
      }}
    >
      <Stack.Screen name='onBoard' component={SplashScreen}
      options={{ headerShown: false }}/> 
      <Stack.Screen name='Login' component={LoginScreen}
      options={{ headerShown: false }}/> 
      <Stack.Screen name='SignUp' component={SignUpScreen}
      options={{ headerShown: false }}/> 
      <Stack.Screen name='Home' component={HomeScreen} 
          options={{
            headerShown: true,
            headerTitle: '',
          }}
      />

      <Stack.Screen name='SystemLog' component={SystemLogScreen}
        options={{
          headerShown: false,
          headerTitle: '',
        }}
      />

      <Stack.Screen name='Info' component={InfoScreen}
        options={{
          headerShown: false,
          headerTitle: '',
        }}
      />

      <Stack.Screen name='ChangeInfo' component={ChangeInfoScreen}
        options={{
          headerShown: false,
          headerTitle: '',
        }}
      />

      <Stack.Screen name='Discovery' component={SearchScreen}
        options={{
          headerShown: false,
          headerTitle: '',
        }}
      />

      <Stack.Screen name='Function' component={FeatureScreen}
        options={{
          headerShown: false,
          headerTitle: '',
        }}
      />

      <Stack.Screen name='Devices' component={DevicesScreen}
        options={{
          headerShown: false,
          headerTitle: '',
        }}
      />

      <Stack.Screen name='DeviceList' component={DeviceListScreen}
        options={{
          headerShown: false,
          headerTitle: '',
        }}
      />

      <Stack.Screen name='Rooms' component={RoomsScreen}
        options={{
          headerShown: false,
          headerTitle: '',
        }}
      />

      <Stack.Screen name='Conditions' component={ConditionsScreen}
        options={{
          headerShown: false,
          headerTitle: '',
        }}
      />

      <Stack.Screen name='Analysis' component={AnalysisScreen}
        options={{
          headerShown: false,
          headerTitle: '',
        }}
      />

      <Stack.Screen name='Voice' component={VoiceScreen}
        options={{
          headerShown: false,
          headerTitle: '',
        }}
      />

</Stack.Navigator>
  )
} 

//       <Stack.Screen name='onBoard' component={SplashScreen}/>  đặt đầu tiên nên gọi MainNavigator thì onBoard xuất hiện đầu

 const Drawer = createDrawerNavigator();

function DrawerStack() {
  return(
    <Drawer.Navigator
      drawerPosition='left'
      initialRouteName='Main'
      drawerStyle={{
        width: 250
      }}
      screenOptions={{headerShown: false}}
      drawerContent={({navigation})=> <DrawerContainer navigation={navigation}/>}
    >
      <Drawer.Screen name='Main' component={MainNavigator} />
    </Drawer.Navigator>
  )
} 

 export default function AppContainer() {
  return(
    <NavigationContainer>
      <DrawerStack/>
    </NavigationContainer>
  )
} 
 

console.disableYellowBox = true;