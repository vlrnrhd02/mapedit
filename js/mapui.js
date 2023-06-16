//file Load
import fileLoad from './fileLoad.js';
import fileDownLoad from './fileDownLoad.js';
import distanceTool from './distanceTool.js';
import creategeom from './creategeom.js';
import Newdownload from './testClass.js';

/**
 *
 * create map
*/
var map = new maptalks.Map('map', {
  center: [126.9516193340971, 37.10889214182006],
  zoom: 15,
  pitch : 45,
  attribution: true,
  zoomControl : true, // add zoom control
  scaleControl : true, // add scale control
  overviewControl : true, // add overview control
  baseLayer: new maptalks.TileLayer('base', {
    urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    subdomains: ["a", "b", "c", "d"],
    attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
  }),


});


var zoomControl = new maptalks.control.Zoom({
  'position': 'top-right',
  'slider': true,
  'zoomLevel': true
}).addTo(map);
//제일 중요
var layer = new maptalks.VectorLayer('vector').addTo(map);

var drawTool = new maptalks.DrawTool({
  mode: 'Point'
}).addTo(map).disable();

drawTool.on('drawend', function (param) {
  if (param.geometry.type == "Point") {
    layer.setId('Point');
  } else if (param.geometry.type == "LineString") {
    layer.setId('LineString');
  } else {
    layer.setId('Polygon');
  }
  layer.addGeometry(param.geometry);
});

function formatGeoJSON(geoJSONText) {
  try {
    const geoJSONObject = JSON.parse(geoJSONText);
    const formattedGeoJSON = JSON.stringify(geoJSONObject, null, 2);
    return formattedGeoJSON;
  } catch (error) {
    console.error('Invalid GeoJSON format:', error);
    return null;
  }
}

function addLineBreaks(geoJSONText) {
  const lines = geoJSONText.split('\n');
  const formattedLines = lines.map(line => line.trim()).join('\n');
  return formattedLines;
}

function formatAndAddLineBreaks(geoJSONText) {
  const formattedGeoJSON = formatGeoJSON(geoJSONText);
  if (!formattedGeoJSON) {
    return null;
  }
  const formattedWithLineBreaks = addLineBreaks(formattedGeoJSON);
  return formattedWithLineBreaks;
}
/*
const formattedWithLineBreaks = formatAndAddLineBreaks(geoJSONText);
console.log(formattedWithLineBreaks);
*/

map.addEventListener('click', function (e) {
  if(drawTool._enabled == true){
    console.log(drawTool._enabled);
    let z = new Newdownload(layer);
    console.log(z);

    console.log(fileDownLoad.getGeoJsonFromLayer(layer));
    //document.getElementById("innerJson").innerHTML = formatAndAddLineBreaks(fileDownLoad.getGeoJsonFromLayer(layer));
  }else{
    console.log(drawTool._enabled);
  }
});

var items = ['Point', 'LineString', 'Polygon'].map(function (value) {
  return {
    item: value,
    click: function () {
      drawTool.setMode(value).enable();

    },

    contextmenu: function () {
      drawTool.disable();
    }
  };
});

// layer 클릭 이벤트 핸들러 함수
function handleClickEvent(e) {
  var target = e.target; // 클릭한 요소(레이어) 가져오기
  //var properties = target.getProperties(); // 레이어의 속성 정보 가져오기
  /*
  let popupopt = {
    'content'   :
    '<div class="content">' +
    '<div class="pop_title">속성 편집</div>' +
    '<div class="pop_time">' + new Date().toLocaleTimeString() + '</div><br>' +
    '<div class="pop_dept">' + coordinate.x + '</div>' +
    '<div class="pop_dept">' + coordinate.y + '</div>' +
    '<div class="pop_dept">' + layer + '</div>' +
    '<div class="arrow"></div>' +
    '</div>'
  }
  */
  // 속성 정보를 표시할 맵 팝업 생성
  var popup = new maptalks.ui.InfoWindow({
    title: "레이어 속성 정보",
    content: JSON.stringify(layer),
    autoCloseOn: "click",
  });

  // 클릭한 위치에 팝업을 표시하고 맵에 추가
  popup.addTo(map).show(e.coordinate);
}



