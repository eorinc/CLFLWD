// // Javascript by Sarah Grandstrand with EOR Inc//

// THIS Main works but overloads browser with ajax requests; changed to Https and commented out a bunch of data //


var light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2dyYW5kc3RyYW5kIiwiYSI6ImNqY3BtMm52MjJyZWsycXBmMDZremxsN3EifQ.3HVgf9jrNbmCSBBBlp5zlQ', {

    //                        pk.eyJ1IjoicHNteXRoMiIsImEiOiJjaXNmNGV0bGcwMG56MnludnhyN3Y5OHN4In0.xsZgj8hsNPzjb91F31-rYA
    //    id: 'mapbox.streets',
    id: 'mapbox.light',
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
});

var dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2dyYW5kc3RyYW5kIiwiYSI6ImNqY3BtMm52MjJyZWsycXBmMDZremxsN3EifQ.3HVgf9jrNbmCSBBBlp5zlQ', {
    id: 'mapbox.dark',
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
});

var imagery = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2dyYW5kc3RyYW5kIiwiYSI6ImNqY3BtMm52MjJyZWsycXBmMDZremxsN3EifQ.3HVgf9jrNbmCSBBBlp5zlQ', {
    id: 'mapbox.satellite',
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
});



var mapOptions = {
    zoomControl: false,
    center: [46.35, -94.8], // large screens
    //    center: [46.35, -93.5],
    zoomSnap: 0.25,
    zoomDelta: 0.25,
    zoom: 6.5,
    minZoom: 3,
    maxZoom: 18,
    layers: [light],
    //    loadingControl: true
};


var map = L.map('mapid', mapOptions);


L.control.scale({
    position: 'bottomright',
    metric: false
}).addTo(map);


var zoomHome = L.Control.zoomHome({
    position: 'topleft'
});
zoomHome.addTo(map);

var zoomboxOptions = {
    modal: true,
    title: "Box area zoom",
    zoomSnap: 0.25
};
var zoomboxControl = L.control.zoomBox(zoomboxOptions);
map.addControl(zoomboxControl);

var baseMaps = {
    "Light": light,
    "Dark": dark,
    "Imagery": imagery
}
L.control.layers(baseMaps, null).addTo(map);

// bottom left or topleft?? ask
var loadingControl = L.Control.loading({
    separate: true,
    position: 'bottomleft'
});
map.addControl(loadingControl);

L.easyButton('fa-crosshairs fa-lg', function (btn, map) {
    map.fitBounds(distBound.getBounds());
}).addTo(map);



// Leaflet Browser Print

L.control.browserPrint({
    title: 'Print Map',
    documentTitle: 'Comfort Lake Forest Lake Watershed District 1W1P',
    closePopupsOnPrint: false,
    printModes: [
		"Landscape",
		"Portrait",
        L.control.browserPrint.mode.portrait("Tabloid Portrait", "tabloid"),
//		L.control.browserPrint.mode.auto()
	],
    manualMode: false,
    position: 'topright'
}).addTo(map);

map.on("browser-print-end", function (e) {
    postPrintLegend();
    sidebar.open('home');
});

map.on("browser-print-start", function (e) {
    sidebar.close('home');
    L.control.scale({
        position: 'bottomright',
        metric: false,
        maxWidth: 200
    }).addTo(e.printMap);
    addPrintLegend(e);
    L.latlngGraticule({
        showLabel: true,
        dashArray: [5, 5],
        zoomInterval: [
            {
                start: 3,
                end: 3,
                interval: 30
            },
            {
                start: 4,
                end: 5,
                interval: 20
            },
            {
                start: 5,
                end: 7,
                interval: 10
                },
            {
                start: 7,
                end: 9,
                interval: 1
                },
            {
                start: 9,
                end: 11.25,
                interval: .5
                },
            {
                start: 11.25,
                end: 14,
                interval: .1
                },

            {
                start: 14,
                end: 15,
                interval: .05
        },
            {
                start: 15,
                end: 18,
                interval: .005
        }
                            ]
    }).addTo(e.printMap);

});


//L.Control.BrowserPrint.Utils.registerLayer(
//    // Actual typeof object to compare with
//    L.esri.featureLayer,
//    // Any string you would like for current function for print events
//    'L.esri.featurelayer',
//    function (layer, utils) {
//        // We need to recreate cluster object with available options
//        // Here we use function, but we can use object aswell,
//        // example: new L.MarkerClusterGroup(layer._group.options);
//        var cluster = L.esri.featureLayer(layer._arcgisToGeoJSON(), utils.cloneOptions(layer.options));
//
//        // And we clone all inner layers to our new cluster
//        // to properly recalculate/recreate position for print map
//        //        cluster.addLayers(utils.cloneInnerLayers(layer._group));
//
//        return cluster;
//    });
////this.registerLayer(L.GeoJSON, 'L.GeoJSON', function(layer, utils) { 				return L.geoJson(layer.toGeoJSON(), utils.cloneOptions(layer.options)); });
////Create sidebar function
////function createSidebar() {
////    var sidebar = L.control.sidebar('sidebar').addTo(map);
////    sidebar.open('home');
////}
var sidebar = L.control.sidebar('sidebar').addTo(map);


//// URL's for Layers ////


var a_distBound = 'clflwd:LkMgt_Dist_7_17';
//var url_distBound = 'https://post.eorinc.com/geoserver/clflwd/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=clflwd%3ALkMgt_Dist_7_17&outputFormat=text%2Fjavascript&format_options=callback%3AclflwdLkMgt_Dist_7_17&SrsName=EPSG%3A4326';

