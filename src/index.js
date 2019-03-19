
let selectedUnits = 'metric';

function startApp() {


    getGeoLocation();

    const unitToggleButtonSelector = '.unit-toggle-button';
    const $unitToggleButton = $(unitToggleButtonSelector);

    $unitToggleButton.on('click', onButtonClick);
}

function getGeoLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(collatePositionAndUnits);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function getApiUrl(geoPosition) {
    let latitude = geoPosition.coords.latitude;
    let longitude = geoPosition.coords.longitude;
    let apiUrl =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&units=" +
        selectedUnits +
        "&id=524901&APPID=394a2b45046c19211c69a1fad60dc4f5";

    return apiUrl;

}

function collatePositionAndUnits(geoPosition) {
    const apiUrl = getApiUrl(geoPosition);
    if (selectedUnits === 'metric') {
        getWeatherMetric(apiUrl);
    } else if (selectedUnits === 'imperial') {
        getWeatherImperial(apiUrl);
    }

}

function onButtonClick() {
    const $this = $(this);
    if ($this.is(':checked')) {
        selectedUnits = 'metric';
    } else {
        selectedUnits = 'imperial';
    }

    getGeoLocation();
}

function getWeatherMetric(url) {
    $.getJSON(url, function(data) {
        $("#temp").html(data.main.temp + "  &deg;C");
        $("#thermometer").html('<i class="wi wi-thermometer"></i>');
        $("#place").html("Current weather conditions in " + data.name + ", " + data.sys.country);
        $("#weatherType").html(data.weather[0].main);
        $("#weatherDescription").html(data.weather[0].description);
        $("#time").html(
            (new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            }) + " - " + (new Date().toDateString()))
        );
        $("#sunrise").html('<i class="wi wi-sunrise"></i>' + "  " +
            (new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            }))
        );
        $("#sunset").html('<i class="wi wi-sunset"></i>' + "  " +
            (new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            }))
        );
        $("#windSpeed").html("   " + Math.round(data.wind.speed * 18 / 5) + "  km/hr");
        $("#windDirection").html(
            '<i class="wi wi-wind from-' + data.wind.deg + '-deg"></i>'
        );

        //sets weather icon dependent on day or night
        let now = Date.now();
        let sunrise = (data.sys.sunrise) * 1000;
        let sunset = (data.sys.sunset) * 1000;

        if (now > sunrise && now < sunset)
            $("#weatherIcon").html('<i class="wi wi-owm-day-' + data.weather[0].id + '"></i>');
        else
            $("#weatherIcon").html('<i class="wi wi-owm-night-' + data.weather[0].id + '"></i>');

        // depending on the current temperature, a suitable background image is chosen
        assignBackgroundImage(data);

    });
}


function assignBackgroundImage(data) {

    let dynamicBackground = getBackgroundUrl(data);

    return document.getElementById('background').style.backgroundImage = "url(" + dynamicBackground + ")";
}


function getBackgroundUrl(data) {
    let imageAddress;

    const frosty = "https://images.freecreatives.com/wp-content/uploads/2016/04/Frozen-Window-Wallpaper.jpg";
    const chilly = "https://www.yogabliss.co.uk/images/screen/1024_cornwall2.jpg";
    const mild = "https://i.pinimg.com/originals/00/35/b5/0035b5d3f2dfffcb8d5e42fda7f8e958.jpg";
    const warm = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMu8p95zatjamPuROqoVN3mVlJQMIhyqxRL_LbRDua3y-fzdXV0Q";
    const hot = "http://travelhdwallpapers.com/wp-content/uploads/2014/03/Sahara-Desert-15.jpg";
    const scorchio = "http://hd.wallpaperswide.com/thumbs/sun_3-t2.jpg";


    if (data.main.temp < 0) {
        imageAddress = frosty;
    } else if (data.main.temp >= 0 && data.main.temp < 10) {
        imageAddress = chilly;
    } else if (data.main.temp >= 10 && data.main.temp < 20) {
        imageAddress = mild;
    } else if (data.main.temp >= 20 && data.main.temp < 30) {
        imageAddress = warm;
    } else if (data.main.temp >= 30 && data.main.temp < 40) {
        imageAddress = hot;
    } else {
        imageAddress = scorchio;
    }
    return imageAddress;
}





function getWeatherImperial(url) {
    $.getJSON(url, function(data) {
        $("#temp").html(data.main.temp + "  &deg;F");
        $("#thermometer").html('<i class="wi wi-thermometer"></i>');
        $("#place").html("Current weather conditions in " + data.name + ", " + data.sys.country);
        $("#weatherType").html(data.weather[0].main);
        $("#weatherDescription").html(data.weather[0].description);
        $("#time").html(
            (new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            }) + " - " + (new Date().toDateString()))
        );
        $("#sunrise").html('<i class="wi wi-sunrise"></i>' + "  " +
            (new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            }))
        );
        $("#sunset").html('<i class="wi wi-sunset"></i>' + "  " +
            (new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            }))
        );
        $("#windSpeed").html("   " + Math.round(data.wind.speed) + "  mph");
        $("#windDirection").html('<i class="wi wi-wind from-' + data.wind.deg + '-deg"></i>');
        //sets weather icon dependent on day or night
        let now = Date.now();
        let sunrise = (data.sys.sunrise) * 1000;
        let sunset = (data.sys.sunset) * 1000;

        if (now > sunrise && now < sunset)
            $("#weatherIcon").html('<i class="wi wi-owm-day-' + data.weather[0].id + '"></i>');
        else
            $("#weatherIcon").html('<i class="wi wi-owm-night-' + data.weather[0].id + '"></i>');
    });
}


window.onload = startApp;