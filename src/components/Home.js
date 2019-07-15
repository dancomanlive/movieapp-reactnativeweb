import React, { useState, useEffect, Fragment, useRef } from 'react'
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'

function Home() {
  const { navigate } = useNavigation()
  const [loading, isLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [tvShows, setTvShows] = useState([])
  const [family, setFamily] = useState([])
  const [documentary, setDocumentary] = useState([])
  const [ search, setSearch] = useState(false)
  const [ query, setQuery ] = useState('')
  const [ searchResults, setSearchResults ] = useState([])
  const baseImageUrl = 'https://image.tmdb.org/t/p/w342'
  const apiKey = '3d47742f8ebe5b82bd18e0b46f76baf9'
  
  useEffect( () => {
    (async () => {
      try {
        const baseURL = 'http://api.themoviedb.org/3/'
        const resultMovie = await fetch(`${baseURL}movie/popular?api_key=${apiKey}&language=en-US&page=1?`)
        const resultTv = await fetch(`${baseURL}tv/popular?api_key=${apiKey}&language=en-US&page=1?`)
        const familyMovies = await fetch(`${baseURL}discover/movie?api_key=${apiKey}&language=en-US&with_genres=10751`)
        const documentaryTv = await fetch(`${baseURL}discover/movie?api_key=${apiKey}&language=en-US&with_genres=99`)

        const movies = await resultMovie.json();
        // console.log("movies", movies)
        setMovies(movies.results)

        const tvShows = await resultTv.json();
        // console.log("tvShows", tvShows)
        setTvShows(tvShows.results)

        const family = await familyMovies.json();
        // console.log("family", family)
        setFamily(family.results)

        const documentary = await documentaryTv.json();
        // console.log("documentary", documentary)
        setDocumentary(documentary.results)

        isLoading(false)

      } catch (e) {
        console.error(e);
      }
    })()
  }, [])

  if(loading) {
    return (
      <View style={{ flex: 1, top: 300}}>
        <ActivityIndicator size='large'/>
      </View>
    )
  }

  const handleSearch = async () => {
    isLoading(true)
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`)
      const res = await response.json()
      console.log("res", res)
      setSearchResults(res.results)
      isLoading(false)
    } catch (error) {
      console.log("error", error)
    }
  }

  if(search) {
    console.log("renderSearch")
    return (
      <View style={{ flex: 1 }}>
        <Text onPress={() => setSearch(false)} style={{ paddingTop: 50 }}>Close search</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 50 }}>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => setQuery(text)}
            value={query}
          />
          <Text style={{ paddingLeft: 20 }} onPress={() => handleSearch()}>Search</Text>
        </View>
        <View style = {{ flex:1, top: 100 }}>
        <Text>Search Results</Text>
          <ScrollView horizontal = { true } showsHorizontalScrollIndicator = { false }>
             {searchResults && searchResults.map(movie => {
               return (
                <TouchableOpacity onPress={() => navigate('Details', { movie })} key={movie.id}>
                  <Image source={{ uri: baseImageUrl + movie.poster_path}} style={{ height: 250, width: 200 }}/>
                </TouchableOpacity>
               )
             })}
          </ScrollView>
       </View>
      </View>
    )
  }

  console.log("renderHome")
  return(
    <View style = {{flex: 1 } }>
      <View style={{ paddingTop: 30, paddingBottom: 30 }}>
        <Text style={{ fontSize: 30}} onPress={() => setSearch(true)}>Search</Text>
      </View>
       <View style = {{ flex:1 }}>
        <Text>Movies</Text>
          <ScrollView horizontal = { true } showsHorizontalScrollIndicator = { false }>
             {movies.map(movie => {
               return (
                <TouchableOpacity onPress={() => navigate('Details', { movie })} key={movie.id}>
                  <Image source={{ uri: baseImageUrl + movie.poster_path}} style={{ height: 250, width: 200 }}/>
                </TouchableOpacity>
               )
             })}
          </ScrollView>
       </View>
       <View style = {{ flex: 1, paddingTop: 50 }}>
        <Text>TV Shows</Text>
          <ScrollView horizontal = { true } showsHorizontalScrollIndicator = { false }>
          {tvShows.map(tvShow => {
               return (
                <TouchableOpacity onPress={() => navigate('Details', { tvShow })} key={tvShow.id}>
                  <Image source={{ uri: baseImageUrl + tvShow.poster_path}} style={{ height: 250, width: 200 }}/>
                </TouchableOpacity>
               )
             })}
          </ScrollView>
       </View>
       <View style = {{ flex: 1, paddingTop: 50 }}>
        <Text>Family</Text>
          <ScrollView horizontal = { true } showsHorizontalScrollIndicator = { false }>
          {family.map(fam => {
               return (
                <TouchableOpacity onPress={() => navigate('Details', { fam })} key={fam.id}>
                  <Image source={{ uri: baseImageUrl + fam.poster_path}} style={{ height: 250, width: 200 }}/>
                </TouchableOpacity>
               )
             })}
          </ScrollView>
       </View>
       <View style = {{ flex: 1, paddingTop: 50 }}>
        <Text>Documentary</Text>
          <ScrollView horizontal = { true } showsHorizontalScrollIndicator = { false }>
          {documentary.map(doc => {
               return (
                <TouchableOpacity onPress={() => navigate('Details', { doc })} key={doc.id}>
                  <Image source={{ uri: baseImageUrl + doc.poster_path}} style={{ height: 250, width: 200 }}/>
                </TouchableOpacity>
               )
             })}
          </ScrollView>
       </View>
    </View>
 );
}


export default Home