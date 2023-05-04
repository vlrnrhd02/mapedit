/**
 * 
 * create map
*/

var map = new maptalks.Map('map', {
    center: [126.9,37.5],
    zoom: 15,
    baseLayer: new maptalks.TileLayer('base', {
      urlTemplate: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      subdomains: ["a","b","c","d"],
      attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
    }),
    /*
    layers : [
        new maptalks.VectorLayer('v')
    ]
    */
});



/**
 * 
 * toolbarcontrol
*/

// horizonal one on top left
/*
new maptalks.control.Toolbar({
'position' : 'top-left',
'items'     : [{
    item: 'menu',
    click : function () { info('menu'); },
    children : [{
    item: 'child 1',
    click : function () { info('child 1'); }
    }, {
    item: 'child 2',
    click : function () { info('child 2'); }
    }]
}, {
    item: 'load shp.zip',
    click : function () { info('load shp.zip'); }
}, {
    item: 'item 3',
    click : function () { info('item 3'); }
}]
})
.addTo(map);
*/