import React from 'react'
import { View, Text } from 'react-native'
import { Link } from "@react-navigation/web"

function Details() {
  return (
    <View style={{flex: 1}}>
      <Text>Details</Text>
      <Link 
      routeName="Home">
      Go to Home
    </Link>
    </View>
  )
}

export default Details