var a_cntyCLFL = 'clflwd:cntybnds_clfl_mv';
var a_imptStrm = 'minnesota:impaired_streams_mview'; //Impaired streams
//var url_imptStrm = 'https://post.eorinc.com/geoserver/minnesota/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=minnesota%3Aimpaired_streams_mview&outputFormat=text%2Fjavascript&format_options=callback%3Aminnesotaimpaired_streams_mview&SrsName=EPSG%3A4326';
var a_impLks = 'minnesota:impaired_lakes_mview'; //Impaired Lakes
//var url_impLks = 'https://post.eorinc.com/geoserver/minnesota/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=minnesota%3Aimpaired_lakes_mview&outputFormat=text%2Fjavascript&format_options=callback%3Aminnesotaimpaired_lakes_mview&SrsName=EPSG%3A4326';
var a_altwtr = 'minnesota:altr_wtrcrse_mview'; // Altered Watercourse
//var url_altwtr = 'https://post.eorinc.com/geoserver/minnesota/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=minnesota%3Aaltr_wtrcrse_mview&outputFormat=text%2Fjavascript&format_options=callback%3Aminnesotaaltr_wtrcrse_mview&SrsName=EPSG%3A4326';
var a_phos = 'minnesota:lakes_of_phosphorus_sensitivity'; // lake phosophorus sensitivity significance 
//var url_phos = 'https://post.eorinc.com/geoserver/minnesota/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=minnesota%3Alakes_of_phosphorus_sensitivity&outputFormat=text%2Fjavascript&format_options=callback%3Aminnesotalakes_of_phosphorus_sensitivity&SrsName=EPSG%3A4326';

var a_wellhead = 'minnesota:wellhead_protection_areas'; //Well Head Protection Areas
//var url_wellhead = 'https://post.eorinc.com/geoserver/minnesota/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=minnesota%3Awellhead_protection_areas&outputFormat=text%2Fjavascript&format_options=callback%3Aminnesotawellhead_protection_areas&SrsName=EPSG%3A4326';




// index layers //
var a_bioIndex = "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Characteristics_HawkCrk/FeatureServer/0"; //20Bio Index Mean
var a_hydIndex = "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Characteristics_HawkCrk/FeatureServer/2"; //21Hyd Index Mean
var a_geoIndex = "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Characteristics_HawkCrk/FeatureServer/3"; //22Geo Index Mean
var a_conIndex = "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Characteristics_HawkCrk/FeatureServer/1"; //23Con Index Mean
var a_wQIndex = "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Characteristics_HawkCrk/FeatureServer/4"; //24WQ index Mean
var a_combIndex = "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Characteristics_HawkCrk/FeatureServer/5"; //25combined index mean

// Misc. layers



var a_bedrockPoll = 'minnesota:bedrocksurface_pollutionsensitivity'; //bedrock surface pollution sensitivity
//var url_bedrockPoll = 'https://post.eorinc.com/geoserver/minnesota/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=minnesota%3Abedrocksurface_pollutionsensitivity&outputFormat=text%2Fjavascript&format_options=callback%3Aminnesotabedrocksurface_pollutionsensitivity&SrsName=EPSG%3A4326';

var a_easemnts = 'minnesota:bdry_bwsr_rim_cons_easements'; // conservation easements
//var url_easemnts = 'https://post.eorinc.com/geoserver/minnesota/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=minnesota%3Abdry_bwsr_rim_cons_easements&outputFormat=text%2Fjavascript&format_options=callback%3Aminnesotabdry_bwsr_rim_cons_easements&SrsName=EPSG%3A4326';

var a_lkes = 'minnesota:assessed_2018_lakes'; // Assessed Lakes 2018
//var url_lkes = 'https://post.eorinc.com/geoserver/minnesota/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=minnesota%3Aassessed_2018_lakes&outputFormat=text%2Fjavascript&format_options=callback%3Aminnesotaassessed_2018_lakes&SrsName=EPSG%3A4326';
var a_strms = 'minnesota:assessed_2018_streams';
// Assessed Streams 2018
//var url_strms = 'https://post.eorinc.com/geoserver/minnesota/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=minnesota%3Aassessed_2018_streams&outputFormat=text%2Fjavascript&format_options=callback%3Aminnesotaassessed_2018_streams&SrsName=EPSG%3A4326';



/// *** RASTER LAYERS ***////

//var a_nLCD = "https://tiles.arcgis.com/tiles/qD3r7SBXBrdOL2aI/arcgis/rest/services/RaterLayersCLFLWD/MapServer/5";
////http: //post.eorinc.com:8080/geoserver/clflwd_rasters/wms?service=WMS&version=1.1.0&request=GetMap&layers=clflwd_rasters%3Anlcd_clflwd&styles=clflwd_rasters:nlcd_clflwd&bbox=-93.02450390190104%2C45.22153336161909%2C-92.79899204206393%2C45.3348574786229&width=768&height=385&srs=EPSG%3A4326&format=image%2Fjpeg
//// national land cover data 2016
//
//var a_wildLife = "https://tiles.arcgis.com/tiles/qD3r7SBXBrdOL2aI/arcgis/rest/services/RaterLayersCLFLWD/MapServer/2"; // Wildlife Habitat Quality Risk
//
var a_pollsens = 'clflwd_rasters:nrsfsn_clflwd'; //Pollution Sensitivity of Near-Surface Materials
var style_pollsens = 'clflwd_rasters:nrsfsn_clflwd_qgisStyle'



