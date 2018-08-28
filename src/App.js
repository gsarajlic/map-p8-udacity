import React, {
  Component
} from 'react';
import './App.css';
import axios from 'axios';
import _ from 'lodash';
import SightList from './components/SightList';
import SightFilter from './components/SightFilter';

class App extends Component {

  state = {
    query: '',
    allSights: [],
    sights: [],
    markersDict: {}
  };

  componentDidMount() {
    this.getData();
  }

  handleQueryChange = (e) => {

    const searchSubstring = e.target.value;

    const filteredSights = _.filter(this.state.allSights, (item) => {
      const sightName = item.venue.name.toLowerCase();;
      return sightName.includes(searchSubstring.toLowerCase());
    });

    this.setState({
      query: searchSubstring,
      sights: filteredSights
    });
  }

  handleSightClick = (e) => {

    const sightName = e.target.value;
    const marker = this.state.markersDict[sightName];
    
    window.google.maps.event.trigger(marker, 'click', {});

  }

  loadMap = () => {
    mapLoadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDBAVP-AGB5WzPHx4SdmJFDs5z1Thd3EQ4&callback=initMap')
    window.initMap = this.initMap;
  }


  getData = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
    const parameters = {
      client_id: 'QVUQGABFGZPTCCXPCINNEM3RXJIJBZJRXMFEU2WIH0FRM2GU',
      client_secret: 'PMWYZFZXRN2ST1DE51B14PK1D4IDWSMIUHLIJWLJZJK2IVB2',
      query: 'sights',
      near: 'Zagreb',
      v: '20182508'
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        const allSights = response.data.response.groups[0].items;
        this.setState({
          allSights: allSights,
          sights: allSights
        }, this.loadMap());
      })
      .catch(err => alert(err));
  }

  sightsFilter = () => {
    this.setState({
      sights: _.filter({
        'venue.name': this.state.query
      })
    })
  }


  initMap = () => {

    const zagreb = {
      lat: 45.815011,
      lng: 15.981919
    }
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: zagreb,
      zoom: 14
    });

    this.setState({map: map});

    // Create An InfoWindow
    let infowindow = new window.google.maps.InfoWindow()

    this.state.sights.forEach(sight => {

      let infoWinText = `${sight.venue.name}`

      // marker taken from google maps platform
      let marker = new window.google.maps.Marker({
        position: {
          lat: sight.venue.location.lat,
          lng: sight.venue.location.lng
        },
        map: map,
        title: sight.venue.name
        //animation: window.google.maps.Animation.DROP,
      });

      const markers = this.state.markersDict;
      markers[sight.venue.name] = marker;
      this.setState({markersDict: markers});

      // event listener for click on markers
      marker.addListener('click', function () {
        infowindow.setContent(infoWinText)
        infowindow.open(map, marker)
      })

    })
  }


  render() {
    return (
      <div id="App">
        <header className="App-header">
          <h1 className="App-title">Udacity P8 Google maps API</h1>
        </header>
        <main id="main">
          <div id="map" role="application">
          </div>
        </main>
        <aside id="sidebar">
          <SightFilter onQueryChange={this.handleQueryChange} />
          <SightList sights={this.state.sights} onSightClick={this.handleSightClick} />
        </aside>
      </div>
    )
  }
}

function mapLoadScript(url) {
  let index = window.document.getElementsByTagName('script')[0]
  let script = window.document.createElement('script')
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;