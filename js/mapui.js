/**
 * 
 * create map
*/


var map = new maptalks.Map('map', {
    center: [126.9516193340971,37.10889214182006],
    zoom: 15,
    baseLayer: new maptalks.TileLayer('base', {
      urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      subdomains: ["a","b","c","d"],
      attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
    }),
    
});

var layer = new maptalks.VectorLayer('vector').addTo(map);
var point = new maptalks.Marker([0,0]).addTo(layer);
var line = new maptalks.LineString([0,0]).addTo(layer);
var polygon = new maptalks.Polygon([0,0]).addTo(layer);


var drawTool = new maptalks.DrawTool({
  mode: 'Point'
}).addTo(map).disable();
drawTool.on('drawend', function (param) {
  console.log(param.geometry);

  if(param.geometry.type == "Point"){
    layer.setId('Point');
  }else if(param.geometry.type == "LineString"){
    layer.setId('LineString');
  }else{
    layer.setId('Polygon');
  }
  layer.addGeometry(param.geometry);
});

/*
가능한 items 들
var items = ['Point', 'LineString', 'Polygon', 'Circle', 'Ellipse', 'Rectangle', 'FreeHandLineString', 'FreeHandPolygon']
var items = ['Point', 'LineString', 'Polygon']
*/


var items = ['Point', 'LineString', 'Polygon'].map(function (value) {
  return {
    item: value,
    click: function () {
      //
      /*
      if(value == 'Point'){
        var pointdrawTool = new maptalks.DrawTool({
          mode : 'point',
          symbol : {
            'markerType': 'ellipse',
            'markerFill': 'rgb(135,196,240)',
            'markerFillOpacity': 1,
            'markerLineColor': '#34495e',
            'markerLineWidth': 3,
            'markerLineOpacity': 1,
            'markerLineDasharray':[],
            'markerWidth': 10,
            'markerHeight': 10,
            'markerDx': 0,
            'markerDy': 0,
            'markerOpacity' : 1
          },
          //once : true
        }).addTo(map);
        console.log(value);
        pointdrawTool.setMode(value).enable();

        pointdrawTool.on('drawend', function (param) {
          console.log(param.geometry);
          layer.addGeometry(param.geometry);
        });
      }else if(value == 'LineString'){
        console.log(value)
        var linedrawTool = new maptalks.DrawTool({
          
          mode : 'LineString',
          symbol : {
              'lineColor' : '#000',
              'lineWidth' : 5
          },
          //once : true
        }).addTo(map);
        linedrawTool.setMode(value).enable();
        
        linedrawTool.on('drawend', function (param) {
          console.log(param.geometry);
          layer.addGeometry(param.geometry);
        });
      }else{
        console.log(value)
        var PolygondrawTool = new maptalks.DrawTool({
          mode : 'Polygon',
          symbol : {
              'lineColor' : '#000',
              'lineWidth' : 5
          },
          //once : true
        }).addTo(map);
        PolygondrawTool.setMode(value).enable();

        PolygondrawTool.on('drawend', function (param) {
          console.log(param.geometry);
          layer.addGeometry(param.geometry);
        });
      }*/
      drawTool.setMode(value).enable();
    }
  };
});

var zoomControl = new maptalks.control.Zoom({
    'position'  : 'top-right',
    'slider'    : true,
    'zoomLevel' : true
  }).addTo(map);

