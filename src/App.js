import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

componentDidMount() {
  this.getPlaces()
  this.initMap()
}

// Initialize and add the map which has been centered on Zagreb, Croatia
initMap = () => {
  // The location of Zagreb,Croatia
  const zagreb = { lat: 45.815011, lng: 15.981919  };
  // The map, centered at Zagreb
  const map = new window.google.maps.Map(
    document.getElementById('map'), 
      { zoom: 12, center: zagreb }
    );
  // The marker, positioned at Zagreb
 var marker = new window.google.maps.Marker({ position: zagreb, map: map });
}


getPlaces = () => {
  const endPoint = 'https://api.foursquare.com/v2/venues/explore?';
  const parametars = { 
    client_id: 'QVUQGABFGZPTCCXPCINNEM3RXJIJBZJRXMFEU2WIH0FRM2GU',
    client_secret: 'PMWYZFZXRN2ST1DE51B14PK1D4IDWSMIUHLIJWLJZJK2IVB2',
    query: 'outdoors',
    near: 'Zagreb',
    v:'20182508'   
   }

  axios.get(endPoint + new URLSearchParams(parametars))
    .then(response => {
      console.log(response.data.response.groups[0].items);
    }) 
    .catch(error => {
      console.log('error' + error)
    })
}


  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    );
  }
}

export default App;
