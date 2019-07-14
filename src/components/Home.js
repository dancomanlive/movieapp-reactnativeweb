import React from 'react'
import { Button, View, Text } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import { Link } from "@react-navigation/web"

function Home() {
  const { navigate } = useNavigation()
  return (
    <View style={{ flex: 1}}>
      <Text>Home</Text>
      <Link 
      routeName="Details">
      Go to Details
    </Link>
    <Button
      onPress={() => navigate('Details')}
      title="Button"
      color="#841584"
    />
    </View>
  )
}

export default Home