Vue.component('header-local-weather', {
  props: ['city'],
  template: `
    <div class="header-local-weather">
      <div class="header-local-weather-card">
        <div class="header-local-weather-city">{{city.data.name}}</div>
        <div class="header-local-weather-temp">{{city.data.main.temp}} °C</div>
      </div>
    </div>
  `
});

// header template
Vue.component('header-template', {
  props: ['local'],
  template: ` 
    <div class="hero-image">
      <header-local-weather v-if="local" v-bind:city="local"></header-local-weather>
      <div class="hero-text">
          <h1>WeatherLand</h1>
      </div>
    </div>
    `
});

// header component
const header = new Vue({
  el: '#header-template',
  data: {
    localWeather: ''
  },
  methods: {
    getLocation: function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getLocalWeather); // get current location
      } else {
      }
    },
    // get local weather data
    getLocalWeather: async function(position) {
      const url = `${apiConfig.apiURL}weather?lat=${
        position.coords.latitude
      }&lon=${position.coords.longitude}&units=metric&APPID=${
        apiConfig.apiKey
      }`;
      this.localWeather = await axios.get(url);
    }
  },
  //local weather api call
  mounted: function() {
    this.getLocation();
  }
});
