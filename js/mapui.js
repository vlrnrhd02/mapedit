/**
 * 
 * create map
*/

var map = new maptalks.Map('map', {
    center: [126.9,37.5],
    zoom: 15,
    baseLayer: new maptalks.TileLayer('base', {
      urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      subdomains: ["a","b","c","d"],
      attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
    }),
    
});

var layer = new maptalks.VectorLayer('vector').addTo(map);

layer.on('click', function (e) {
    console.log(e);
    //reset colors
    /*
    layer.forEach(function (g) {
    console.log(g);
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
    */
  });

var drawTool = new maptalks.DrawTool({
  mode: 'Point'
}).addTo(map).disable();

drawTool.on('drawend', function (param) {
  console.log(param.geometry);
  layer.addGeometry(param.geometry);
});

console.log(layer);



var items = ['Point', 'LineString', 'Polygon', 'Circle', 'Ellipse', 'Rectangle', 'FreeHandLineString', 'FreeHandPolygon'].map(function (value) {
  return {
    item: value,
    click: function () {
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
      item: 'Shape',
      children: items
    },
    {
      item: 'Disable',
      click: function () {
        drawTool.disable();
      }
    },
    {
      item: 'Clear',
      click: function () {
        layer.clear();
      }
    },
    {
        item: 'download',
        click: function () {
          console.log(JSON.stringify(maptalks.Layer.fromJSON(map.getLayer('vector').toJSON())));

          let geojson = JSON.stringify(maptalks.Layer.fromJSON(map.getLayer('vector').toJSON()));
          DownloadJson(geojson) 
        }
    },
    {
        item: 'loadGeoJson',
        click: function () {
          console.log(JSON.stringify(maptalks.Layer.fromJSON(map.getLayer('vector').toJSON())));

          let geojson = JSON.stringify(maptalks.Layer.fromJSON(map.getLayer('vector').toJSON()));
          DownloadJson(geojson) 
        }
    }
  ]
}).addTo(map);
/*
const jsonData= require('./testdata.geojson'); 
console.log(jsonData);
*/
function DownloadJson(LArr) {
    //let json = JSON.stringify(LArr);
    let blod = new Blob([LArr]);
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(blod);
    link.download = "testdata.geojson";
    link.click();
};