var toolbar = new maptalks.control.Toolbar({
  items: [
    {
      item: '레이어생성모드',
      children: items
    },
    {
      item: '레이어생성모드중지',
      click: function () {
        drawTool.disable();
        //pointdrawTool.disable();
        //linedrawTool.disable();
        //PolygondrawTool.disable();
      }
    },
    {
      item: '레이어 제거',
      click: function () {
        layer.clear();
      }
    },
    {
      item: '레이어 편집',
      click: function () {
        
        layer.forEach(function (item) {
          item.on('mouseenter', function (g) {
            g.target.startEdit();
          })
        });
      }
    },
    {
      item: '레이어 레이어 편집 중지',
      click: function () {
        layer.forEach(function (item) {
          item.on('mouseenter', function (g) {
            g.target.endEdit();
          })
        });
        //layer.endEdit();
      }
    },
    {
      item: '데이터 로드',
      click: function () {
        loadgeojson();
        /*
        console.log(JSON.stringify(maptalks.Layer.fromJSON(map.getLayer('vector').toJSON())));

        let geojson = JSON.stringify(maptalks.Layer.fromJSON(map.getLayer('vector').toJSON()));
        console.log(geojson);
        DownloadJson(geojson) 
        */
      }
    },
    {
      item: '데이터 다운로드',
      click: function () {

        const features = [];

        // maptalks 레이어의 각 요소를 반복하여 feature로 변환합니다.
        layer.forEach(function (item) {
          const feature = item.toGeoJSON();
          features.push(feature);
        });

        // GeoJSON FeatureCollection 객체를 생성합니다.
        const featureCollection = {
          type: 'FeatureCollection',
          features: features,
          properties : '1'
        };

        // featureCollection 객체를 GeoJSON 문자열로 직렬화합니다.
        const geojson = JSON.stringify(featureCollection);
        console.log(geojson);
        //downloadGeoJSON()
        DownloadJson(geojson)

      }
    },
  ]
}).addTo(map);



let loadgeojson = async function (geojson) {
  // 파일 읽어 오기
  //const data = await fetch('./data/BUILDING_hwaseong_lowdata.json');
  const data = await fetch('./data/testdata44.json');
  
  // JSON으로 해석
  const obj = await data.json();
  

  console.log(obj);  // 결과: {name: "A학교", classes: Array(2)}

  const geometry = maptalks.GeoJSON.toGeometry(obj);
  if(geometry){
    geometry.forEach(e => {
      //console.log(e);
      //style
      e.setSymbol({
        lineColor: '#34495e',
        lineColor: 1,
        polygonFill: 'rgb(135,196,240)',
        polygonOpacity: 0.2
      });

      /*
      e.setInfoWindow({
        title : e.properties.fid,
        content: '<br style="color:#f00">층수: ' + e.properties.GRND_FLR + '</br> 높이: ' + e.properties.HEIGHT + '</br>'
      });
      */

      e.on('mouseenter', function (g) {
        g.target.updateSymbol({
          polygonFill: '#f00',
          //lineColor: '#f00',
        });
      }).on('mouseout', function(g){
        g.target.updateSymbol({
          polygonFill: 'rgb(135,196,240)',
          //lineColor: '#34495e',
        });
      }).on('click', function(g){
        g.target.openInfoWindow(e.coordinate);
        console.log(e);
      })
    });
  }
  layer.addGeometry(geometry);
}

//loadgeojson();

function DownloadJson(LArr) {

    //let json = JSON.stringify(LArr);
    let blod = new Blob([LArr]);
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(blod);
    link.download = "testdata.json";
    link.click();
};

function downloadGeoJSON() {
  // vector layer를 geojson으로 변환
  //const geojson = layer.toGeoJSON();
  // featureCollection을 만들기 위해 features 배열을 초기화합니다.
  const features = [];

  // maptalks 레이어의 각 요소를 반복하여 feature로 변환합니다.
  layer.forEach(function (item) {
    const feature = item.toGeoJSON();
    features.push(feature);
  });

  // GeoJSON FeatureCollection 객체를 생성합니다.
  const featureCollection = {
    type: 'FeatureCollection',
    features: features
  };

  // featureCollection 객체를 GeoJSON 문자열로 직렬화합니다.
  const geojson = JSON.stringify(featureCollection);
  console.log(geojson);
  //const geojson = layer.toGeoJSONString()
  // JSON 파일을 다운로드
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(geojson);
  const dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", "layer.json");
  dlAnchorElem.click();
}