//var a_waterQual = "https://tiles.arcgis.com/tiles/qD3r7SBXBrdOL2aI/arcgis/rest/services/RaterLayersCLFLWD/MapServer/3"; //Water Quality Risk
//
//var a_soil = "https://tiles.arcgis.com/tiles/qD3r7SBXBrdOL2aI/arcgis/rest/services/RaterLayersCLFLWD/MapServer/4"; //Soil Erosion Risk
//
//var a_envBen = "https://tiles.arcgis.com/tiles/qD3r7SBXBrdOL2aI/arcgis/rest/services/RaterLayersCLFLWD/MapServer/6"; //Environmental Risk Index
//
//var a_pollsensGradient =
//    "https://tiles.arcgis.com/tiles/qD3r7SBXBrdOL2aI/arcgis/rest/services/RaterLayersCLFLWD/MapServer/0";
////    "https://tiles.arcgis.com/tiles/HRPe58bUyBqyyiCt/arcgis/rest/services/PollutionSens_Gradient/MapServer"
////Pollution Sensitivity of Near-Surface Materials Gradient

// URL for Raster CLFLWD layers
// get url dynamically with this function;
function getRast_CLFL_URL(map, layername, stylename, latlng) {
    var map_width = map.getSize().x;
    var map_height = map.getSize().y;
    var map_bbox = map.getBounds().toBBoxString()
    var geoserverRoot = "https://post.eorinc.com/geoserver/clflwd_rasters/ows";
    var defaultParameters = {
        service: 'WMS',
        version: '1.1.1',
        request: 'GetMap',
        layers: layername,
        styles: stylename,
        format: 'image/png',
        transparent: true,
        height: map_height,
        width: map_width,
        bbox: map_bbox,
        format_options: 'callback:' + layername.replace(":", ""), //had to do this because otherwise each callback wasn't unique and wouldn't load multiple layers ///not sure if this needs to be callback:processJson. that could be old documentation. 
        CRS: 'EPSG:4326'
    };
    //    var customParms = {
    //        bbox: map.getBounds().toBBoxString()
    //    };
    var parameters = L.Util.extend(defaultParameters);
    var URL = geoserverRoot + L.Util.getParamString(parameters);
    console.log('this is the url: ', URL);
    return URL;
};

// URL for CLFLWD layers
// get url dynamically with this function; NOT SURE IF NEED TO USE THIS?
function getCLFL_URL(layername) {
    var geoserverRoot = "https://post.eorinc.com/geoserver/clflwd/ows";
    var defaultParameters = {
        service: 'WFS',
        version: '2.0.0',
        request: 'GetFeature',
        typeName: layername,
        outputFormat: 'text/javascript',
        format_options: 'callback:' + layername.replace(":", ""), //had to do this because otherwise each callback wasn't unique and wouldn't load multiple layers ///not sure if this needs to be callback:processJson. that could be old documentation. 
        SrsName: 'EPSG:4326'
    };
    //    var customParms = {
    //        bbox: map.getBounds().toBBoxString()
    //    };
    var parameters = L.Util.extend(defaultParameters);
    var URL = geoserverRoot + L.Util.getParamString(parameters);
    //    console.log('this is the url: ', URL);
    return URL;
};
//
//// URL for Minnesota layers
// get url dynamically with this function
function getMN_URL(layername) {
    var geoserverRoot = "https://post.eorinc.com/geoserver/minnesota/ows";
    var defaultParameters = {
        service: 'WFS',
        version: '2.0.0',
        request: 'GetFeature',
        typeName: layername,
        outputFormat: 'text/javascript',
        format_options: 'callback:' + layername.replace(":", ""), //had to do this because otherwise each callback wasn't unique and wouldn't load multiple layers ///not sure if this needs to be callback:processJson. that could be old documentation. 
        SrsName: 'EPSG:4326',
        // This is the bounding box of the counties surrounding CLFLWD districts. Using this to limit the features shown. 
        bbox: '-93.51250164,44.74589554,-92.64645106,45.73104577, EPSG:4326'
    };
    //    var customParms = {
    //        bbox: map.getBounds().toBBoxString()
    //    };
    //    console.log(map.getBounds().toBBoxString());
    var parameters = L.Util.extend(defaultParameters);
    var URL = geoserverRoot + L.Util.getParamString(parameters);
    //    console.log('this is the url: ', URL);
    return URL;
};


/////*** BOUNDARY LAYERS ****\\\\

// id  is distbound_layer
var distBound;
var url_distBound = getCLFL_URL(a_distBound);
$.ajax({
    url: url_distBound,
    dataType: 'jsonp',
    jsonpCallback: a_distBound.replace(":", ""),
    success: function (response) {
        distBound = L.geoJson(response, {
            attribution: '',
            interactive: true,
            //            layerName: 'distBound',
            style: styledistBound,
            onEachFeature: function (feature, layer) {
                layer.bindPopup('<p><b><i> District: </b>' + feature.properties.lkmgtdist + '</i></p>');
            },
        });
        map.addLayer(distBound);
    }

}); //end of call for distBound variable


//var cntyCLFL;
//var url_cntyCLFL = getCLFL_URL(a_cntyCLFL);
//$.ajax({
//    url: url_cntyCLFL,
//    dataType: 'jsonp',
//    jsonpCallback: a_cntyCLFL.replace(":", ""),
//    success: function (response) {
//        cntyCLFL = L.geoJson(response, {
//            attribution: '',
//            interactive: true,
//            //            layerName: 'distBound',
//        });
//        map.addLayer(cntyCLFL);
//        console.log(cntyCLFL.getBounds().toBBoxString());
//        //-93.51250164,44.74589554,-92.64645106,45.73104577
//
//    }
//
//}); //end of call for cntyCLFL variable


// id is wellhead_layer
var wellhead;
var url_wellhead = getMN_URL(a_wellhead);
var lkes;
var url_lkes = getMN_URL(a_lkes);
var strms;
var url_strms = getMN_URL(a_strms);