var Rtoolbar = new maptalks.control.Toolbar({
  position : 'top-right',
  items: [
    {
      item: '레이어생성모드',
      children: items
    },
    {
      item: '레이어생성모드중지',
      click: function () {
        drawTool.disable();
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

        console.log(map.toJSON(layer))
        map.on('click', function (e) {
          //identify
          handleClickEvent(e);
          map.identify(
            //targeting할 좌표와, 해당 좌표에 걸리는 레이어..
            {
              'coordinate' : e.coordinate,
              'layers' : [layer]
            },

            function (geos) {
              if (geos.length === 0) {
                return;
              }
              geos.forEach(function (g) {
                g.startEdit();
              });
            }
          );
        });
      }
    },
    {
      item: '레이어 레이어 편집 중지',
      click: function () {
        layer.forEach(function (item) {
          item.endEdit();
          //g.target.endEdit();
        });
        //layer.endEdit();
      }
    },
    {
      item: '측정툴',
      click: function(){

      },
      children: [
        {
          item: '거리측정',
          click : function (){
            distanceTool.linedistanceTool(map);
          }
        },
        {
          item: '면적측정',
          click: function () {
            distanceTool.polydistanceTool(map);
          },
        },
        {
          item: '측정중지',
          click: function () {
            this.distanceTool.linedistanceTool().disable();
            this.distanceTool.polydistanceTool().disable();
          },
        },
      ]
    },
  ]
}).addTo(map);


var Ltoolbar = new maptalks.control.Toolbar({
  position : 'top-left',
  items: [
    {
      item: '파일 불러오기',
      click: async function () {

        let input = document.createElement('input');
        input.type = 'file';
        input.accept=".zip, .json, .geojson"

        input.onchange = function () {
          const file = input.files[0];
          console.log(file);

          if(file && file.name.endsWith(".zip")){
            fileLoad.loadshpzip(file, layer);
          }else if(file && file.name.endsWith(".json") || file.name.endsWith(".geojson")){
            fileLoad.loadjson(file, layer);
          }else if(file && file.name.endsWith(".gpkg")){
            //fale
            fileLoad.loadjson(file, layer);
          }
          else{
            alert('해당 형식은 지원하지 않습니다!')
          }
        };
        input.click();
      },
      icon: 'fa fa-file-text-o',
      title: 'Load file'
    },
    {
      item: '데이터 다운로드',
      click: function () {

      },
      children : [
      //직관적이게 가자
      {
        item: 'json으로 다운로드',
        click : function (){
          fileDownLoad.DownloadJson(layer);
          //document.getElementById('info').innerHTML = geojson;
        }
      },
      {
        item: 'geojson으로 다운로드',
        click : function (){
          fileDownLoad.DownloadGeojson(layer);
        }
      },
      {
        //짜증남.. ㅋㅋ
        item: 'shp로 다운로드',
        click : function (){
          fileDownLoad.DownloadShp(layer);
        }
      },
    ]
    },
  ]
}).addTo(map);


















let bLtoolbar = new maptalks.control.Toolbar({
  //position : {'bottom': 150,'left': 70},
  'position' : {'bottom': 50,'left': 20},
  'reverseMenu' : true,
  'items'     : [{
    item: '지도',
    click : function () {},
    children : [
      {
        item: 'openstreet',
        click: function() {
          let newBaseLayer = new maptalks.TileLayer('newBaseLayer', {
            'urlTemplate': 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            'subdomains': ['a', 'b', 'c'],
            'attribution': '&copy; OpenStreetMap contributors'
          });

          // 지도 객체에 새로운 베이스 레이어를 설정합니다.
          map.setBaseLayer(newBaseLayer);
        },
      },
      {
        item: 'carto',
        click: function() {
          let newBaseLayer = new maptalks.TileLayer('newBaseLayer', {
            urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            subdomains: ["a", "b", "c", "d"],
            attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
          });
          map.setBaseLayer(newBaseLayer);
        },
      },
      {
        item: '위성',
        click: function() {
          let newBaseLayer = new maptalks.TileLayer('newBaseLayer', {
            urlTemplate: 'https://xdworld.vworld.kr/2d/Satellite/service/{z}/{x}/{y}.jpeg',
            subdomains: ["a", "b", "c", "d"],
            attribution: 'v-world'
          });
          map.setBaseLayer(newBaseLayer);
        },
      },
      {
        item: 'v-world',
        click: function() {
          let newBaseLayer = new maptalks.TileLayer('newBaseLayer', {
            urlTemplate: 'https://xdworld.vworld.kr/2d/white/service/{z}/{x}/{y}.png',
            subdomains: ["a", "b", "c", "d"],
            attribution: 'v-world'
          });
          map.setBaseLayer(newBaseLayer);
        },
      },
      {
        //에헤이..
        item: '3d',
        click: function() {
          let newBaseLayer = new maptalks.ImageLayer('images', {
            urlTemplate: 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer',
            subdomains: ["a", "b", "c", "d"],
            attribution: 'v-world'
          });
          map.setBaseLayer(newBaseLayer);
        },
      }
    ]
  }, {
    item: '테스트',
    click : function () { info('item 2'); }
  }, {
    item: '테스트',
    click : function () { info('item 3'); }
  }]
}).addTo(map);