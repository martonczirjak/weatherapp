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
      <img src="./assets/images/sunny.png" alt="city-weather">
      <div class="container">
        <h4 class="card-header"><b>{{city.name}}</b></h4>
        <div class="card-row">
          <img src="./assets/images/Degrees-Celcius.svg"></img>
          <p> {{city.main.temp}}</p>
        </div>
        <div class="card-row">
          <img src="./assets/images/Wind.svg"></img>
          <p> {{city.wind.speed}}</p>
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
    slide: function(direction) {
      if (direction == 'left') {
        this.$el.children[1].scrollLeft -= 50;
      } else {
        this.$el.children[1].scrollLeft += 50;
      }
    },
    setCity: function(city) {
      cityDetails._data.city = city;
      cityDetails.$el.scrollIntoView();
    }
  }
});
