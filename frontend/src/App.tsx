import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import WebViewScreen from './screens/WebView';
import SurveyScreen from './screens/Survey';
import RecommendationScreen from './screens/Recommendation';
import Collection from './screens/Collection';
import Camera from './screens/Camera';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Camera">
        <Stack.Screen
          name="WebView"
          component={WebViewScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Survey"
          component={SurveyScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Recommendation"
          component={RecommendationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Collection"
          component={Collection}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
