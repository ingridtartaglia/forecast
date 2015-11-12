$(document).ready(function(){
    $(function() {
        var local = {};

        if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(success, error);
        }
        function success(position) {
            local.latitude = position.coords.latitude;
            local.longitude = position.coords.longitude;
            $.ajax({
                url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + local.latitude +
                    "," + local.longitude + "&key=AIzaSyBSztGEjKu-tOQ_O7fuQmIabSXgbkobpOI",
                success: function(data){
                    $("#location-address").append(data.results[1].formatted_address);
                },
            });
            $.getJSON("https://api.forecast.io/forecast/af6b404215ae3d4f969c1a9700e2f019/" + local.latitude +
                "," + local.longitude + "?callback=?",
                function(data){
                    $("#location-icon").append("<i class='wi wi-forecast-io-" + data.currently.icon + "'></i>");
                    $("#location-temperature-now").append(((data.currently.temperature - 32) * 5/9).toFixed(0));
                    $("#location-weather-now").append(data.currently.summary);
                    $("#forecast-today").append(data.daily.data[0].summary);
                    $("#forecast-max").append(((data.daily.data[0].temperatureMax - 32) * 5/9).toFixed(0));
                    $("#forecast-min").append(((data.daily.data[0].temperatureMin - 32) * 5/9).toFixed(0));
                    $("body").css({"background": "url('img/"+ data.currently.icon + ".jpg') no-repeat center center fixed",
                                    "background-size": "cover"});
                    $(".loading").hide();
                    $(".jumbotron").show();
                }
            );
        }
        function error(erro){
            console.log(erro);
        }
    });
});
