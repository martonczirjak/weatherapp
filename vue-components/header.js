Vue.component('header-local-weather', {
  props: ['city'],
  template: `
    <div class="header-card">
      <div class="">{{city.main.temp}}</div>
    </div>
  `
});

// header template
Vue.component('header-template', {
  template: ` 
    <div class="hero-image">
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
        navigator.geolocation.getCurrentPosition(this.getLocalWeather.coords); // get current location
      } else {
      }
    },
    // get local weather data
    getLocalWeather: async function(position) {
      const url = `${apiConfig.apiURL}weather?lat=${position.latitude}&lon=${
        position.longitude
      }&units=metric&APPID=${apiConfig.apiKey}`;
      this.localWeather = await axios.get(url);
      console.log(this.localWeather);
    }
  }
});
