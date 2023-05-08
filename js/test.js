class CustomTool extends maptalks.MapTool {
  /*  
  onEnable() {
      this._markerLayer = new maptalks.VectorLayer('CustomTool_layer')
        .addTo(this.getMap());
    }

    onDisable() {
      if (this._markerLayer) {
        this._markerLayer.remove();
      }
    }
    */
    getEvents() {
      return {
        'click': this._onClick,
        'contextmenu': this._onRightClick
      };
    }
    /*
    _onClick(param) {
      this._markerLayer.addGeometry(new maptalks.Marker(param.coordinate));
    }
    */
    _onRightClick(param) {
        //let geojson = JSON.stringify(this._markerLayer.toGeoJSON());
        //console.log(new maptalks.VectorLayer('CustomTool_layer'));
        console.log(JSON.stringify(maptalks.Layer.fromJSON(map.getLayer('vector').toJSON())))
        drawTool.disable();
        //this._markerLayer.clear();
    }
  }

  var customTool = new CustomTool().addTo(map);