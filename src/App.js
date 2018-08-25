import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {

  loadMap = () => {
    mapLoadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDBAVP-AGB5WzPHx4SdmJFDs5z1Thd3EQ4&callback=initMap')
  }


  initMap = () => {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    })
  }


  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    )
  }
}

function mapLoadScript (url) {
  let paramOne = window.document.getElementsByTagName ('script'),
      script = window.document.createElement('script')
  script.src = url
  script.async = true
  script.defer = true
  paramOne.parentNode.insertBefore(script, paramOne)
}

export default App;
