$(document).ready(function(){
  $("#hide-conference").click(function(){
      $("ul").hide();
  });
  $("#show-conference").click(function(){
      $("ul").show();
  });
});

function renderIndex() {
  return `
  <div class="text-center text-light">
      <h3>Bem-vindo ao Football Map!</h3>
      <h4>No mapa abaixo, organizamos todos os times da NFL por sua localização.</h4>
      <h5>Ao clicar no marcador, saberá qual é o time, seu estádio e a capacidade do estádio.</h5>
    </div>
    <div class="text-center" id="teams" style="margin-left: auto; margin-right: auto;">
      <button class="btn btn-light m-5" id="show-conference" type="button">Mostrar lista de times</button>
      <button class="btn btn-light m-5" id="hide-conference" type="button">Ocultar listas de times</button>
      <div class="AFC d-flex justify-content-center conference">
        <img src="dist/images/afc.png" class="m-4" style="width: 10%; height: 65px;" />
        <ul class="afcEast ">
          <li>AFC East</li>
          <li>Buffalo Bills</li>
          <li>Miami Dolphins</li>
          <li>New England Patriots</li>
          <li>New York Jets</li>
        </ul>
        <ul class="afcNorth">
          <li>AFC North</li>
          <li>Baltimore Ravens</li>
          <li>Cincinnati Bengals</li>
          <li>Cleveland Browns</li>
          <li>Pittsburgh Steelers</li>
        </ul>
        <ul class="afcSouth">
          <li>AFC South</li>
          <li>Houston Texans</li>
          <li>Indianapolis Colts</li>
          <li>Jacksonville Jaguars</li>
          <li>Tennessee Titans</li>
        </ul>
        <ul class="afcWest">
          <li>AFC West</li>
          <li>Denver Broncos</li>
          <li>Kansas City Chiefs</li>
          <li>Los Angles Chargers</li>
          <li>Oakland Raiders</li>
        </ul>
      </div>
      <div class="NFC d-flex justify-content-center conference">
        <img src="dist/images/nfc.png" class="m-4" style="width: 10%; height: 65px;" />
        <ul class="nfcEast">
          <li>NFC East</li>
          <li>Dallas Cowboys</li>
          <li>New York Giants</li>
          <li>Philadelphia Eagles</li>
          <li>Washington Redskins</li>
        </ul>
        <ul class="nfcNorth">
          <li>NFC North</li>
          <li>Chicago Bears</li>
          <li>Detroit Lions</li>
          <li>Green Bay Packers</li>
          <li>Minnesota Vikings</li>
        </ul>
        <ul class="nfcSouth">
          <li>NFC South</li>
          <li>Atlanta Falcons</li>
          <li>Carolina Panthers</li>
          <li>New Orleans Saints</li>
          <li>Tampa Bay Buccaneers</li>
        </ul>
        <ul class="nfcWest">
          <li>NFC West</li>
          <li>Arizona Cardinals</li>
          <li>Los Angeles Rams</li>
          <li>San Francisco 49ers</li>
          <li>Seattle Seahawks</li>
        </ul>
      </div>
    </div>
    `;
}
function renderAbout() {
  return `
  <div class="text-center text-light">
      <h3>Sobre a NFL</h3>
      <div class="nfl-container d-inline-block">
        <h5>A National Football League (NFL) é a liga esportiva profissional de futebol americano dos Estados Unidos. Consiste
          de 32 times, divididos igualmente entre duas conferências: a National Football Conference (NFC) e a American Football
          Conference (AFC). A NFL é uma das quatro grandes ligas esportivas profissionais estadunidenses e é o principal
          expoente do futebol americano no mundo. Sua temporada regular é jogada por dezessete semanas, de setembro a dezembro,
          com cada time jogando dezesseis partidas e tendo uma semana de folga. Após a conclusão da temporada regulamentar,
          seis times de cada conferência (quatro campeões de divisão e dois times de repescagem) avançam para os playoffs,
          em uma competição de morte súbita culminando na grande final, o Super Bowl, que normalmente é disputado no primeiro
          domingo de fevereiro e coloca frente a frente os campões da NFC e da AFC. </h5>
      </div>
      <p onclick="changeText(this)">
      Clique pare ver os times mais vitoriosos
      </p>

    </div>
  `;
}


