
$(document).ready(function(){

  var lat;
  var lon;
  

  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function(position){

      lat = position.coords.latitude;
      lon = position.coords.longitude;

      console.log(lat,lon);
        

      var $title = $("div#data h1#title");
      var $subtitle = $("div#data h2#subtitle");
      var $image = $("div#data span#image");
      var $description = $("div#data span#description");
      var $speed = $("div#data span#speed");
      var $temperature = $("div#data span#temperature");
      
      var Ktemp;
      
            
      $.ajax({

          type:'GET',
          url:`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`,
          dataType:'json',
          contentType: "application/json; charset=utf-8",
          origin: '*',
          format: "json",
          
          success: function (data){
            console.log(data);
                            
            var weather = data.weather[0].main;
            var description = data.weather[0].description;
            var image = data.weather[0].icon;
            var wind = data.wind.speed;
            var city = data.name;
            //var country = data.sys.country;

            Ktemp = data.main.temp;

            //console.log(Ktemp);
                                            
            $title.html('Current weather forecast in '+city+'.');
            $subtitle.html(' '+weather+'.');
            $image.html('<img src="'+ image +'" title=""/>');
            $description.html('<p>Description: '+ description +'</p>');
            $speed.html('<p>Wind Speed: '+wind+' mph </p>');
            $temperature.html('<p>Temperature: ' + Math.floor(Ktemp)+' &#8451;</p>');

            var Ftemp = (Ktemp)*(9/5) + 32;

            var tempButton = $("div#data #tempbtn");

            var tempChange;
          
            $(tempButton).click('click', function(){

            if(tempChange === true){

              $($temperature).html('<p>Temperature: '+Math.floor(Ktemp)+' &#8451;</p>');
              tempChange = false;

            }else{

                $($temperature).html('<p>Temperature: '+Math.floor(Ftemp)+' &#8457;</p>');
                tempChange = true;

            }
                  
            });//end of tempbt


            //show image according to weather
            switch (weather) {

              case weather = "Clouds":
              
              $('body').css('background-image','url("images/beautiful-clouds-cloudy-209831.jpg")');
                  break;
              case weather = "Rain":
              
              $('body').css('background-image','url("images/black-and-white-clear-cool-459451.jpg")');
                  break;
              case weather = "Snow":
              
              $('body').css('background-image','url("images/winter-3089888_1280.jpg")');
                  break;
              case weather = "Wind":
              
              $('body').css('background-image','url("images/blue-sky-bright-clouds-125457.jpg")');
                  break;
            }
                                          
          },
          error: function(error){

            $("div#data h1#title").html('Current weather forecast in '+data.error+'.');
              $("div#data h2#subtitle").html('is - '+data.error+'.');
      
              $("div#data span#image").html('<img src="'+data.error+ '" title=""/>');
              $("div#data span#description").html('<p>Description: '+ data.error +'</p>');
      
              $("div#data span#speed").html('<p>Wind Speed: '+data.erro+'</p>');
              $("div#data span#temperature").html('<p>Temperature: '+data.error+' &#8451;</p>');

              

          }
                  
      });

    
  }, error, options);
}
else {
  alert("Geolocation is not supported by this browser.");
}
  
});