var map = new maptalks.Map('map', {
    center: [-0.113049,51.498568],
    zoom: 14,
    attribution: true,
    baseLayer: new maptalks.TileLayer('base', {
      urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      subdomains: ["a","b","c","d"],
      attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
    })
  });

  var layer = new maptalks.VectorLayer('v').addTo(map);

  map.on('click', function (e) {
    //reset colors
    layer.forEach(function (g) {
      g.updateSymbol({
        'markerFill' : '#0e595e'
      });
    });
    //identify
    map.identify(
      {
        'coordinate' : e.coordinate,
        'layers' : [layer]
      },
      function (geos) {
        if (geos.length === 0) {
          return;
        }
        geos.forEach(function (g) {
          g.updateSymbol({
            'markerFill' : '#f00'
          });
        });
      }
    );
  });

  //prepare data
  var center = map.getCenter(), width = 0.055, height = 0.03,
    markers = [];
  for (var i = 65; i <= 90; i++) {
    var x = center.x + (Math.random() - 0.5) * width;
    var y = center.y + (Math.random() - 0.5) * height;
    markers.push(new maptalks.Marker([x, y], {
      'symbol' : {
        'textName' : String.fromCharCode(i),
        'textSize' : 30,
        'textFill' : 'White',
        'markerType' : 'ellipse',
        'markerFill' : '#0e595e',
        'markerFillOpacity' : 0.4,
        'markerLineWidth' : 2,
        'markerLineColor' : 'white',
        'markerWidth' : 70,
        'markerHeight' : 70
      }
    }));
  }
  layer.addGeometry(markers);

  
//shp.zip file을 로드하는 함수
async function readZipFile(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
        const arrayBuffer = event.target.result;
        shp(arrayBuffer).then((data) => {
            geojson = data;
            resolve();
        }).catch((error) => {
            reject(error);
        });
        };
        fileReader.readAsArrayBuffer(file);
    });
}

//사용자 pc의 shpfile zip 형식의 파일을 로드하여 화면에 표출
const fileInput = document.getElementById("file-input");
fileInput.addEventListener("click", async (e) => {

    const file = e.target.files[0];

    if(file && file.name.endsWith(".zip")) {

        try {
            await readZipFile(file);

            console.log(geojson);
            /*
            const shplayer = new maptalks.VectorLayer('layer');
            
            shplayer.addGeometry(geojson.features);
            
            map.addLayer(shplayer);
            console.log(shplayer);
            */
            let shplayer
            shplayer = new maptalks.VectorLayer({
                visible : true,
                editable : true,
                cursor : 'pointer',
                draggable : true,
                dragShadow : true, // display a shadow during dragging
                drawOnAxis : null,  // force dragging stick on a axis, can be: x, y
                symbol: {
                  'lineColor' : '#34495e',
                  'lineWidth' : 25,
                  'polygonFill' : 'rgb(255,255,255)',
                  'polygonOpacity' : 0.6
                },
                //움직일때마다 안끊기고 보여줌
                drawImmediate: true,
                forceRenderOnMoving:true,
                forceRenderOnZooming:true,
                forceRenderOnRotating :true,
            });
            shplayer.addGeometry(geojson.features);
            map.addLayer(shplayer);
            shplayer.startEdit();

        } catch (error) {
            alert(error);
            console.log(error);
        }
    }    
})


let Loadfile = function(){



}


let loadgeojson = async function (geojson) {
    // 파일 읽어 오기
    const data = await fetch('./data/BUILDING_hwaseong_lowdata.json');
    //const data = await fetch('./data/testdata789.json');
  
    // JSON으로 해석
    const obj = await data.json();
  
  
    console.log(obj);  // 결과: {name: "A학교", classes: Array(2)}
  
    const geometry = maptalks.GeoJSON.toGeometry(obj);
    if (geometry) {
      geometry.forEach(e => {
        //console.log(e);
        //style
        e.setSymbol({
          /*
          'markerType' : 'ellipse',
          'markerFill' : '#0e595e',
          'markerFillOpacity' : 0.4,
          'markerLineWidth' : 2,
          'markerLineColor' : 'white',
          'markerWidth' : 20,
          'markerHeight' : 20,
          */
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
        }).on('mouseout', function (g) {
          g.target.updateSymbol({
            polygonFill: 'rgb(135,196,240)',
            //lineColor: '#34495e',
          });
        }).on('click', function (g) {
          g.target.openInfoWindow(e.coordinate);
          console.log(e);
        })
      });
    }
    layer.addGeometry(geometry);
  }

         // 파일 읽어 오기
        /*
        const data = await fetch('./data/BUILDING_hwaseong_lowdata.json');
        //const data = await fetch('./data/testdata789.json');
    
        // JSON으로 해석
        const obj = await data.json();
        console.log(obj);
    
        const geometry = maptalks.GeoJSON.toGeometry(obj);
        if (geometry) {
            layer.addGeometry(geometry);
        }
        */
        /*
        let reader = new FileReader();
        reader.onload = function(e) {
            console.log(e);
            //json = JSON.parse(e.target.result);
        }
        */



