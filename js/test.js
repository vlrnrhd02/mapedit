/*

//maptalk customtool
class CustomTool extends maptalks.MapTool {
    
  onEnable() {
      this._markerLayer = new maptalks.VectorLayer('CustomTool_layer')
        .addTo(this.getMap());
    }

    onDisable() {
      if (this._markerLayer) {
        this._markerLayer.remove();
      }
    }
    getEvents() {
      return {
        'click': this._onClick,
        'contextmenu': this._onRightClick
      };
    }
    _onClick(param) {
      this._markerLayer.addGeometry(new maptalks.Marker(param.coordinate));
    }
    _onRightClick(param) {
        //let geojson = JSON.stringify(this._markerLayer.toGeoJSON());
        //console.log(new maptalks.VectorLayer('CustomTool_layer'));
        console.log(JSON.stringify(maptalks.Layer.fromJSON(map.getLayer('vector').toJSON())))
        drawTool.disable();
        //this._markerLayer.clear();
    }
  }
  var customTool = new CustomTool().addTo(map);
  
//다운로드 방식 1
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
  //다운 방식 2
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

//draw tool set mode
//
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
      }
  */

