// arrow keys template
// prop: arrow direction
Vue.component('arrow-key', {
  props: ['direction'],
  template: `
  <div  v-bind:class="{prev : direction ==='left', next: direction === 'right'}" >
  <div class="arrow">
  <i class="material-icons" v-on:click="$emit('slide')">
  keyboard_arrow_{{direction}}
  </i>
  </div>
</div>
  `
});

// card item template
Vue.component('city-item', {
  props: ['city'],
  template: `
      <div class="card" v-on:click="$parent.setCity(city)">
        <div class="card-header">
          <img class="card-avatar" src="./assets/images/sunny.png" alt="city-weather">
          <p class="card-title"> {{city.main.temp}} °C</p>
        </div>
          <div class="card-body">
          <h4 class="card-title">{{city.name}}</h4>
          <div class="card-group">
            <div class="card-row">
              <img src="./assets/images/Thermometer.svg"></img>
              <p class="minmax"> {{city.main.temp_min}}</p>
            </div>
            <div class="card-row">
              <img src="./assets/images/Thermometer-100.svg"></img>
              <p class="minmax"> {{city.main.temp_max}}</p>
            </div>
          </div>
        </div>
      </div>
      `
});

// city slider component
const citySlider = new Vue({
  el: '#citySlider',
  data: {
    citysInfo: '',
    cityIds: apiConfig.cityIDs
  },
  async mounted() {
    const url = `${apiConfig.apiURL}group?id=${
      this.concat
    }&units=metric&APPID=${apiConfig.apiKey}`;

    const response = await axios.get(url); // get all city weather info
    this.citysInfo = response.data.list;
    cityDetails._data.visible = true;
    cityDetails._data.city = this.citysInfo[0];
  },
  computed: {
    concat: function() {
      return this.cityIds.join(','); // join cityIDs array to string
    }
  },
  methods: {
    //smooth horizontal slide
    slide: function(direction) {
      if (direction == 'left') {
        let scrollAmount = 0;
        const slideTimer = setInterval(function() {
          document.getElementById('slider-container').scrollLeft -= 15;
          scrollAmount += 10;
          if (scrollAmount >= 100) {
            window.clearInterval(slideTimer);
          }
        }, 25);
      } else {
        let scrollAmount = 0;
        const slideTimer = setInterval(function() {
          document.getElementById('slider-container').scrollLeft += 15;
          scrollAmount += 10;
          if (scrollAmount >= 100) {
            window.clearInterval(slideTimer);
          }
        }, 25);
      }
    },
    setCity: function(city) {
      cityDetails._data.city = city;
      cityDetails.$el.scrollIntoView();
    }
  }
});