////// *** Groundwater Layers *** /////
//var pollsens;
var url_pollsens = getRast_CLFL_URL(a_pollsens, style_pollsens);
var pollsens = L.tileLayer.wms(url_pollsens).addTo(map);
//$.ajax({
//    url: url_pollsens,
//    dataType: 'jsonp',
//    jsonpCallback: a_pollsens.replace(":", ""),
//    success: function (response) {
//        pollsens = L.tileLayer.wms(response, {
//            attribution: ''
//        });
//        map.addLayer(pollsens);
//    }
//}); // end of raster pollsens
//var pollsens = L.tileLayer.wms(url_pollsens).addTo(map);
//var source = L.WMS.Source.extend({
//    'ajax': function (url_pollsens, callback) {
//        $.ajax(url_pollsens, {
//            'context': this,
//            'success': function (result) {
//                callback.call(this, result);
//            }
//        });
//    },
//    'showFeatureInfo': function (latlng, info) {
//        $('.output').html(info);
//    }
//});


////// *** Biodiversity Layers *** /////



////// *** Watershed Characterization Layers *** /////

var bioIndex = L.esri.featureLayer({
    url: a_bioIndex,
    style: styleBioIndex,
    onEachFeature: function (feature, layer) {
        layer.bindPopup('<p><b> Bio Index Mean: ' + feature.properties.B_I_MEAN + '</b></p>');
    },
});
var hydIndex = L.esri.featureLayer({
    url: a_hydIndex,
    style: styleHydIndex,
    onEachFeature: function (feature, layer) {
        layer.bindPopup('<p><b> Hyd Index Mean: ' + feature.properties.H_I_MEAN + '</b></p>');
    },
});
var geoIndex = L.esri.featureLayer({
    url: a_geoIndex,
    style: styleGeoIndex,
    onEachFeature: function (feature, layer) {
        layer.bindPopup('<p><b> Geo Index Mean: ' + feature.properties.G_I_MEAN + '</b></p>');
    },
});
var conIndex = L.esri.featureLayer({
    url: a_conIndex,
    style: styleConIndex,
    onEachFeature: function (feature, layer) {
        layer.bindPopup('<p><b> Con Index Mean: ' + feature.properties.C_I_MEAN + '</b></p>');
    },
});
var wQIndex = L.esri.featureLayer({
    url: a_wQIndex,
    style: styleWQIndex,
    onEachFeature: function (feature, layer) {
        layer.bindPopup('<p><b> Water Quality Index Mean: ' + feature.properties.W_I_MEAN + '</b></p>');
    },
});
var combIndex = L.esri.featureLayer({
    url: a_combIndex,
    style: styleCombIndex,
    onEachFeature: function (feature, layer) {
        layer.bindPopup('<p><b> Combined Index Mean: ' + feature.properties.A_I_MEAN + '</b></p>');
    },
});




/////*** Misc. layers ***/////



/// STYLE FUNCTIONS
function styledistBound(feature) {
    type = feature.properties.lkmgtdist;
    var colorToUse;
    if (type === "Little Comfort") colorToUse = '#ffffbe';
    else if (type === "Bone") colorToUse = '#d3ffbe';
    else if (type === "Comfort") colorToUse = '#e8beff';
    else if (type === "Forest") colorToUse = '#ffbebe';
    else colorToUse = "transparent";

    return {
        "color": '#000000',
        "fillColor": colorToUse,
        "weight": 3,
        "fillOpacity": 0.8,
        opacity: 0.2,

    };
}

function stylewellhead(feature) {
    return {
        "color": "#a65628",
        "fillColor": "#a65628",
        "weight": 2,
        "fillOpacity": 0.8,
        "opacity": 1,
    };
}

function styleGradientwellhead(feature) {
    return {
        //        "color": "rgb(0,109,44)",
        //        "fillColor": "rgb(0,109,44)",
        "color": "#006d2c",
        "fillColor": "#006d2c",
        "weight": 2,
        "fillOpacity": 0.8,
        "opacity": 1,

    };
}



function styleAltWtr(feature) {
    type = feature.properties.awevttype;
    var colorToUse;
    if (type === 1) colorToUse = '#f5605d';
    else if (type === 2) colorToUse = '#38a800';
    else if (type === 3) colorToUse = '#c300ff';
    else if (type === 4) colorToUse = '#9c9c9c';
    else colorToUse = "transparent";

    return {
        "color": colorToUse,
        "opacity": 1,
    };
}

function styleGradientAltWtr(feature) {
    type = feature.properties.awevttype;
    var colorToUse;
    if (type === 1) colorToUse = '#084594';
    else colorToUse = "transparent";

    return {
        "color": colorToUse,
        "opacity": 1,
    };
}



function styleimptStrm(feature) {
    return {
        "color": "#8c0007",
        "opacity": 1,
    };
}

function styleGradientimptStrm(feature) {
    return {
        "color": "#67000d",
        "opacity": 1,
    };
}

function styleimpLks(feature) {
    return {
        "color": "#002366",
        "fillColor": "#002366",
        "fillOpacity": 0.8,
        "opacity": 1,
    };
}

function styleGradientimpLks(feature) {
    return {
        "color": "#67000d",
        "fillColor": "#67000d",
        "fillOpacity": 0.8,
        "opacity": 1,
    };
}

function stylePhos(feature) {
    type = feature.properties.lpss_class;
    var colorToUse;
    if (type === "Highest") colorToUse = '#002673';
    else if (type === "Higher") colorToUse = '#005ce6';
    else if (type === "High") colorToUse = '#a1ceff';
    else if (type === "Impaired") colorToUse = 'red';
    else colorToUse = "transparent";

    return {
        "color": colorToUse,
        "fillColor": colorToUse,
        "weight": 2,
        "opacity": 1,
        "fillOpacity": 0.8
    };
}

