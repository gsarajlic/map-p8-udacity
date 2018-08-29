import React, {
  Component
} from 'react';
import './App.css';
import axios from 'axios';
import _ from 'lodash';
import SightList from './components/SightList';
import SightFilter from './components/SightFilter';

function toggleBounce(marker, markersDict) {

  const keys = Object.keys(markersDict);

  keys.forEach((name) => {
    let marker = markersDict[name];
    marker.setAnimation(null);
  });
  
  marker.setAnimation(window.google.maps.Animation.BOUNCE);
}

class App extends Component {

  state = {
    query: '',
    allSights: [],
    sights: [],
    markersDict: {}
  };

  componentDidMount() {
    window.gm_authFailure = this.gm_authFailure;
    this.getData();
  }

  gm_authFailure() {
    window.alert("Google Maps error! Please try again.")
  }

  handleQueryChange = (e) => {

    const searchSubstring = e.target.value;

    const filteredSights = _.filter(this.state.allSights, (item) => {
      const sightName = item.venue.name.toLowerCase();;
      return sightName.includes(searchSubstring.toLowerCase());
    });

    const markersDict = this.state.markersDict;

    const keys = Object.keys(markersDict);

    keys.forEach((name) => {
      let marker = markersDict[name];
      const visible = _.findIndex(filteredSights, (s) => { return s.venue.name === name}) > -1;

      marker.setVisible(visible);
    });

    this.setState({
      query: searchSubstring,
      sights: filteredSights
    });
  }

  handleSightClick = (e) => {

    const sightName = e.target.value;
    const marker = this.state.markersDict[sightName];
    //const markersDict = this.state.markersDict;

    window.google.maps.event.trigger(marker, 'click', {});
  }

  loadMap = () => {
    mapLoadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDBAVP-AGB5WzPHx4SdmJFDs5z1Thd3EQ4&callback=initMap');
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

      let infoWinText = `<div className="infoWindow" tabIndex={0}><h4 className= infoWinTitle>${sight.venue.name}</h4>
                         <p className="infoWinAddress"<b>Adress :</b> ${sight.venue.location.formattedAddress} </p></div>`

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
        toggleBounce(marker, markers);
        infowindow.setContent(infoWinText)
        infowindow.open(map, marker)
      })

    })
  }


  render() {
    return (
      <div id="App">
        <header className="App-header">
          <h1 className="App-title" tabIndex={0}>UDACITY P8 NEIGHBOORHOOD MAP</h1>
        </header>
        <main id="main">
          <div id="map" role="application">
          </div>
        </main>
        <aside id="sidebar">
            <SightFilter onQueryChange={this.handleQueryChange} />
            <div id="sights-list" aria-label="list of sights in Zagreb" tabIndex={0}>
              <SightList sights={this.state.sights} onSightClick={this.handleSightClick} />
            </div>
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
  script.onerror = function () { window.alert("Google Maps API faile to load data!") }
  index.parentNode.insertBefore(script, index)
}

export default App;