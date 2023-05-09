const form = document.querySelector("#search-location");
const input = form.querySelector("#default-search");
const weatherCardContainer = document.querySelector(".weather-card");
const detectLoc = document.querySelector(".detect-loc");
const apiKey = `66cf454502d3c20bdc15c6b72d51302d`;
let url;

// wether card ui
const weatherCard = (res) => {
  const { name, weather, main, wind } = res;
  input.value = name;
  const data = `<div class="flex justify-center">
  <div
    class="card min-w-sm max-w-sm border border-gray-100 bg-gray-50 transition-shadow test shadow-lg hover:shadow-shadow-xl w-full bg-green-600 text-purple-50 rounded-md"
  >
    <h2 class="text-md mb-2 px-4 pt-4">
      <div class="flex justify-between">
        <div class="badge relative top-0">
          <span
            class="mt-2 py-1 h-12px text-md font-semibold w-12px rounded right-1 bottom-1 px-4"
            >${name}</span
          >
        </div>
        <span class="text-lg font-bold"
          >${new Date().toLocaleTimeString()}</span
        >
      </div>
    </h2>

    <div class="flex items-center p-4">
      <div class="flex flex-col justify-center items-center w-96">
        <h1 class="text-5xl">${main.temp}°</h1>
        <span
          >${weather[0].main}
          ${main.temp_max}°/${main.temp_min}°</span
        >
      </div>
      <div class="border-l-2 h-20"></div>
      <div class="flex justify-center items-center w-96">
        <img
          src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png"
          alt=""
          srcset=""
          class="h-32 w-32 text-yellow-300"
        />
      </div>
    </div>
    <div class="text-md pt-4 pb-4 px-4">
      <div class="flex justify-between items-center">
        <div class="space-y-2">
          <span class="flex space-x-2 items-center"
            ><svg
              height="20"
              width="20"
              viewBox="0 0 32 32"
              class="fill-current"
            >
              <path
                d="M13,30a5.0057,5.0057,0,0,1-5-5h2a3,3,0,1,0,3-3H4V20h9a5,5,0,0,1,0,10Z"
              ></path>
              <path
                d="M25 25a5.0057 5.0057 0 01-5-5h2a3 3 0 103-3H2V15H25a5 5 0 010 10zM21 12H6V10H21a3 3 0 10-3-3H16a5 5 0 115 5z"
              ></path>
            </svg>
            <span>${wind.speed}km/h</span></span
          ><span class="flex space-x-2 items-center"
            ><svg
              height="20"
              width="20"
              viewBox="0 0 32 32"
              class="fill-current"
            >
              <path
                d="M16,24V22a3.2965,3.2965,0,0,0,3-3h2A5.2668,5.2668,0,0,1,16,24Z"
              ></path>
              <path
                d="M16,28a9.0114,9.0114,0,0,1-9-9,9.9843,9.9843,0,0,1,1.4941-4.9554L15.1528,3.4367a1.04,1.04,0,0,1,1.6944,0l6.6289,10.5564A10.0633,10.0633,0,0,1,25,19,9.0114,9.0114,0,0,1,16,28ZM16,5.8483l-5.7817,9.2079A7.9771,7.9771,0,0,0,9,19a7,7,0,0,0,14,0,8.0615,8.0615,0,0,0-1.248-3.9953Z"
              ></path>
            </svg>
            <span>${main.humidity}%</span></span
          >
        </div>
        <div class="flex flex-col justify-center items-center">
          <h1 class="text-4xl">${main.feels_like}°</h1>
          <span>Feels like</span>
        </div>
      </div>
    </div>
  </div>
</div>`;
  weatherCardContainer.innerHTML = data;
};

const setApiByName = (loc) => {
  url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=metric&appid=${apiKey}`;
};
const setApiByCords = (lat, long) => {
  url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
};

// fetches wether data and displays the wether card
const fetchWeather = async () => {
  try {
    const fetchWeather = await fetch(url);
    const weatherData = await fetchWeather.json();
    console.log(weatherData);
    weatherCard(weatherData);
  } catch (error) {
    alert("!Location not found.");
    console.log(error);
  }
};

// sets api url and fetch wether by location name
const getWeatherByName = async (location) => {
  await setApiByName(location);
  await fetchWeather();
};

// sets api url and fetch wether by coordinates
const getWeatherByCords = async (lat, long) => {
  await setApiByCords(lat, long);
  await fetchWeather();
};

// fetch location cordinates
const detectCords = () => {
  console.log(navigator.geolocation);
  navigator.geolocation.getCurrentPosition((position) => {
    getWeatherByCords(position.coords.latitude, position.coords.longitude);
  });
};

// input form submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputLocation = input.value;
  getWeatherByName(inputLocation);
});

// detect location event
detectLoc.addEventListener("click", (e) => {
  e.preventDefault();
  detectCords();
});
detectCords();
