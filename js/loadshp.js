/**
 * 
 * shp.zip file을 로드하는 함수
*/
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


/**
 * 
 * 사용자 pc의 shpfile zip 형식의 파일을 로드하여 화면에 표출
*/
const fileInput = document.getElementById("file-input");

fileInput.addEventListener("change", async (e) => {

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
            
            let shplayer = new maptalks.VectorLayer({
                visible : true,
                editable : true,
                cursor : 'pointer',
                draggable : false,
                dragShadow : false, // display a shadow during dragging
                drawOnAxis : null,  // force dragging stick on a axis, can be: x, y
                symbol: {
                  'lineColor' : '#34495e',
                  'lineWidth' : 25,
                  'polygonFill' : 'rgb(255,255,255)',
                  'polygonOpacity' : 0.6
                }
            });
            shplayer.addGeometry(geojson.features);
            map.addLayer(shplayer);

        } catch (error) {
            alert(error);
            console.log(error);
        }
    }    
})