import React, { Component } from 'react'
import shaka from 'shaka-player'
import { Link } from "@react-navigation/web"
import { Dimensions, View } from 'react-native'

var manifestUri = '//storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';
const { width, height } = Dimensions.get('window')

const requestFullscreen = function (ele) {
	if (ele.requestFullscreen) {
		ele.requestFullscreen();
	} else if (ele.webkitRequestFullscreen) {
		ele.webkitRequestFullscreen();
	} else if (ele.mozRequestFullScreen) {
		ele.mozRequestFullScreen();
	} else if (ele.msRequestFullscreen) {
		ele.msRequestFullscreen();
	} else {
		console.log('Fullscreen API is not supported.');
	}
}
const enableFullScreen = function() {  
  const video = document.getElementById('vid');
  console.log("Video", video)
  requestFullscreen(video)
}

class Player extends Component {

	componentDidMount() {
		shaka.polyfill.installAll();
		if (shaka.Player.isBrowserSupported()) {
			this.initPlayer();
		} else {
			console.error('Browser not supported!');
		}
	}

	initPlayer(){
    var player = new shaka.Player(this.refs.video);
    
    player.addEventListener('error', this.onErrorEvent);
    enableFullScreen()

		player.load(manifestUri).then(function() {
			console.log('The video has now been loaded!');
		}).catch(this.onError); 
	}
	
	onErrorEvent(event) {
		this.onError(event.detail);
	}
	
	onError(error) {
		console.error('Error code', error.code, 'object', error);
  }
  
	render() {
   		return (
	    	<View>
		    	<Link 
            routeName="Home">
            Go to Home
          </Link>
		    	<video ref="video"
            id="vid"
            width={width}
            height={height}
            poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
            controls autoPlay>
	       		</video>
	    	</View>
	    );
  	}
}

export default Player;