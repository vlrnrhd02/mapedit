const creategeom = {

    properties: {

    },

    createpoint: function(map, layer){
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
    },

    addpoint : function(lng, lat, name, img, w = 50, h = 36, type= "", id = ""){
        let symbol = {
            properties: {
                name: name,
                type: type,
                id: id,
            },
            symbol: [
                {
                    markerFile: img,
                    markerWidth: w,
                    markerHeight: h,
                },
                {
                    textFaceName: "sans-serif",
                    textname: name,
                    textSize: 12,
                    textDy: -26,
                    textFill: "#fff",
                },
            ],
        }
    }

}
export default creategeom;