function styleGradientPhos(feature) {
    type = feature.properties.lpss_class;
    var colorToUse;
    if (type === "Highest") colorToUse = '#67000d';
    else if (type === "Higher") colorToUse = '#fb6a4a';
    else if (type === "High") colorToUse = '#fcbba1';
    else colorToUse = "transparent";

    return {
        "color": colorToUse,
        "fillColor": colorToUse,
        "weight": 2,
        "opacity": 1,
        "fillOpacity": 0.8
    };
}

function stylelkes(feature) {
    type = feature.properties.aqr;
    var colorToUse;
    if (type === "FS") colorToUse = '#73B273';
    else if (type === "IF") colorToUse = '#FFFF73';
    else if (type === "NS") colorToUse = '#FF0000';
    else if (type === "NA") colorToUse = '#B2B2B2';
    else colorToUse = "transparent";

    return {
        "color": colorToUse,
        "fillColor": colorToUse,
        "weight": 2,
        "opacity": 1,
        "fillOpacity": 0.8
    };
}

function stylestrms(feature) {
    type = feature.properties.aql;
    var colorToUse;
    if (type === "FS") colorToUse = '#73B273';
    else if (type === "IF") colorToUse = '#FFFF73';
    else if (type === "NS") colorToUse = '#FF0000';
    else if (type === "NA") colorToUse = '#B2B2B2';
    else colorToUse = "transparent";

    return {
        "color": colorToUse,
        "opacity": 1
    };
}



function styleeasemnts(feature) {
    return {
        "color": "#f28f24",
        "fillColor": "#f28f24",
        "fillOpacity": 0.8,
        "opacity": 1,
    };
}


function styleBioIndex(feature) {
    type = feature.properties.B_I_MEAN;
    var colorToUse;
    if (type >= 0 && type <= 10) colorToUse = '#e60000';
    else if (type > 10 && type <= 20) colorToUse = '#ff3700';
    else if (type > 20 && type <= 30) colorToUse = '#ff7300';
    else if (type > 30 && type <= 40) colorToUse = '#ffaa00';
    else if (type > 40 && type <= 50) colorToUse = '#ffe100';
    else if (type > 50 && type <= 60) colorToUse = '#e5f500';
    else if (type > 60 && type <= 70) colorToUse = '#afe000';
    else if (type > 70 && type <= 80) colorToUse = '#83cf00';
    else if (type > 80 && type <= 90) colorToUse = '#5aba00';
    else if (type > 90 && type <= 100) colorToUse = '#308f00';
    else colorToUse = "transparent";
    return {
        "color": colorToUse,
        "fillColor": colorToUse,
        "weight": 2,
        "opacity": 1,
        "fillOpacity": 0.8
    };
}

function styleHydIndex(feature) {
    type = feature.properties.H_I_MEAN;
    var colorToUse;
    if (type >= 0 && type <= 10) colorToUse = '#e60000';
    else if (type > 10 && type <= 20) colorToUse = '#ff3700';
    else if (type > 20 && type <= 30) colorToUse = '#ff7300';
    else if (type > 30 && type <= 40) colorToUse = '#ffaa00';
    else if (type > 40 && type <= 50) colorToUse = '#ffe100';
    else if (type > 50 && type <= 60) colorToUse = '#e5f500';
    else if (type > 60 && type <= 70) colorToUse = '#afe000';
    else if (type > 70 && type <= 80) colorToUse = '#83cf00';
    else if (type > 80 && type <= 90) colorToUse = '#5aba00';
    else if (type > 90 && type <= 100) colorToUse = '#308f00';
    else colorToUse = "transparent";
    return {
        "color": colorToUse,
        "fillColor": colorToUse,
        "weight": 2,
        "opacity": 1,
        "fillOpacity": 0.8
    };
}

function styleGeoIndex(feature) {
    type = feature.properties.G_I_MEAN;
    var colorToUse;
    if (type >= 0 && type <= 10) colorToUse = '#e60000';
    else if (type > 10 && type <= 20) colorToUse = '#ff3700';
    else if (type > 20 && type <= 30) colorToUse = '#ff7300';
    else if (type > 30 && type <= 40) colorToUse = '#ffaa00';
    else if (type > 40 && type <= 50) colorToUse = '#ffe100';
    else if (type > 50 && type <= 60) colorToUse = '#e5f500';
    else if (type > 60 && type <= 70) colorToUse = '#afe000';
    else if (type > 70 && type <= 80) colorToUse = '#83cf00';
    else if (type > 80 && type <= 90) colorToUse = '#5aba00';
    else if (type > 90 && type <= 100) colorToUse = '#308f00';
    else colorToUse = "transparent";
    return {
        "color": colorToUse,
        "fillColor": colorToUse,
        "weight": 2,
        "opacity": 1,
        "fillOpacity": 0.8
    };
}

function styleConIndex(feature) {
    type = feature.properties.C_I_MEAN;
    var colorToUse;
    if (type >= 0 && type <= 10) colorToUse = '#e60000';
    else if (type > 10 && type <= 20) colorToUse = '#ff3700';
    else if (type > 20 && type <= 30) colorToUse = '#ff7300';
    else if (type > 30 && type <= 40) colorToUse = '#ffaa00';
    else if (type > 40 && type <= 50) colorToUse = '#ffe100';
    else if (type > 50 && type <= 60) colorToUse = '#e5f500';
    else if (type > 60 && type <= 70) colorToUse = '#afe000';
    else if (type > 70 && type <= 80) colorToUse = '#83cf00';
    else if (type > 80 && type <= 90) colorToUse = '#5aba00';
    else if (type > 90 && type <= 100) colorToUse = '#308f00';
    else colorToUse = "transparent";
    return {
        "color": colorToUse,
        "fillColor": colorToUse,
        "weight": 2,
        "opacity": 1,
        "fillOpacity": 0.8
    };
}

