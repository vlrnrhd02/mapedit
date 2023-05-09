/**
 * 
 * 맵을 생성합니다 ~ 
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

/**
 * 
 * zoomcontrol 입니다~!
*/
var zoomControl = new maptalks.control.Zoom({
  'position'  : 'top-right',
  'slider'    : true,
  'zoomLevel' : true
}).addTo(map);

var layer = new maptalks.VectorLayer('vector').addTo(map);

//download를 위한 빈배열
var resultlayer = [{
  "id": "document",
  "version": "1.0"
}];

var drawTool = new maptalks.DrawTool({
  mode: 'Point',
    symbol: {

    },

  mode: 'LineString',
    symbol: {
      'lineColor' : '#1bbc9b',
      'lineWidth' : 6,
      'lineJoin'  : 'round', //miter, round, bevel
      'lineCap'   : 'round', //butt, round, square
      'lineDasharray' : null,//dasharray, e.g. [10, 5, 5]
      'lineOpacity ' : 1
    },
    mode: 'Polygon',
    symbol: {
      'lineColor' : '#000',
      'lineWidth' : 5
    }
}).addTo(map).disable();

/**
 * 
 * layer에 좌표를 추가해줍니다~
*/
drawTool.on('drawend', function (param) {
  console.log(param.geometry)
  console.log(param.geometry.toGeoJSON());
  resultlayer.push(param.geometry.toGeoJSON());
  
  layer.addGeometry(param.geometry);
});

/**
 * 
 * 아이템을 담아주고 enable() 솏성을 부여해 그리기가 가능하도록합니다~
*/
var items = ['Point', 'LineString', 'Polygon'].map(function (value) {
  return {
    item: value,
    click: function () {
      drawTool.setMode(value).enable();
    }
  };
});

/**
 * 
 * html에 toolbar를 만들어 줍니다~
*/
var toolbar = new maptalks.control.Toolbar({
  items: [
    {
      item: '편집모드',
      children: items
    },
    {
      item: '편집모드중지',
      click: function () {
        drawTool.disable();
      }
    },
    {
      item: '편집모드 제거',
      click: function () {
        //layer.clear();
        /**
         * 
         * 이건 폴리곤이나 라인일때 그런듯.. 
        */
        layer.removeGeometry(layer.getLastGeometry());
        resultlayer.pop();
        console.log(resultlayer.length, resultlayer);
      }
    },
    {
      item: 'download',
      click: function () {
        console.log(resultlayer.length);
        download('on.json', JSON.stringify(resultlayer));
        resultlayer = [];
      }
    },
    {
      item: 'loadGeoJson',
      click: function () {

      }
    },
    {
      item: 'cleatAll',
      click: function () {
        console.log(resultlayer.length);
        layer.clear();
        resultlayer = [];
      }
    }
  ]
}).addTo(map);

function download(name, data) {
  var urlobject = window.URL || window.webkitURL || window;

  var downloadData = new Blob([data]);

  var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
  save_link.href = urlobject.createObjectURL(downloadData);
  save_link.download = name;
  fake_click(save_link);

}

function fake_click(obj) {
  var ev = document.createEvent("MouseEvents");
  ev.initMouseEvent(
    "click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
  );
  obj.dispatchEvent(ev);
}