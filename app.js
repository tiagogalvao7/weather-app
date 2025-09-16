const url = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "YOUR_API_KEY";

document.addEventListener("DOMContentLoaded", () => {
  const searchCityButton = document.getElementById("get-weather-button");
  const cityInput = document.getElementById("city-input");

  searchCityButton.addEventListener("click", async () => {
    const cityName = cityInput.value.trim();
    const apiUrl = `${url}?q=${cityName}&appid=${apiKey}&units=metric`;

    if (!cityName) {
      alert("Please insert a valid city");
      return;
    }

    console.log("Searching for: " + cityName);

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (res.ok) {
        weatherShowFn(data);
      } else {
        alert("City not found. Please try again");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  });

  /**
   * @description Displays the current date on the page.
   */
  function displayDate() {
    const today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = today.toLocaleDateString("en-US", options);
    $("#current-date").text(formattedDate);
  }

  /**
   * @description Updates the HTML elements with the fetched weather data.
   * @param {object} data The JSON object from the OpenWeatherMap API.
   */
  function weatherShowFn(data) {
    $("#city-name").text(data.name);
    $("#city-temp").html(`${data.main.temp}°C`);

    // Get the icon code from the 'weather' array in the API response
    const iconCode = data.weather[0].icon;

    // Build the full URL for the weather icon
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Set the 'src' attribute of the image element
    $("#weather-icon").attr("src", iconUrl);

    // Add 'visible' class to fade in the weather display
    $(".weather-display").addClass("visible");
  }

  // Call displayDate on page load to show the current date immediately
  displayDate();
});
