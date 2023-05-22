//file Load 
import fileLoad from './fileLoad.js';
import fileDownLoad from './fileDownLoad.js';
import distanceTool from './distanceTool.js';
import creategeom from './creategeom.js';


/**
 * 
 * create map
*/
var map = new maptalks.Map('map', {
  center: [126.9516193340971, 37.10889214182006],
  zoom: 15,
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
  console.log(param.geometry);
  
  let point = [];
  if (param.geometry.type == "Point") {
    layer.setId('Point');
  } else if (param.geometry.type == "LineString") {
    layer.setId('LineString');
  } else {
    layer.setId('Polygon');
  }
  layer.addGeometry(param.geometry);
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
                console.log(g);
                let coordinate = e.coordinate;
                var options = {
                  //'autoOpenOn' : 'click',  //set to null if not to open window when clicking on map
                  'layers' : [layer],
                  'autoCloseOn' : true,
                  'single' : false,
                  'width'  : 183,
                  'height' : 105,
                  'custom' : true,
                  'dx' : e.coordinate.x,
                  'dy' : e.coordinate.y,
                  'content'   : 
                    '<div class="content">' +
                    '<div class="pop_title">속성 편집</div>' +
                    '<div class="pop_time">' + new Date().toLocaleTimeString() + '</div><br>' +
                    '<div class="pop_dept">' + coordinate.x + '</div>' +
                    '<div class="pop_dept">' + coordinate.y + '</div>' +
                    '<div class="pop_dept">' + layer + '</div>' +
                    '<div class="arrow"></div>' +
                    '</div>'
                };
                var infoWindow = new maptalks.ui.InfoWindow(options);
                infoWindow.addTo(map).show(coordinate);
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
          console.log(item);
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
  position : {'bottom': 150,'right': 0},
  items: [
    {
      item: 'haha',
      click: function() {

      },
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
    }
  ]
}).addTo(map);