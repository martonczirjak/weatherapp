Vue.component('city-item', {
  props: ['city'],
  template: `
    <div class="card">
    <img src="./sunny.png" alt="city-weather">
    <div class="container">
      <h4><b>John Doe</b></h4> 
      <p>Architect & Engineer</p> 
    </div>
  </div>
    `
});

const app = new Vue({
  el: '#app',
  data: {
    info: '',
    localWeather: '',
    cityIds: apiConfig.cityIDs
  },
  async mounted() {
    this.info = await axios.get(
      `http://api.openweathermap.org/data/2.5/group?id=${
        this.concat
      }&units=metric&APPID=850970f506f7625ac19765050dbbc878`
    );
    this.getLocation();
  },
  computed: {
    concat: function() {
      return this.cityIds.join(',');
    }
  },
  methods: {
    getLocation: function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getLocalWeather);
      } else {
      }
    },
    getLocalWeather: async function(position) {
      this.localWeather = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${
          position.coords.latitude
        }&lon=${
          position.coords.longitude
        }&units=metric&APPID=850970f506f7625ac19765050dbbc878`
      );
    }
  }
});
