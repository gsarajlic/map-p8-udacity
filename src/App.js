import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

componentDidMount() {
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




  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    );
  }
}

export default App;
