
//shp.zip file을 로드하는 함수
function readZipFile(file) {
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



const fileLoad = {

    loadjson: async function(file, layer){
        try {
            new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.onload = async (event) => {
                    console.log(event);
                    
                    var data = maptalks.GeoJSON.toGeometry(fileReader.result);
                    console.log(data)
                    layer.addGeometry(data);
                    resolve()
                }
                fileReader.readAsText(file);
            });
        } catch (error) {
            alert(error);
            console.log(error);
        }

 
    },

    loadshpzip : function(file, layer){
        try {
            new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.onload = (event) => {
                const arrayBuffer = event.target.result;
                shp(arrayBuffer).then((data) => {
                    console.log(data);
                    layer.addGeometry(data);
                    resolve();
                }).catch((error) => {
                    reject(error);
                });
                };
                fileReader.readAsArrayBuffer(file);
            });
        } catch (error) {
            alert(error);
            console.log(error);
        }
    } 


}


export default fileLoad; 