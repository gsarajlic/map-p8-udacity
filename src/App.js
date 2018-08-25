import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    sights: []
  }

  componentDidMount() {
    this.getData()
    this.loadMap()
  }

  loadMap = () => {
    mapLoadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDBAVP-AGB5WzPHx4SdmJFDs5z1Thd3EQ4&callback=initMap')
    window.initMap = this.initMap
  }


  getData = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
    const parameters = {
      client_id: 'QVUQGABFGZPTCCXPCINNEM3RXJIJBZJRXMFEU2WIH0FRM2GU',
      client_secret: 'PMWYZFZXRN2ST1DE51B14PK1D4IDWSMIUHLIJWLJZJK2IVB2',
      query: 'sights',
      near: 'Zagreb',
      v:'20182508'
    }

     axios.get (endPoint + new URLSearchParams(parameters))
     .then(response => {
       this.setState({
         sights: response.data.response.groups[0].items
       })
     })
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
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
  let index = window.document.getElementsByTagName ('script')[0]
  let script = window.document.createElement('script')
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