/**
 * 
 * 위도 경도
*/

//var pointLayer = new maptalks.VectorLayer('point').addTo(map);

document.getElementById('d_line').addEventListener('click',()=>{

  var lineLayer = new maptalks.VectorLayer('line').addTo(map);

  let pointcodi = [];
  
  map.on('click', function (e) {
      // 클릭 이벤트가 발생한 좌표를 얻습니다.
      var coordinate = e.coordinate;
      
      // 포인트 객체를 생성합니다.
      var point = new maptalks.Marker(
          coordinate,
          {
              symbol: {
                  markerType: 'ellipse',
                  markerWidth: 10,
                  markerHeight: 10,
                  markerFill: '#de3333',
                  markerLineWidth: 0
              }
          }
      );
  
      // 포인트 객체를 포인트 레이어에 추가합니다.
      //pointLayer.addGeometry(point);
      lineLayer.addGeometry(point);
      
      // 클릭한 지점을 저장합니다.
      pointcodi.push(coordinate);
  
      // 라인을 다시 그립니다.
      redrawLine();
  });
  
  let line;
  let redrawLine = function () {
      // 라인 객체를 생성합니다.
       line = new maptalks.LineString(pointcodi, {
          symbol: {
              lineColor: '#de3333',
              lineWidth: 3
          },
          properties: "hi",
      });
  
      // 라인 객체가 이전에 생성된 경우, 라인 레이어에서 해당 객체를 제거합니다.
      var oldLine = lineLayer.getGeometries()[0];
      if (oldLine) {
          lineLayer.removeGeometry(oldLine);
      }
  
      // 라인 객체를 라인 레이어에 추가합니다.
      lineLayer.addGeometry(line);
  
      //line 정보 geometry 변환
      let geojson = JSON.stringify(line.toGeoJSON());
      console.log(geojson);
      //html 삽입
      //document.getElementById('info').innerHTML = geojson;
  
      //DownloadJson(geojson)
  }

},false);


document.getElementById('d_point').addEventListener('click',()=>{

  var markerLayer = new maptalks.VectorLayer('marker').addTo(map);

  let pointcodi = [];
  
  map.on('click', function (e) {
      // 클릭 이벤트가 발생한 좌표를 얻습니다.
      var coordinate = e.coordinate;
      
      // 포인트 객체를 생성합니다.
      var point = new maptalks.Marker(
          coordinate,
          {
              symbol: {
                  markerType: 'ellipse',
                  markerWidth: 10,
                  markerHeight: 10,
                  markerFill: '#de3333',
                  markerLineWidth: 0
              }
          }
      );
  
      // 포인트 객체를 포인트 레이어에 추가합니다.
      //pointLayer.addGeometry(point);
      markerLayer.addGeometry(point);
      
      //line 정보 geometry 변환
      let geojson = JSON.stringify(point.toGeoJSON());
      console.log(geojson);

      // 클릭한 지점을 저장합니다.
      pointcodi.push(coordinate);

  });

},false);



function DownloadJson(LArr) {
  //let json = JSON.stringify(LArr);
  let blod = new Blob([LArr]);
  let link = document.createElement('a');
  link.href = window.URL.createObjectURL(blod);
  link.download = "testdata.geojson";
  link.click();
};

    /*
    let x = param.geometry._coordinates.x;
    let y = param.geometry._coordinates.y;
    point.push(new maptalks.Marker([x,y],{
      'symbol' : {
        //'textName' : String.fromCharCode(i),
        'textSize' : 30,
        'textFill' : 'White',
        'markerType' : 'ellipse',
        'markerFill' : '#0e595e',
        'markerFillOpacity' : 0.4,
        'markerLineWidth' : 2,
        'markerLineColor' : 'white',
        'markerWidth' : 20,
        'markerHeight' : 20
      }
    }));
    layer.addGeometry(point);
    */

    /*
// 사용 안함.
var point = new maptalks.Marker([0, 0]).addTo(layer);
var line = new maptalks.LineString([0, 0]).addTo(layer);
var polygon = new maptalks.Polygon([0, 0]).addTo(layer);
*/

/*
가능한 items 들
var items = ['Point', 'LineString', 'Polygon', 'Circle', 'Ellipse', 'Rectangle', 'FreeHandLineString', 'FreeHandPolygon']
*/

        
       /*
        layer.forEach(function (item) {
          item.on('mouseenter', function (g) {
            console.log(g)
            //     g.target.startEdit();
          })
        });
       */

                //pointdrawTool.disable();
        //linedrawTool.disable();
        //PolygondrawTool.disable();



        //file Load 
import fileLoad from './fileLoad.js';
import fileDownLoad from './fileDownLoad.js';
import distanceTool from './distanceTool.js';
import creategeom from './creategeom.js';


/**
 * 
 * create map
*/
/*
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
        }     
      ]
    }
  ]
}).addTo(map);
*/