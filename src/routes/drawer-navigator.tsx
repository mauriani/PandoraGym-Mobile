import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer'
import { Dashboard } from '@screens/Dashboard'

// type Props = NativeStackScreenProps<RootStackParamList, 'DrawerNavigator'>

const Drawer = createDrawerNavigator()

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      useLegacyImplementation={false}
      initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Dashboard}
        options={{
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}
