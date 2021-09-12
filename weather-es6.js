

(function(){

  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function(position){

      let lat = position.coords.latitude;
      let lon = position.coords.longitude;             

      //const url = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`

      const url = `https://fcc-w-app.herokuapp.com/api/data/2.5/weather?lat=${lat}&lon=${lon}`    
        
      const maintitle = document.querySelector("#header_title");      
      const subtitle = document.querySelector("#sub_title");
      const image = document.querySelector("#image");
      const description = document.querySelector("#description");
      const speed = document.querySelector("#speed");
      const temperature = document.querySelector("#temperature");      
                       
      
      fetch(url).then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return(response.json());
        
      }).then(function(response) {
        updateUISuccess(response);
      }).catch(function(error) {
        return updateUIError(error);
      });

      // handle XHR success
      const updateUISuccess = (response) => {
        
          let city = response.name;
          let weather = response.weather[0].main;
          let weatherdesc = response.weather[0].description;
          let weathericon = response.weather[0].icon;
          let wind = response.wind.speed;         
          let Ktemp = response.main.temp / 10;

          maintitle.innerHTML = `Current weather forecast in ${city}.`;
          subtitle.innerHTML = `Current Weather: ${weatherdesc}.`;         
          image.innerHTML = `<img src=\"${weathericon}.png\" title=\"\"/>`;
          description.innerHTML = `<p> Description: ${weatherdesc} </p>`;
          speed.innerHTML = `<p> Wind Speed: ${wind}mph </p>`;
          temperature.innerHTML = `<p>Temperature: ${Math.floor(Ktemp)}&#8451; </p>`;

          let Ftemp = (Ktemp)*(9/5) + 32;
          const tempButton = document.querySelector("div#container #tempbtn");
          let tempChange;

          tempButton.addEventListener('click', function(e){

            e.preventDefault();

            if(tempChange === true){
              temperature.innerHTML = `<p>Temperature: ${Math.floor(Ktemp)}&#8451; </p>`;
              tempChange = false;

            }else{
              temperature.innerHTML = `<p>Temperature: ${Math.floor(Ftemp)}&#8457;</p>`;
              tempChange = true;
            }

          });//end of temp

          //show image according to weather
          switch (weather) {

            case weather = "Clouds":

            document.querySelector('body').style.backgroundImage = 'url("https://drive.google.com/uc?id=1h8B7q-tPX3iyUCb00Nnh4uAnrbK3gTOP")';
              break;
              case weather = "Rain":

            document.querySelector('body').style.backgroundImage = 'url("https://drive.google.com/uc?id=1Qv4KK1B-xh2NQF-oTydkmlbXXZmAJGtl")';
              break;
              case weather = "Snow":

            document.querySelector('body').style.backgroundImage = 'url("https://drive.google.com/uc?id=1IpR6qO5bYVIADYP0lBCc76AH4NqeTsiP")';
              break;
              case weather = "Wind":

            document.querySelector('body').style.backgroundImage = 'url("https://drive.google.com/uc?id=1IpR6qO5bYVIADYP0lBCc76AH4NqeTsiP")';
              break;
              case weather = "Drizzle":

            document.querySelector('body').style.backgroundImage = 'url("https://drive.google.com/uc?id=1Qv4KK1B-xh2NQF-oTydkmlbXXZmAJGtl")';
              break;
              case weather = "Clear":
            document.querySelector('body').style.backgroundImage = 'url("https://drive.google.com/file/d/1qGb_nZpSSfVHBnQvnNA0S_72ifQZH-vs")';

          }

      }

      // handle XHR error
      const updateUIError = (error) => {
        document.querySelector("#header_title").textContent =  `${error}.`;
        document.querySelector("#sub_title").textContent = `${error}.`;
        document.querySelector("#image").textContent = '<img src="" title=""/>';
        document.querySelector("#description").textContent = `<p> ${error} </p>`;
        document.querySelector("#speed").textContent = `<p> ${error} </p>`;
        document.querySelector("#temperature").textContent = `<p> ${error}&#8451;</p>`;
      }      
    });
  }
  else {
    
    alert("Geolocation is not supported by this browser.");
  
  }
})();