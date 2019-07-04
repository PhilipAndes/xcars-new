// fetch data 
fetch("./xcars.json")
  .then(function (resp) {
    return resp.json();
  })
  .then(function (data) {

    ////////////////////////Get the ID from the url///////////////////////
    // Create new URL object (with window.location.href we get the current url)
    const url = new URL(window.location.href);

    //The search property of the URL object returns the string of query parameters. (so in this case the id)
    const query_string = url.search;

    // The query parameters string can be used to create a URLSearchParams object, through which you can get parameter values.
    const search_params = new URLSearchParams(query_string);
    const id = search_params.get('id');


    //////////////////////Loop through the fetched data///////////////////
    let xcarModel = data.xCars;

    let xcarFuel = data.fuel;

    let xcarYear = data.year;


    // Loop through the data and id's and if id is not found give an error
    getId = function() {
      if (id == 1) {
        xcarModel = data.xCars[0];
      } else if (id == 2) {
        xcarModel = data.xCars[1];
      } else if (id == 3) {
        xcarModel = data.xCars[2];
      } else if (id == 4) {
        xcarModel = data.xCars[3];
      } else {
        // If id doesn't excist send to:
        location.href = '404Error.html';
      }
    }
    getId();
    

    ////////////////Update the UI with the correct information////////////
    // Title
    document.getElementById('model-title').textContent = `XCars || ${xcarModel.model}`;

    // Navbar
    document.getElementById('nav-model').textContent = `${xcarModel.model}`;

    // Showcase background
    document.getElementById('showcase').style.backgroundImage = `url(${xcarModel.headerImg})`;

    // Showcase title:
    document.getElementById('model-header-title').textContent = `The XCar ${xcarModel.model}`;

    // Model Header and text under showcase:
    document.getElementById('modelHeader-1').textContent = `The XCar ${xcarModel.model}`;
    document.getElementById('model-description').textContent = `${xcarModel.description}`;

    // Model Header
    document.getElementById('modelHeader-2').textContent = `Our ${xcarModel.model} Models:`;


    /////////////////////////Default model + text////////////////////////
    // Default model image on load:
    document.getElementById('xCarModelDefault').innerHTML = `
      <img src="${xcarModel.defaultImg}" class="img-fluid"><img>
    `;

    // Default showroom model text
    document.getElementById('xcarModelDefaultHeader').innerHTML = `
      <h2>${xcarModel.model} Showroom Model</h2>
    `;

    // Hide all output before any of the models is clicked
    let selectedModel = document.getElementById('xCarModel');
    selectedModel.style.display = "none";


    ////////////////////////////////The Models////////////////////////////
    let outputAllModels = '';

    xcarModel.models.forEach(function (model) {
      outputAllModels += `
        <div class="modelLink">
          <b>Model ${model.id} :</b> The ${model.name}<br>
        </div>
      `;
    })
    document.getElementById('allModels').innerHTML = outputAllModels;


    ///////////////////////Loop through output models////////////////////////
    let modelLoop = document.getElementsByClassName('modelLink');

    for (let i = 0; i < modelLoop.length; i++) {
      modelLoop[i].onclick = function () {

        // Hide default model + test when a model is clicked
        document.getElementById('defaultModelOutput').innerHTML = '';

        // Get output when a model is clicked
        selectedModel.style.display = "block";


        ///////////////////////////// Name /////////////////////////////////
        let name = document.getElementById("name").value = `<h4 class="output-name">${xcarModel.models[i].name} </h4>`;
        document.getElementById("name").innerHTML = name;


        ///////////////////////////// Image /////////////////////////////////
        let image = document.getElementById("image").src = `${xcarModel.models[i].color[0].src}`;
        document.getElementById("image").innerHTML = image;


        ///////////////////////////// Color/////////////////////////////////
        let color = document.getElementById("color").value = `<b>Color:</b> ${xcarModel.models[i].color[0].name}`;
        document.getElementById("color").innerHTML = color;

        // loop through colors for each model
        let modelColorOutput = '';

        xcarModel.models[i].color.forEach(function (color) {
          modelColorOutput += `
          <option value=${color.id}>${color.name}</option>
          `;
        })
        document.getElementById("colorOutputList").innerHTML = modelColorOutput;


        document.getElementById("colorOutputList").onchange = function () {
          let selectedColor = document.getElementById("colorOutputList");
          let x = selectedColor.selectedIndex;
          document.getElementById("color").innerHTML = `<b>Color:</b> ${selectedColor.options[x].text}`;

          // Loop through images
          if (xcarModel.models[i].id === 1) {
            image = document.getElementById("image").src = `${xcarModel.models[i].color[x].src}`;
            document.getElementById("image").innerHTML = image;
          } else if (xcarModel.models[i].id === 2) {
            image = document.getElementById("image").src = `${xcarModel.models[i].color[x].src}`;
            document.getElementById("image").innerHTML = image;
          } else {
            image = document.getElementById("image").src = `${xcarModel.models[i].color[x].src}`;
            document.getElementById("image").innerHTML = image;
          }
        }


        ///////////////////////////// FUEL /////////////////////////////////
        // default value on load
        let fuel = document.getElementById("fuel").value = `<b>Fuel:</b> ${xcarFuel[0].name}`;
        document.getElementById("fuel").innerHTML = fuel;

        let fuelOutput = '';

        xcarFuel.forEach(function (fuel) {
          fuelOutput += `
          <option value=${fuel.id}>${fuel.name}</option>
          `;
        })
        document.getElementById("fuelOutputList").innerHTML = fuelOutput;

        document.getElementById("fuelOutputList").onchange = function () {
          // let selectedFuel = document.querySelector('#fuel3 option:checked').textContent;
          // document.getElementById("fuel").innerHTML = `<b>Fuel:</b> ${selectedFuel}`;

          ////////////// Use code above or below: /////////////

          let selectedFuel = document.getElementById("fuelOutputList");
          let i = selectedFuel.selectedIndex;
          document.getElementById("fuel").innerHTML = `<b>Fuel:</b> ${selectedFuel.options[i].text}`;
        }


        ///////////////////////////// YEAR /////////////////////////////////
        let year = document.getElementById("year").value = `<b>Year:</b> ${xcarYear[0].year}`;
        document.getElementById("year").innerHTML = year;

        let yearOutput = '';
        
        xcarYear.forEach(function (year) {
          yearOutput += `
          <option value=${year.id}>${year.year}</option>
          `;
        })
        document.getElementById("yearOutputList").innerHTML = yearOutput;

        document.getElementById("yearOutputList").onchange = function () {
          let selectedYear = document.getElementById("yearOutputList");
          let i = selectedYear.selectedIndex;
          document.getElementById("year").innerHTML = `<b>Year:</b> ${selectedYear.options[i].text}`;
        }


        ///////////////////////////// PRICE /////////////////////////////////
        let price = document.getElementById("price").value = `<b>Total Price:</b> €${xcarModel.models[i].properties.price}`;
        document.getElementById("price").innerHTML = price;

        // calculatePrice = function() {
        //   if(color.value === ""){

        //   }
        //}
      }
    }
  })