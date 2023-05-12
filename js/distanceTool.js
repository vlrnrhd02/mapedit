const distanceTool = {
    linedistanceTool : function(map){
        return new maptalks.DistanceTool({
            'symbol': {
                'lineColor' : '#34495e',
                'lineWidth' : 2
              },
              'vertexSymbol' : {
                'markerType'        : 'ellipse',
                'markerFill'        : '#1bbc9b',
                'markerLineColor'   : '#000',
                'markerLineWidth'   : 3,
                'markerWidth'       : 10,
                'markerHeight'      : 10
              },
      
              'labelOptions' : {
                'textSymbol': {
                  'textFaceName': 'monospace',
                  'textFill' : '#fff',
                  'textLineSpacing': 1,
                  'textHorizontalAlignment': 'right',
                  'textDx': 15,
                  'markerLineColor': '#b4b3b3',
                  'markerFill' : '#000'
                },
                'boxStyle' : {
                  'padding' : [6, 2],
                  'symbol' : {
                    'markerType' : 'square',
                    'markerFill' : '#000',
                    'markerFillOpacity' : 0.9,
                    'markerLineColor' : '#b4b3b3'
                  }
                }
              },
              'clearButtonSymbol' :[{
                'markerType': 'square',
                'markerFill': '#000',
                'markerLineColor': '#b4b3b3',
                'markerLineWidth': 2,
                'markerWidth': 15,
                'markerHeight': 15,
                'markerDx': 20
              }, {
                'markerType': 'x',
                'markerWidth': 10,
                'markerHeight': 10,
                'markerLineColor' : '#fff',
                'markerDx': 20
              }],
              'language' : 'en-US',
              once : true
        }).addTo(map);;
    },
    polydistanceTool : function(map){
        return new maptalks.DistanceTool({
            'symbol': {
                'lineColor' : '#1bbc9b',
                'lineWidth' : 2,
                'polygonFill' : '#fff',
                'polygonOpacity' : 0.3
              },
              'vertexSymbol' : {
                'markerType'        : 'ellipse',
                'markerFill'        : '#34495e',
                'markerLineColor'   : '#1bbc9b',
                'markerLineWidth'   : 3,
                'markerWidth'       : 10,
                'markerHeight'      : 10
              },
              'labelOptions' : {
                'textSymbol': {
                  'textFaceName': 'monospace',
                  'textFill' : '#fff',
                  'textLineSpacing': 1,
                  'textHorizontalAlignment': 'right',
                  'textDx': 15
                },
                'boxStyle' : {
                  'padding' : [6, 2],
                  'symbol' : {
                    'markerType' : 'square',
                    'markerFill' : '#000',
                    'markerFillOpacity' : 0.9,
                    'markerLineColor' : '#b4b3b3'
                  }
                }
              },
              'clearButtonSymbol' :[{
                'markerType': 'square',
                'markerFill': '#000',
                'markerLineColor': '#b4b3b3',
                'markerLineWidth': 2,
                'markerWidth': 15,
                'markerHeight': 15,
                'markerDx': 22
              }, {
                'markerType': 'x',
                'markerWidth': 10,
                'markerHeight': 10,
                'markerLineColor' : '#fff',
                'markerDx': 22
              }],
              language: 'en-US',
              once : true
        }.addTo(map))
    }
   
}

export default distanceTool;