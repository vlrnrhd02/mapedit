
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


