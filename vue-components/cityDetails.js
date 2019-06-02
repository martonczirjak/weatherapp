// city details template
Vue.component('city-details', {
  props: ['city'],
  template: ` 
        <div class="details-container">
          <div class="details-top-row">
            <div class="details-row">
              <div class="details-description">{{city.weather[0].description}}</div>
              <div class="details-temp">{{city.main.temp}}</div>
              <p class="unit">°C</p>
            </div>
            <div class="details-row">
              <p class="details-row">Max : {{city.main.temp_max}}</p>
              <p class="details-row">Min : {{city.main.temp_min}}</p>
            </div>
          </div>
          <p class="details-row">Humidity: <span>{{city.main.humidity}}</span></p>
          <p class="details-row">Pressure: <span>{{city.main.pressure}}</span></p>
          <p class="details-row">Wind speed: <span>{{city.wind.speed}}</span></p>
          <h2>{{city.name}}</h2>
        </div>
      `
});

const cityDetails = new Vue({
  el: '#cityDetails',
  data: {
    visible: false,
    city: ''
  }
});
