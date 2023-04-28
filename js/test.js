/**
 * 
 * click event re
*/


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
        console.log(param);
        this._markerLayer.addGeometry(new maptalks.Marker(param.coordinate));
    }
    
    _onRightClick(param) {
        this._markerLayer.clear();
        let d = JSON.stringify(this._markerLayer.toGeoJSON());
        console.log(d);
    }

}

var customTool = new CustomTool().addTo(map);