// Localizando o mapa nos Estados Unidos
function MapUnitedStates(map) {
  map.setCenter({ lat: 37.0902, lng: -95.7129 });
  map.setZoom(4);
}

//Confirguração inicial
const platform = new H.service.Platform({
  app_id: 'aL9b9oj1s4sn9f3ErpHc',
  app_code: 'z5Zc11HJtvvOhhEe2bjq3g',
  useHTTPS: true
});

const pixelRatio = window.devicePixelRatio || 1;
const defaultLayers = platform.createDefaultLayers({
  tileSize: pixelRatio === 1 ? 256 : 512,
  ppi: pixelRatio === 1 ? undefined : 320
});

// Inicializando o mapa
const map = new H.Map(document.getElementById('map'),
  defaultLayers.normal.map, { pixelRatio: pixelRatio });

// Implementando interação ao mapa 
const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Criando os componentes UI default
const ui = H.ui.UI.createDefault(map, defaultLayers);


// Marcadores
function addMarkerToGroup(group, coordinate, html) {
  const marker = new H.map.Marker(coordinate);

  marker.setData(html);
  group.addObject(marker);
}

// Informação nos marcadores
function addInfoBubble(map) {
  const group = new H.map.Group();

  map.addObject(group);

  group.addEventListener('tap', function(evt) {
    const bubble = new H.ui.InfoBubble(evt.target.getPosition(), {
      content: evt.target.getData()
    });
    ui.addBubble(bubble);
  }, false);

  addMarkerToGroup(group, { lat: 42.880230, lng: -78.878738 },
    '<p>Buffalo Bills</p>' +
    '<div>New Era Field<br>Capacity: 71,608</div>');

  addMarkerToGroup(group, { lat: 25.958, lng: -80.239 },
    '<p>Miami Dolphins</p>' +
    '<div>Hard Rock Stadium<br>Capacity: 65,326</div>');

  addMarkerToGroup(group, { lat: 42.091, lng: -71.264 },
    '<p>New England Patriots</p>' +
    '<div>Gillette Stadium<br>Capacity: 66,829</div>');

  addMarkerToGroup(group, { lat: 40.814, lng: -74.074 },
    '<p>New York Jets</p>' +
    '<div>MetLife Stadium<br>Capacity: 82,500</div>');

  addMarkerToGroup(group, { lat: 39.278, lng: -76.623 },
    '<p>Baltimore Ravens</p>' +
    '<div>M&T Bank Stadium<br>Capacity: 71,008</div>');

  addMarkerToGroup(group, { lat: 39.095, lng: -84.516 },
    '<p>Cincinnati Bengals</p>' +
    '<div>Paul Brown Stadium<br>Capacity: 65,515</div>');

  addMarkerToGroup(group, { lat: 41.506, lng: -81.699 },
    '<p>Cleveland Browns</p>' +
    '<div>FirstEnergy Stadium<br>Capacity: 67,431</div>');

  addMarkerToGroup(group, { lat: 40.447, lng: -80.016 },
    '<p>Pittsburgh Steelers</p>' +
    '<div>Heinz Field<br>Capacity: 68,400</div>');

  addMarkerToGroup(group, { lat: 29.685, lng: -95.411 },
    '<p>Houston Texans</p>' +
    '<div>NRG Stadium<br>Capacity: 72,220</div>');

  addMarkerToGroup(group, { lat: 39.76, lng: -86.164 },
    '<p>Indianapolis Colts</p>' +
    '<div>Lucas Oil Stadium<br>Capacity: 67,000</div>');

  addMarkerToGroup(group, { lat: 30.324, lng: -81.638 },
    '<p>Jacksonville Jaguars</p>' +
    '<div>TIAA Bank Field<br>Capacity: 67,246</div>');

  addMarkerToGroup(group, { lat: 36.166, lng: -86.771 },
    '<p>Tennessee Titans</p>' +
    '<div>Nissan Stadium<br>Capacity: 69,143</div>');

  addMarkerToGroup(group, { lat: 39.744, lng: -105.02 },
    '<p>Denver Broncos</p>' +
    '<div>Broncos Stadium at Mile High<br>Capacity: 76,125</div>');

  addMarkerToGroup(group, { lat: 39.049, lng: -94.484 },
    '<p>Kansas City Chiefs</p>' +
    '<div>Arrowhead Stadium <br>Capacity: 76,416</div>');

  addMarkerToGroup(group, { lat: 33.864, lng: -118.261 },
    '<p>Los Angeles Chargers</p>' +
    '<div>StubHub Center<br>Capacity: 27,000</div>');

  addMarkerToGroup(group, { lat: 37.752, lng: -122.201 },
    '<p>Oakland Raiders</p>' +
    '<div>Oakland–Alameda County Coliseum<br>Capacity: 56,063</div>');

  addMarkerToGroup(group, { lat: 32.748, lng: -97.093 },
    '<p>Dallas Cowboys</p>' +
    '<div>AT&T Stadium <br>Capacity: 80,000</div>');

  addMarkerToGroup(group, { lat: 40.814, lng: -74.074 },
    '<p>New York Giants</p>' +
    '<div>MetLife Stadium <br>Capacity: 82,500</div>');

  addMarkerToGroup(group, { lat: 39.901, lng: -75.168 },
    '<p>Philadelphia Eagles</p>' +
    '<div>Lincoln Financial Field<br>Capacity: 69,596</div>');

  addMarkerToGroup(group, { lat: 38.908, lng: -76.864 },
    '<p>Washington Redskins</p>' +
    '<div>FedExField<br>Capacity: 82,000</div>');

  addMarkerToGroup(group, { lat: 41.863, lng: -87.617 },
    '<p>Chicago Bears</p>' +
    '<div>Soldier Field<br>Capacity: 61,500</div>');

  addMarkerToGroup(group, { lat: 42.34, lng: -83.046 },
    '<p>Detroit Lions</p>' +
    '<div>Ford Field<br>Capacity: 65,000</div>');

  addMarkerToGroup(group, { lat: 44.501, lng: -88.062 },
    '<p>Green Bay Packers</p>' +
    '<div>Lambeau Field<br>Capacity: 81,435</div>');

  addMarkerToGroup(group, { lat: 44.974, lng: -93.258 },
    '<p>Minnesota Vikings</p>' +
    '<div>U.S Bank Stadium<br>Capacity: 66,655</div>');

  addMarkerToGroup(group, { lat: 33.755, lng: -84.401 },
    '<p>Atlanta Falcons</p>' +
    '<div>Mercedes-Benz Stadium<br>Capacity: 71,000</div>');

  addMarkerToGroup(group, { lat: 35.226, lng: -80.853 },
    '<p>Carolina Panthers</p>' +
    '<div>Bank of America Stadium<br>Capacity: 75,419</div>');

  addMarkerToGroup(group, { lat: 29.951, lng: -90.081 },
    '<p>New Orleans Saints</p>' +
    '<div>Mercedes-Benz Superdome<br>Capacity: 73,000</div>');

  addMarkerToGroup(group, { lat: 27.976, lng: -82.503 },
    '<p>Tampa Bay Buccaneers</p>' +
    '<div>Raymond James Stadium<br>Capacity: 65,890</div>');

  addMarkerToGroup(group, { lat: 33.528, lng: -112.263 },
    '<p>Arizona Cardinals</p>' +
    '<div>State Farm Stadium<br>Capacity: 63,400</div>');

  addMarkerToGroup(group, { lat: 34.014, lng: -118.288 },
    '<p>Los Angeles Rams</p>' +
    '<div>Los Angeles Memorial Coliseum<br>Capacity: 93,607</div>');

  addMarkerToGroup(group, { lat: 37.403, lng: -121.97 },
    '<p>San Francisco 49ers</p>' +
    '<div>Levi\'\s Stadium<br>Capacity: 68,500</div>');

  addMarkerToGroup(group, { lat: 47.595, lng: -122.332 },
    '<p>Seattle Seahawks</p>' +
    '<div>CenturyLink Field<br>Capacity: 68,000</div>');
}

function changeText(id) {
  id.innerHTML = "Pittsburgh Steelers (6), Dallas Cowboys, San Francisco 49ers e New England Patriots (5)";
}

MapUnitedStates(map);
addInfoBubble(map);