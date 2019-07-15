import React, { useState } from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import { Link } from "@react-navigation/web"
import { useNavigationParam } from 'react-navigation-hooks'
import Player from './Player'

const { width } = Dimensions.get('window')


function Details() {
  const movie = useNavigationParam('movie')
  const baseImageUrl = 'https://image.tmdb.org/t/p/w342'

  const [player, setPlayer] = useState(false)

  if(player) {
    return (
      <Player />
    )
  }

  console.log("movie", movie)
  return (
    <View style={{flex: 1}}>
      <Link 
        routeName="Home">
        Go to Home
      </Link>
      <View style={{ flex: 1, flexDirection: 'row'}}>
        <View style={{ paddingRight: 200}}>
          <View style={{ paddingTop: 50 }}>
            <Text>Title</Text>
            <Text>{movie.original_title}</Text>
          </View>
          <View style={{ paddingTop: 50, width: width /2 }}>
            <Text>Description</Text>
            <Text>{movie.overview}</Text>
          </View>
        </View>
        <Image source={{ uri: baseImageUrl + movie.poster_path}} style={{ height: 250, width: 200 }}/>
      </View>
      <View>
        <TouchableOpacity
          style={styles.buttonStyle} 
          onPress={() => {
            setPlayer(true)
          }}>
          <Text style={styles.textStyle}>Play</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textStyle: {
  fontSize:20,
	color: '#ffffff',
  },
  
  buttonStyle: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: 30,
  width: 200,
	padding:10,
	backgroundColor: '#202646',
	borderRadius: 5
  }
})

export default Details