/*
var options = {
    folder: '다운로드',
}
*/

var shpdownopt = {
    folder: 'shapefile',
    types: {
        /*
        point: 'Point',
        polygon: 'Polygon',
        line: 'LineString'
        */
        point: 'mypoints',
        polygon: 'mypolygons',
        line: 'mylines'
    }
}



const fileDownLoad = {

    getGeoJsonFromLayer: function(layer){
        //let geolist = layer._geoList
        const features = [];
        layer.forEach(function (item) {
            const feature = item.toGeoJSON();
            features.push(feature);
        });
        const featureCollection = {
            type: 'FeatureCollection',
            features: features,
            properties: '1'
        };
        const geojson = JSON.stringify(featureCollection);
        return(geojson);
    },

    DownloadJson : function(LArr) {
        //let self = this;
        let geojson = fileDownLoad.getGeoJsonFromLayer(LArr);
        //let json = JSON.stringify(LArr);
        let blod = new Blob([geojson]);
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blod);
        link.download = "data.json";
        link.click();
    },
    DownloadGeojson : function(LArr) {
        //let json = JSON.stringify(LArr);
        let geojson = fileDownLoad.getGeoJsonFromLayer(LArr);
        let blod = new Blob([geojson]);
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blod);
        link.download = "data.geojson";
        link.click();
    },
    
    DownloadShp : function(layer) {
        let self = this;
        //let geojson = this.getGeoJsonFromLayer(window.app.MTmap.getLayer('vector'));
        let geojson = this.getGeoJsonFromLayer(layer);
        console.log(geojson);
        if(geojson){
            var options = {
                folder: 'myshapes',
                types: {
                    point: 'mypoints',
                    polygon: 'mypolygons',
                    line: 'mylines'
                }
            }
            shpwrite.download(geojson,options).then(function(){
            let blob = self.Base64ToBlob('data:application/zip;base64,' + content)
            saveAs(blob, 'export.zip');
        });
        }
        
    },

    mapEventListener : function(map){
        map.on('click', function (e) {
            map.identify(
                function (geos){
                    if (geos.length === 0) {
                        return;
                    }

                    g.forEach(function (g){
                        console(g);
                    });

                }
            )
        })
    }
    
}

export default fileDownLoad;
