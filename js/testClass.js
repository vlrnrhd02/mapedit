/** export download class*/


//껍데기 class js file 하나를 두고 그거를 html로 박아놈..
//그후에 전역으로 뭐시기 저시기 저기기 계속 선언해서씀.. 실제 부분에는 어쩌구 저쩌구로 
export default class Newdownload {
    constructor(layer){
        this.layer = layer;
    }

    getGeoJsonFromLayer() {
        
        const features = [];
        this.layer.forEach(function (item) {
            const feature = item.toGeoJSON();
            features.push(feature);
        });
        const featureCollection = {
            type: 'FeatureCollection',
            features: features,
            properties: '1'
        };
        const geojson = JSON.stringify(featureCollection);
        console.log(geojson);
        return(geojson);
    }
}