function styleWQIndex(feature) {
    type = feature.properties.W_I_MEAN;
    var colorToUse;
    if (type >= 0 && type <= 10) colorToUse = '#e60000';
    else if (type > 10 && type <= 20) colorToUse = '#ff3700';
    else if (type > 20 && type <= 30) colorToUse = '#ff7300';
    else if (type > 30 && type <= 40) colorToUse = '#ffaa00';
    else if (type > 40 && type <= 50) colorToUse = '#ffe100';
    else if (type > 50 && type <= 60) colorToUse = '#e5f500';
    else if (type > 60 && type <= 70) colorToUse = '#afe000';
    else if (type > 70 && type <= 80) colorToUse = '#83cf00';
    else if (type > 80 && type <= 90) colorToUse = '#5aba00';
    else if (type > 90 && type <= 100) colorToUse = '#308f00';
    else colorToUse = "transparent";
    return {
        "color": colorToUse,
        "fillColor": colorToUse,
        "weight": 2,
        "opacity": 1,
        "fillOpacity": 0.8
    };
}

function styleCombIndex(feature) {
    type = feature.properties.A_I_MEAN;
    var colorToUse;
    if (type >= 0 && type <= 10) colorToUse = '#e60000';
    else if (type > 10 && type <= 20) colorToUse = '#ff3700';
    else if (type > 20 && type <= 30) colorToUse = '#ff7300';
    else if (type > 30 && type <= 40) colorToUse = '#ffaa00';
    else if (type > 40 && type <= 50) colorToUse = '#ffe100';
    else if (type > 50 && type <= 60) colorToUse = '#e5f500';
    else if (type > 60 && type <= 70) colorToUse = '#afe000';
    else if (type > 70 && type <= 80) colorToUse = '#83cf00';
    else if (type > 80 && type <= 90) colorToUse = '#5aba00';
    else if (type > 90 && type <= 100) colorToUse = '#308f00';
    else colorToUse = "transparent";
    return {
        "color": colorToUse,
        "fillColor": colorToUse,
        "weight": 2,
        "opacity": 1,
        "fillOpacity": 0.8
    };
}

function styleBedrockPoll(feature) {
    type = feature.properties.rating;
    var colorToUse;
    if (type === "VH") colorToUse = '#f26f52';
    else if (type === "H") colorToUse = '#ffcd4e';
    else if (type === "M") colorToUse = '#fff34f';
    else colorToUse = "transparent";
    return {
        "color": colorToUse,
        "fillColor": colorToUse,
        "weight": 2,
        "opacity": 1,
        "fillOpacity": 0.8
    };
}

function styleGradientbedrockPoll(feature) {
    type = feature.properties.rating;
    var colorToUse;
    if (type === "VH") colorToUse = '#2ca25f';
    else if (type === "H") colorToUse = '#99d8c9';
    else if (type === "M") colorToUse = '#e5f5f9';
    else colorToUse = "transparent";
    return {
        "color": colorToUse,
        "fillColor": colorToUse,
        "weight": 2,
        "fillOpacity": 0.8,
        "opacity": 1,
    };
}

///// **** END OF STYLE FUNCTIONS *** \\\\\



////*** Functions to change Opacity on Layers ****\\\\\


function updateOpacity(val, layer) {
    layer.setStyle({
        fillOpacity: val,
    });
}

function updateOpacityBound(val, layer) {
    layer.setStyle({
        opacity: val,
    });
}

function updateOpacityTile(val, layer) {
    layer.setOpacity(val);
    //    console.log(layer);
}

//opacity slider for pollution sens
function updateOpacityTilepollsens(val) {
    var checkVal = document.getElementById("pollsensGradient").checked;
    if (checkVal === true) {
        pollsensGradient.setOpacity(val);
    } else {
        pollsens.setOpacity(val);
    }
}

var rangeSlider = function () {
    var slider = $('.range-slider'),
        range = $('.slider'),
        value = $('.range-slider_val');

    slider.each(function () {

        value.each(function () {
            var value = $(this).prev().attr('value');
            $(this).html(value);
        });

        range.on('input', function () {
            $(this).next(value).html(this.value);
        });
    });
};

rangeSlider();



/// Zoom to Layer IS THIS EVER USED??
function zoomToFeature(urlLayer) {
    var query = L.esri.query({
        url: urlLayer,
    });
    query.bounds(function (error, latLngBounds, response) {
        if (error) {
            console.log(error);
            return;
        }
        map.fitBounds(latLngBounds);
    });
}


/// ***Legend control items*** ////

var legendBndry = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Planning Districts',
    legends: [{
        name: 'Planning Districts',
        elements: [{
            html: document.querySelector('#BndryLegend').innerHTML
            }]
        }],
    detectStretched: true,
});

var legendwellhead = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Well Head Protection Areas',
    legends: [{
        name: 'Well Head Protection Areas',
        elements: [{
            html: document.querySelector('#wellheadLegend').innerHTML
            }]
        }],
    detectStretched: true,
});




var legendlkes = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Assessed Waters 2018 - Lakes',
    legends: [{
        name: 'Assessed Waters 2018 - Lakes',
        elements: [{
            html: document.querySelector('#lkesLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendstrms = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Assessed Waters 2018 - Streams',
    legends: [{
        name: 'Assessed Waters 2018 - Streams',
        elements: [{
            html: document.querySelector('#strmsLegend').innerHTML
            }]
        }],
    detectStretched: true,
});

var legendbioIndex = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Bio Index Mean',
    legends: [{
        name: 'Bio Index Mean',
        elements: [{
            html: document.querySelector('#bioIndexLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendconIndex = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Con Index Mean',
    legends: [{
        name: 'Con Index Mean',
        elements: [{
            html: document.querySelector('#conIndexLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendhydIndex = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Hyd Index Mean',
    legends: [{
        name: 'Hyd Index Mean',
        elements: [{
            html: document.querySelector('#hydIndexLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendgeoIndex = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Geo Index Mean',
    legends: [{
        name: 'Geo Index Mean',
        elements: [{
            html: document.querySelector('#geoIndexLegend').innerHTML
            }]
        }],
    detectStretched: true,
});




// add legends to print
function addPrintLegend(print) {
    $.each($('input[class="showLegend"]:checked'), function () {
        x = window[this.value];
        return x.addTo(print.printMap);
    });
}

function postPrintLegend() {
    $.each($('input[class="showLegend"]:checked'), function () {
        //        console.log(window[this.value]);
        x = window[this.value];
        return x.addTo(map);
    });

}

//    if (($('input[value="legendBndry"]').is(':checked')) && ($('input[value="legendcnty"]').is(':checked')) && ($('input[value="legendhuc8"]').is(':checked')) && ($('input[value="legendhuc10"]').is(':checked'))) {
//        return
//        legendBndry.addTo(e.printMap);
//        legendcnty.addTo(e.printMap);
//        legendhuc8.addTo(e.printMap);
//        legendhuc10.addTo(e.printMap);
//
//    } else if ($('input[value="legendhuc10"]').is(':checked')) {
//        return legendhuc10.addTo(e.printMap);
//    } else if ($('input[value="legendcnty"]').is(':checked')) {
//        return legendcnty.addTo(e.printMap);
//    }
//}


function changeStyle(val, layer) {
    //    console.log(val);
    layer.setStyle(val);
    //    console.log(layer.setStyle(val));
}

function changeToOrigStyle(val, layer) {
    //    console.log(val);
    layer.setStyle(val);
}

$(document).ready(function () {
    sidebar.open('home');
    //    createSidebar();


    $('#range').on("input", function () {
        $('.output').val(this.value);
    }).trigger("change");

    $('.collapse')
        .on('shown.bs.collapse', function () {
            $(this)
                .parent()
                .find(".fa-plus")
                .removeClass("fa-plus")
                .addClass("fa-minus");
        })
        .on('hidden.bs.collapse', function () {
            $(this)
                .parent()
                .find(".fa-minus")
                .removeClass("fa-minus")
                .addClass("fa-plus");
        });

    $('leaflet-printing').click(function () {
        console.log("print button clicked");
    });
    $('input[type="checkbox"]').click(function () {
        layerClicked = window[event.target.value];
        colorGradeID = window[event.target.id]; // the function name of the style for gradient color scheme 
        colorOrigID = window[event.target.name]; //the original color scheme function
        idName = this.id;
        console.log("the id = ",
            idName);
        if ($(this).is(":checked") && $(this).hasClass('pollution-sens')) {
            //            layerClicked.on('loading', function (e) {
            //                loadingControl._showIndicator()
            //            });
            //            layerClicked.on('load', function (e) {
            //                loadingControl._hideIndicator
            //            });
            map.removeLayer(layerClicked);
            map.addLayer(colorGradeID);
        } else if ($(this).is(":not(:checked)") && $(this).hasClass('pollution-sens')) {
            map.removeLayer(colorGradeID);
        } else if ($(this).is(":checked") && $(this).hasClass('colorGrade')) {
            layerClicked.on('loading', function (e) {
                loadingControl._showIndicator()
            });
            layerClicked.on('load', function (e) {
                loadingControl._hideIndicator
            });
            changeStyle(colorGradeID, layerClicked); //calls function to change the style
        } else if ($(this).is(":not(:checked)") && $(this).hasClass('colorGrade')) {
            changeToOrigStyle(colorOrigID, layerClicked);
        } else if ($(this).is(":checked") && $(this).hasClass('showLegend')) {
            map.addControl(layerClicked); //calls function to add legend
        } else if ($(this).is(":not(:checked)") && $(this).hasClass('showLegend')) {
            map.removeControl(layerClicked); //remove legend control
        } else if ($(this).is(":checked")) {
            //            layerClicked.on('loading', function (e) {
            //                loadingControl._showIndicator()
            //            });
            //            layerClicked.on('load', function (e) {
            //                loadingControl._hideIndicator
            //            });
            console.log('idName = ', idName)
            switch (idName) {
                case 'wellhead_layer':
                    $.ajax({
                        url: url_wellhead,
                        dataType: 'jsonp',
                        jsonpCallback: a_wellhead.replace(":", ""),
                        success: function (response) {
                            wellhead = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylewellhead,
                            });

                            map.addLayer(wellhead);
                        }

                    }); // end of stylewellhead call
                    break;
                case 'distBound_layer':
                    $.ajax({
                        url: url_distBound,
                        dataType: 'jsonp',
                        jsonpCallback: a_distBound.replace(":", ""),
                        success: function (response) {
                            distBound = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                //            layerName: 'distBound',
                                style: styledistBound,
                                onEachFeature: function (feature, layer) {
                                    layer.bindPopup('<p><b><i> District: </b>' + feature.properties.lkmgtdist + '</i></p>');
                                },
                            });
                            map.addLayer(distBound);
                        }

                    }); //end of call for distBound variable
                    break;
                case 'lkes_layer':
                    $.ajax({
                        url: url_lkes,
                        dataType: 'jsonp',
                        jsonpCallback: a_lkes.replace(":", ""),
                        success: function (response) {
                            lkes = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylelkes,
                            });
                            map.addLayer(lkes);
                        }
                    }); // end of lkes call
                    break;
                case 'strms_layer':
                    $.ajax({
                        url: url_strms,
                        dataType: 'jsonp',
                        jsonpCallback: a_strms.replace(":", ""),
                        success: function (response) {
                            strms = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylestrms,
                            });
                            //                            strms.on('dataloading', function (e) {
                            //                                loadingControl._showIndicator()
                            //                            });
                            //                            strms.on('dataload', function (e) {
                            //                                loadingControl._hideIndicator
                            //                            });
                            map.addLayer(strms);
                        }
                    });
                    // end of strms call
                    break;
                default:
                    console.log('data call issue');
                    break;
            }
            //            console.log("layerclicked = ",
            //                layerClicked); //this comes up undefined...
        } else if ($(this).is(":not(:checked)")) {
            map.removeLayer(layerClicked);
        }
    });


    if ($(window).width() < 414.1) {
        map.setView([46.4, -91.99]);
        map.setZoom(6)
    } else if ($(window).width() < 768.1) {
        map.setView([46.4, -95])
    } else if ($(window).width() < 950) {
        map.setView([46.35, -96.25])
    } else if ($(window).width() < 1260) {
        map.setView([46.35, -95.2])
    }

    //to show loading icon on layers
    $(document).ajaxStart(function (e) {
        //        console.log('start ajax triggered');
        //        console.log(e);
        loadingControl._showIndicator();
    });
    $(document).ajaxStop(function (e) {
        loadingControl._hideIndicator();
        //        console.log('stop ajax triggered');
        //        console.log(e);
    });

});


// Backup for if statement 
//            if (idName = 'wellhead_layer') {
//                $.ajax({
//                    url: url_wellhead,
//                    dataType: 'jsonp',
//                    jsonpCallback: a_wellhead.replace(":", ""),
//                    success: function (response) {
//                        wellhead = L.geoJson(response, {
//                            attribution: '',
//                            interactive: true,
//                            style: stylewellhead,
//                        });
//                        // This didn't seem to work. or it's to small a time to see it. 
//                        //                        wellhead.on('loading', function (e) {
//                        //                            loadingControl._showIndicator()
//                        //                        });
//                        //                        wellhead.on('load', function (e) {
//                        //                            loadingControl._hideIndicator
//                        //                        });
//                        map.addLayer(wellhead);
//                    }
//                }); // end of stylewellhead call
//            } else if (idName = 'distBound_layer') {
//                $.ajax({
//                    url: url_distBound,
//                    dataType: 'jsonp',
//                    jsonpCallback: a_distBound.replace(":", ""),
//                    success: function (response) {
//                        distBound = L.geoJson(response, {
//                            attribution: '',
//                            interactive: true,
//                            //            layerName: 'distBound',
//                            style: styledistBound,
//                            onEachFeature: function (feature, layer) {
//                                layer.bindPopup('<p><b><i> District: </b>' + feature.properties.lkmgtdist + '</i></p>');
//                            },
//                        });
//                        map.addLayer(distBound);
//                    }
//
//                }); //end of call for distBound variable
//            } else if (idName = 'lkes_layer') {
//                $.ajax({
//                    url: url_lkes,
//                    dataType: 'jsonp',
//                    jsonpCallback: a_lkes.replace(":", ""),
//                    success: function (response) {
//                        lkes = L.geoJson(response, {
//                            attribution: '',
//                            interactive: true,
//                            style: stylelkes,
//                        });
//                        map.addLayer(lkes);
//                    }
//                });
//                // end of lkes call
//            } else if (idName = 'strms_layer') {
//                $.ajax({
//                    url: url_strms,
//                    dataType: 'jsonp',
//                    jsonpCallback: a_strms.replace(":", ""),
//                    success: function (response) {
//                        strms = L.geoJson(response, {
//                            attribution: '',
//                            interactive: true,
//                            style: stylestrms,
//                        });
//                        map.addLayer(strms);
//                    }
//                });
//                // end of strms call
//            }
//            console.log("layerclicked = ",
//                layerClicked); //this comes up undefined...

//   **** If I want to add legend to the sub title div. Do the following in the $(input checkbox) function: *****

//      $('input[type="checkbox"]').click(function () {
//        layerClicked = window[event.target.value];
//        colorGradeID = window[event.target.id]; // the function name of the style for gradient color scheme 
//        colorOrigID = window[event.target.name]; //the original color scheme function
//
//        legendname = this.name;
//        legendvalue = this.value;
//    
//     else if ($(this).is(":checked") && $(this).hasClass('showLegend')) {
//            map.addControl(layerClicked); //calls function to add legend
//            console.log(colorOrigID);
//            leg = document.querySelector(legendname).innerHTML; //testname is the this.value which is the id for the legend container
//            console.log(leg);
//            $("#addSubLegend").append('<div id= legend' + legendvalue + ' >' + leg + ' </div');
//        } else if ($(this).is(":not(:checked)") && $(this).hasClass('showLegend')) {
//            map.removeControl(layerClicked); //remove legend control
//            removeID = '#legend' + legendvalue // to get the jquery selector for the div the legend is in in the sub title print area
//            $(removeID).remove(); //removes legend from sub print area

// CSS FOR LEGEND:
/*to get to the sub title legend print*/
//h3 > div > div > p {
//    color: black;
//    font-size: 10pt;
//    margin-bottom: -1em;
//    margin-top: -1em;
//}
//            
//*** END OF LEGEND IN BOTTOM PART ///
