// // Javascript by Sarah Grandstrand with EOR Inc//

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
    center: [45.28, -92.93], // large screens 
    //[46.35, -94.8], // large screens
    //    center: [46.35, -93.5],
    zoomSnap: 0.25,
    zoomDelta: 0.25,
    zoom: 12, //6.5,
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

//L.easyButton('fa-crosshairs fa-lg', function (btn, map) {
//    map.fitBounds(poltJur.getBounds());
//    console.log(poltJur.getBounds());
//}).addTo(map);

// Leaflet Browser Print

L.control.browserPrint({
    title: 'Print Map',
    documentTitle: 'Comfort Lake Forest Lake Watershed District: WMP',
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

var sidebar = L.control.sidebar('sidebar').addTo(map);

//// URL's for Layers ////
var a_poltJur = 'clflwd:Jurisdiction_WD_10_17'; // political jursidiction boundary
var a_distBound = 'clflwd:LkMgt_Dist_7_17'; // Lake Management Districts 
var a_cnty = 'minnesota:county_boundaries'; // county layer
//'clflwd:cntybnds_clfl_mv'; //this is the counties only around the districts
var a_city = 'clflwd:cities_clflwd'; //cities layer // CHANGE TO Municipalities
var a_huc8 = 'minnesota:WBD_HU8'; //USGS HUC 8
var a_huc10 = 'minnesota:WBD_HU10'; //USGS HUC 10
var a_huc12 = 'minnesota:WBD_HU12'; //USGS HUC 12

var a_wtrVul = 'minnesota:drinking_water_supply_management_area_vulnerability'; // drinking water supply vulnerability
var a_wellhead = 'minnesota:wellhead_protection_areas'; //Well Head Protection Areas
var a_bedrockPoll = 'minnesota:bedrocksurface_pollutionsensitivity'; //bedrock surface pollution sensitivity
var a_npcGround = 'minnesota:biota_dnr_groundwater_npc' // native plant communities connected to groundwater

var a_recharge = 'clflwd:recharge_discharge_areas_2003'; // recharge and discharge groundwater areas in northern washington county

var a_fEMAflood = 'minnesota:fema_flood_view'; // 100 year flood plain from FEMA
var a_altwtr = 'minnesota:altr_wtrcrse_mview'; // Altered Watercourse
var a_cONUS = 'clflwd:nwi_clp_mv'; //NWI CONUS_wet_poly
var a_buffbasins = 'minnesota:pwi_basins_mv'; //Buffer Protection of Lakes, ponds, reservoirs
var a_buffwetlnds = 'minnesota:pwi_basins_wetlnd_mv'; //Buffer Protection of wetlands; Public Waters; PWI
var a_buffwtrcrse = 'minnesota:pwi_watercourses'; //Buffer Protection of watercourse; Public Ditches; PWI s


var a_imptStrm = 'minnesota:impaired_streams_mview'; //Impaired streams
var a_impLks = 'minnesota:impaired_lakes_mview'; //Impaired Lakes
var a_strms = 'minnesota:assessed_2018_streams';
// Assessed Streams 2018
var a_lkes = 'minnesota:assessed_2018_lakes'; // Assessed Lakes 2018
var a_phos = 'minnesota:lakes_of_phosphorus_sensitivity'; // lake phosophorus sensitivity significance 

var a_trout = 'minnesota:trout_streams_minnesota'; //trout streams
var a_natPra = 'minnesota:dnr_native_prairies'; //DNR native prairies
var a_natPlnt = 'minnesota:dnr_native_plant_communities'; //DNR native plant communities
var a_mBSbio = 'minnesota:dnr_mcbs_sites_of_biodiv_sig'; //MBS sites of biodiversity significance 

var a_gAP_DNR = 'minnesota:gap_stewardship_2008_mn_dnr_lands'; //GAP DNR Lands
var a_gAP_State = 'minnesota:gap_stewardship_2008_misc_state_lands'; //GAP state Lands
var a_gAP_Cnty = 'minnesota:gap_stewardship_2008_county_lands'; //GAP county Lands
var a_gAP_Fed = 'minnesota:gap_stewardship_2008_federal_lands'; //GAP Federal Lands
var a_easemnts = 'minnesota:bdry_bwsr_rim_cons_easements'; // conservation easements
var a_gSSURGO = 'clflwd:gssurgo_soilsgrp_clp'; // hydrologic soils groups 


// index layers //
var a_bioIndex = 'minnesota:majorscores_bio_index_mv'; //20Bio Index Mean
var a_hydIndex = 'minnesota:majorscores_hyd_index_mv'; //21Hyd Index Mean
var a_geoIndex = 'minnesota:majorscores_geo_index_mv'; //22Geo Index Mean
var a_conIndex = 'minnesota:majorscores_con_index_mv'; //23Con Index Mean
var a_wQIndex = 'minnesota:majorscores_wq_index_mv'; //24WQ index Mean
var a_combIndex = 'minnesota:majorscores_comb_index_mv'; //25combined index mean


/// *** RASTER LAYERS ***////

var a_wildLife = 'clflwd_rasters:wildlife100_clflwd_4326'; // Wildlife Habitat Quality Risk
var a_pollsens = 'clflwd_rasters:nrsfsn_clflwd'; //Pollution Sensitivity of Near-Surface Materials
var a_nLCD = 'clflwd_rasters:nlcd_clflwd'; //// national land cover data 2016
var a_pollsensGradient = 'clflwd_rasters:nrsfsn_clflwd_grade'; ////Pollution Sensitivity of Near-Surface Materials Gradient
var a_waterQual = 'clflwd_rasters:watqual100_clflwd'; //Water Quality Risk
var a_soil = 'clflwd_rasters:watererosion_clflwd'; //Soil Erosion Risk
var a_envBen = 'clflwd_rasters:ebi300_clflwd'; //Environmental Risk Index
//var a_envBen = 'clflwd_rasters:ebi300clflwd'; //Environmental Risk Index

var a_mask = 'clflwd:jurisdictionMask'; //mask of district boundaries for printing purposes

// URL for CLFLWD layers
// get url dynamically with this function;
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

        //-93.01986634,45.20963384,-92.67457369,45.47000262  //BBox for cities

    };
    var parameters = L.Util.extend(defaultParameters);
    var URL = geoserverRoot + L.Util.getParamString(parameters);
    //        console.log('this is the url: ', URL);
    return URL;
};

function getCLFLWD_WMS_URL(layername) {
    //    var corner1 = L.latLng(-93.02427108, 45.22182617);
    //    var corner2 = L.latLng(-92.79967634, 45.33440437);
    //    var bounds = L.latLngBounds(corner1, corner2);

    var tileLayer = L.tileLayer.wms("https://post.eorinc.com/geoserver/clflwd/wms", {
        layers: layername,
        format: 'image/png',
        transparent: true,
        version: '1.1.0',
        crs: L.CRS.EPSG4326,
        //    styles: 'clflwd_rasters%3Anrsfsn_clflwd_qgisStyle',
        //        bounds: bounds,
        //bbox: [-93.02427108, 45.22182617, -92.79967634, 45.33440437],
        //        bbox: '-93.01986634,45.20963384,-92.67457369,45.47000262'
        //bounds: L.latLngBounds([[-93.02427108, 45.22182617], [-92.79967634, 45.33440437]]),

    });
    console.log('this is the tile layer bounds: ', tileLayer.getBounds);
    return tileLayer
};

function getMN_URL_citybound(layername) {
    var geoserverRoot = "https://post.eorinc.com/geoserver/minnesota/ows";
    var defaultParameters = {
        service: 'WFS',
        version: '2.0.0',
        request: 'GetFeature',
        typeName: layername,
        outputFormat: 'text/javascript',
        format_options: 'callback:' + layername.replace(":", ""), //had to do this because otherwise each callback wasn't unique and wouldn't load multiple layers ///not sure if this needs to be callback:processJson. that could be old documentation. 
        SrsName: 'EPSG:4326',
        // This is the bounding box of the cities surrounding CLFL. Using this to limit the features shown. 
        bbox: '-93.01986634,45.20963384,-92.67457369,45.47000262, EPSG:4326'
    };
    var parameters = L.Util.extend(defaultParameters);
    var URL = geoserverRoot + L.Util.getParamString(parameters);
    // console.log('this is the url: ', URL);
    return URL;
};

function getTilelayer(rastlayer) {
    var tileLayer = L.tileLayer.wms("https://post.eorinc.com/geoserver/clflwd_rasters/wms", {
        layers: rastlayer,
        format: 'image/png',
        //    styles: 'clflwd_rasters%3Anrsfsn_clflwd_qgisStyle',
        transparent: true,
        version: '1.1.0',
        crs: L.CRS.EPSG4326,

    });
    return tileLayer
};

/////*** BOUNDARY LAYERS ****\\\\

// id  is distbound_layer
var distBound;
var url_distBound = getCLFL_URL(a_distBound);

var poltJur;
var url_poltJur = getCLFL_URL(a_poltJur);
$.ajax({
    url: url_poltJur,
    dataType: 'jsonp',
    jsonpCallback: a_poltJur.replace(":", ""),
    success: function (response) {
        poltJur = L.geoJson(response, {
            attribution: '',
            interactive: true,
            style: stylepoltJur,
        });
        map.addLayer(poltJur);
        //        console.log(distBound.getBounds().toBBoxString());
        //        -93.02427108,45.22182617,-92.79967634,45.33440437
    }

}); //end of call for political jursdiction variable

var cnty;
var url_cnty = getMN_URL(a_cnty);

var city;
var url_city = getCLFL_URL(a_city);
var huc8;
var url_huc8 = getMN_URL(a_huc8);
var huc10;
var url_huc10 = getMN_URL(a_huc10);
var huc12;
var url_huc12 = getMN_URL(a_huc12);

////// *** Groundwater Layers *** /////
var wtrVul;
var url_wtrVul = getMN_URL(a_wtrVul);
var wellhead;
var url_wellhead = getMN_URL(a_wellhead);
var bedrockPoll;
var url_bedrockPoll = getMN_URL(a_bedrockPoll);
var pollsens = getTilelayer(a_pollsens);
var pollsensGradient = getTilelayer(a_pollsensGradient);
var npcGround;
var url_npcGround = getMN_URL(a_npcGround);
var recharge;
var url_recharge = getCLFL_URL(a_recharge);


////// *** Hydrology Layers *** /////

var fEMAflood;
var url_fEMAflood = getMN_URL_citybound(a_fEMAflood);
var altwtr;
var url_altwtr = getMN_URL(a_altwtr);
//var cONUS;
//var url_cONUS = getCLFL_URL(a_cONUS);
var cONUS = getCLFLWD_WMS_URL(a_cONUS);
var buffbasins;
var url_buffbasins = getMN_URL(a_buffbasins);
var buffwetlnds;
var url_buffwetlnds = getMN_URL(a_buffwetlnds);
var buffwtrcrse;
var url_buffwtrcrse = getMN_URL(a_buffwtrcrse);

////// *** Surface Water Quality Layers *** /////

var imptStrm;
var url_imptStrm = getMN_URL(a_imptStrm);
var impLks;
var url_impLks = getMN_URL(a_impLks);
var lkes;
var url_lkes = getMN_URL(a_lkes);
var strms;
var url_strms = getMN_URL(a_strms);
var phos;
var url_phos = getMN_URL(a_phos);

////// *** Biodiversity Layers *** /////

var trout;
var url_trout = getMN_URL(a_trout);
var natPra;
var url_natPra = getMN_URL(a_natPra);
var natPlnt;
var url_natPlnt = getMN_URL(a_natPlnt);
var mBSbio;
var url_mBSbio = getMN_URL(a_mBSbio);


////// *** Land Use/Cover layers *** /////

var gAP_DNR;
var url_gAP_DNR = getMN_URL(a_gAP_DNR);
var gAP_State;
var url_gAP_State = getMN_URL(a_gAP_State);
var gAP_Cnty;
var url_gAP_Cnty = getMN_URL(a_gAP_Cnty);
var gAP_Fed;
var url_gAP_Fed = getMN_URL(a_gAP_Fed);
var easemnts;
var url_easemnts = getMN_URL(a_easemnts);
var nLCD = getTilelayer(a_nLCD);
//var gSSURGO;
//var url_gSSURGO = getMN_URL_soil(a_gSSURGO);
var gSSURGO = getCLFLWD_WMS_URL(a_gSSURGO);
//var gSSURGO = getMN_URL_soil(a_gSSURGO);

////// *** Watershed Characterization Layers *** /////
var bioIndex;
var url_bioIndex = getMN_URL(a_bioIndex);
var hydIndex;
var url_hydIndex = getMN_URL(a_hydIndex);
var geoIndex
var url_geoIndex = getMN_URL(a_geoIndex);
var conIndex;
var url_conIndex = getMN_URL(a_conIndex);
var wQIndex;
var url_wQIndex = getMN_URL(a_wQIndex);
var combIndex;
var url_combIndex = getMN_URL(a_combIndex);


var wildLife = getTilelayer(a_wildLife);
var waterQual = getTilelayer(a_waterQual);
var soil = getTilelayer(a_soil);
var envBen = getTilelayer(a_envBen);


/////*** OTHER layers ***/////
var mask;
var url_mask = getCLFL_URL(a_mask);


/// STYLE FUNCTIONS
function styledistBound(feature) {
    var x = document.getElementById("fillop_distBound");
    var y = document.getElementById("boundop_distBound");
    var currentfillop = x.value;
    var currentboundop = y.value;
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
        "fillOpacity": currentfillop,
        "opacity": currentboundop,

    };
}

function stylepoltJur(feature) {
    var x = document.getElementById("fillop_poltJur");
    var y = document.getElementById("boundop_poltJur");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": '#FF0000',
        "fillColor": '#FF0000',
        "weight": 3,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,

    };
}

function stylemask(feature) {
    var x = document.getElementById("fillop_mask");
    var currentfillop = x.value;
    return {
        "color": "transparent",
        "fillColor": "#000000",
        "weight": 2,
        "fillOpacity": currentfillop,
    };
}


function stylecity(feature) {
    var x = document.getElementById("fillop_city");
    var y = document.getElementById("boundop_city");
    var currentfillop = x.value;
    var currentboundop = y.value;
    type = feature.properties.feature_na;
    var colorToUse;
    if (type === "Chisago City") colorToUse = '#1b9e77';
    else if (type === "Chisago Lake") colorToUse = '#d95f02';
    else if (type === "Forest Lake") colorToUse = '#7570b3';
    else if (type === "Franconia") colorToUse = '#e7298a';
    else if (type === "Scandia") colorToUse = '#66a61e';
    else if (type === "Wyoming") colorToUse = '#e6ab02';
    else colorToUse = "transparent";

    return {
        "color": '#000000',
        "fillColor": colorToUse,
        "weight": 3,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,

    };
}

function stylecnty(feature) {
    var x = document.getElementById("fillop_cnty");
    var y = document.getElementById("boundop_cnty");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#7256E8",
        "fillColor": "#7256E8",
        "weight": 2,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,
    };
}


function stylehuc8(feature) {
    var x = document.getElementById("fillop_huc8");
    var y = document.getElementById("boundop_huc8");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#a6cee3",
        "fillColor": "#a6cee3",
        "weight": 2,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,
    };
}

function stylehuc10(feature) {
    var x = document.getElementById("fillop_huc10");
    var y = document.getElementById("boundop_huc10");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#fb9a99",
        "fillColor": "#fb9a99",
        "weight": 2,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,
    };
}


function stylehuc12(feature) {
    var x = document.getElementById("fillop_huc12");
    var y = document.getElementById("boundop_huc12");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#fdbf6f",
        "fillColor": "#fdbf6f",
        "weight": 2,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,
    };
}


function stylewellhead(feature) {
    var x = document.getElementById("fillop_wellhead");
    var y = document.getElementById("boundop_wellhead");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#a65628",
        "fillColor": "#a65628",
        "weight": 2,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,
    };
}

function styleGradientwellhead(feature) {
    var x = document.getElementById("fillop_wellhead");
    var y = document.getElementById("boundop_wellhead");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        //        "color": "rgb(0,109,44)",
        //        "fillColor": "rgb(0,109,44)",
        "color": "#006d2c",
        "fillColor": "#006d2c",
        "weight": 2,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,

    };
}

// Water vulnerability
function styleWtrVul(feature) {
    var x = document.getElementById("fillop_wtrVul");
    var y = document.getElementById("boundop_wtrVul");
    var currentfillop = x.value;
    var currentboundop = y.value;
    level = feature.properties.dws_vul;
    var colorToUse;
    if (level === "Very High") colorToUse = '#ff7f7f';
    else if (level === "High") colorToUse = '#ffd27f';
    else if (level === "Moderate") colorToUse = '#ffffbe';
    else if (level === "Low") colorToUse = '#d3ffbe';
    else if (level === "Very Low") colorToUse = '#bed2ff';
    else colorToUse = "transparent";

    return {
        "color": colorToUse,
        "fillColor": colorToUse,
        "weight": 2,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,
    };
}

function styleGradientWtrVul(feature) {
    var x = document.getElementById("fillop_wtrVul");
    var y = document.getElementById("boundop_wtrVul");
    var currentfillop = x.value;
    var currentboundop = y.value;
    level = feature.properties.dws_vul;
    var colorToUse;
    if (level === "Very High") colorToUse = '#006d2c';
    else if (level === "High") colorToUse = '#31a354';
    else if (level === "Moderate") colorToUse = '#74c476';
    else if (level === "Low") colorToUse = '#bae4b3';
    else if (level === "Very Low") colorToUse = '#edf8e9';
    else colorToUse = "transparent";

    return {
        "color": colorToUse,
        "fillColor": colorToUse,
        "weight": 2,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,
    };
}

function stylenpcGround(feature) {
    var x = document.getElementById("fillop_npcGround");
    var y = document.getElementById("boundop_npcGround");
    var currentfillop = x.value;
    var currentboundop = y.value;
    level = feature.properties.groundwater_wetland_group;
    var colorToUse;
    if (level === "Fens/Seepage Wetlands") colorToUse = '#db3328';
    else if (level === "Forested Wetlands") colorToUse = '#f6d922';
    else if (level === "Marshes") colorToUse = '#9aca3c';
    else if (level === "Peatland/Bog") colorToUse = '#0071bc';
    else if (level === "Shrub Swamps") colorToUse = '#662d91';
    else if (level === "Wet Meadow/Shrub Carr Wetlands") colorToUse = '#ec008c';
    else if (level === "Wet Prairies") colorToUse = '#f7acb4';
    else if (level === "Wetland Complexes") colorToUse = '#e8beff';
    else colorToUse = "transparent";
    return {
        "color": colorToUse,
        "fillColor": colorToUse,
        "weight": 2,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,
    };
}

function styleGradientnpcGround(feature) {
    var x = document.getElementById("fillop_npcGround");
    var y = document.getElementById("boundop_npcGround");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#006d2c",
        "fillColor": "#006d2c",
        "weight": 2,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,

    };

}

function stylerecharge(feature) {
    var x = document.getElementById("fillop_recharge");
    var y = document.getElementById("boundop_recharge");
    var currentfillop = x.value;
    var currentboundop = y.value;
    level = feature.properties.type;
    var colorToUse;
    if (level === "Discharge") colorToUse = '#267300';
    else if (level === "Recharge") colorToUse = '#f7f4d2';
    else colorToUse = "transparent";
    return {
        "color": colorToUse,
        "fillColor": colorToUse,
        "weight": 2,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,
    };
}


function stylefEMAflood(feature) {
    var x = document.getElementById("fillop_fEMAflood");
    var y = document.getElementById("boundop_fEMAflood");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#ffff00",
        "fillColor": "#ffff00",
        weight: 2,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,
    };
}

function styleGradientfEMAflood(feature) {
    var x = document.getElementById("fillop_fEMAflood");
    var y = document.getElementById("boundop_fEMAflood");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#084594",
        "fillColor": "#084594",
        "fillOpacity": currentfillop,
        "opacity": currentboundop,
    };
}

function styleAltWtr(feature) {
    var y = document.getElementById("boundop_altwtr");
    var currentboundop = y.value;
    type = feature.properties.awevttype;
    var colorToUse;
    if (type === 1) colorToUse = '#f5605d';
    else if (type === 2) colorToUse = '#38a800';
    else if (type === 3) colorToUse = '#c300ff';
    else if (type === 4) colorToUse = '#9c9c9c';
    else colorToUse = "transparent";

    return {
        "color": colorToUse,
        "opacity": currentboundop,
    };
}

function styleGradientAltWtr(feature) {
    var y = document.getElementById("boundop_altwtr");
    var currentboundop = y.value;
    type = feature.properties.awevttype;
    var colorToUse;
    if (type === 1) colorToUse = '#084594';
    else colorToUse = "transparent";

    return {
        "color": colorToUse,
        "opacity": currentboundop,
    };
}

function stylebuffbasins(feature) {
    var x = document.getElementById("fillop_buffbasins");
    var y = document.getElementById("boundop_buffbasins");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#4e579c",
        "fillColor": '#4e579c',
        "weight": 2,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,

    };
}

function styleGradientbuffbasins(feature) {
    var x = document.getElementById("fillop_buffbasins");
    var y = document.getElementById("boundop_buffbasins");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#084594",
        "fillColor": '#084594',
        "weight": 2,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,
    };
}

function stylebuffwetlnds(feature) {
    var x = document.getElementById("fillop_buffwetlnds");
    var y = document.getElementById("boundop_buffwetlnds");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#7e8be6",
        "fillColor": '#7e8be6',
        "weight": 2,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,

    };
}

function styleGradientbuffwetlnds(feature) {
    var x = document.getElementById("fillop_buffwetlnds");
    var y = document.getElementById("boundop_buffwetlnds");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#084594",
        "fillColor": '#084594',
        "weight": 2,
        "fillOpacity": currentfillop,
        "opacity": currentboundop,
    };
}

function stylebuffwtrcrse(feature) {
    var y = document.getElementById("boundop_buffwtrcrse");
    var currentboundop = y.value;
    return {
        "color": "#674d6e",
        "opacity": currentboundop,
    };
}

function styleGradientbuffwtrcrse(feature) {
    var y = document.getElementById("boundop_buffwtrcrse");
    var currentboundop = y.value;
    return {
        "color": "#084594",
        "opacity": currentboundop,
    };
}

function styleimptStrm(feature) {
    var y = document.getElementById("boundop_imptStrm");
    var currentboundop = y.value;
    return {
        "color": "#8c0007",
        "opacity": currentboundop,
    };
}

function styleGradientimptStrm(feature) {
    var y = document.getElementById("boundop_imptStrm");
    var currentboundop = y.value;
    return {
        "color": "#67000d",
        "opacity": currentboundop,
    };
}

function styleimpLks(feature) {
    var x = document.getElementById("fillop_impLks");
    var y = document.getElementById("boundop_impLks");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#002366",
        "fillColor": "#002366",
        "fillOpacity": currentfillop,
        "opacity": currentboundop,
    };
}

function styleGradientimpLks(feature) {
    var x = document.getElementById("fillop_impLks");
    var y = document.getElementById("boundop_impLks");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#67000d",
        "fillColor": "#67000d",
        "fillOpacity": currentfillop,
        "opacity": currentboundop,
    };
}

function stylePhos(feature) {
    var x = document.getElementById("fillop_phos");
    var y = document.getElementById("boundop_phos");
    var currentfillop = x.value;
    var currentboundop = y.value;
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
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}

function styleGradientPhos(feature) {
    var x = document.getElementById("fillop_phos");
    var y = document.getElementById("boundop_phos");
    var currentfillop = x.value;
    var currentboundop = y.value;
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
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}

function stylelkes(feature) {
    var x = document.getElementById("fillop_lkes");
    var y = document.getElementById("boundop_lkes");
    var currentfillop = x.value;
    var currentboundop = y.value;
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
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}

function stylestrms(feature) {
    var x = document.getElementById("fillop_strms");
    var y = document.getElementById("boundop_strms");
    var currentfillop = x.value;
    var currentboundop = y.value;
    type = feature.properties.aql;
    var colorToUse;
    if (type === "FS") colorToUse = '#73B273';
    else if (type === "IF") colorToUse = '#FFFF73';
    else if (type === "NS") colorToUse = '#FF0000';
    else if (type === "NA") colorToUse = '#B2B2B2';
    else colorToUse = "transparent";

    return {
        "color": colorToUse,
        "opacity": currentboundop,

    };
}

function styletrout(feature) {
    var x = document.getElementById("fillop_trout");
    var y = document.getElementById("boundop_trout");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#f781bf",
        "fillColor": "#f781bf",
        "weight": 2,
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}

function styleGradienttrout(feature) {
    var x = document.getElementById("fillop_trout");
    var y = document.getElementById("boundop_trout");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#756bb1",
        "fillColor": "#756bb1",
        "weight": 2,
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}

function stylenatPra(feature) {
    var x = document.getElementById("fillop_natPra");
    var y = document.getElementById("boundop_natPra");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#735100",
        "fillColor": "#735100",
        "weight": 2,
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}

function styleGradientnatPra(feature) {
    var x = document.getElementById("fillop_natPra");
    var y = document.getElementById("boundop_natPra");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#756bb1",
        "fillColor": "#756bb1",
        "weight": 2,
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}

function stylenatPlnt(feature) {
    var x = document.getElementById("fillop_natPlnt");
    var y = document.getElementById("boundop_natPlnt");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#71c98d",
        "fillColor": "#71c98d",
        "weight": 2,
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}

function styleGradientnatPlnt(feature) {
    var x = document.getElementById("fillop_natPlnt");
    var y = document.getElementById("boundop_natPlnt");
    var currentfillop = x.value;
    var currentboundop = y.value;

    return {
        "color": "#756bb1",
        "fillColor": "#756bb1",
        "weight": 2,
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}

function styleMBSBio(feature) {
    var x = document.getElementById("fillop_mBSbio");
    var y = document.getElementById("boundop_mBSbio");
    var currentfillop = x.value;
    var currentboundop = y.value;
    console.log(currentfillop);
    console.log(currentboundop)
    type = feature.properties.biodiv_sig;
    var colorToUse;
    if (type === "Outstanding") colorToUse = '#00cd00';
    else if (type === "High") colorToUse = '#267300';
    else if (type === "Moderate") colorToUse = '#d3ffbe';
    else if (type === "Below") colorToUse = '#b2b2b2';
    else colorToUse = "transparent";
    return {
        "color": colorToUse,
        "fillColor": colorToUse,
        "weight": 2,
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}

function styleGradientMBSBio(feature) {
    var x = document.getElementById("fillop_mBSbio");
    var y = document.getElementById("boundop_mBSbio");
    var currentfillop = x.value;
    var currentboundop = y.value;
    type = feature.properties.biodiv_sig;
    var colorToUse;
    if (type === "Outstanding") colorToUse = '#756bb1';
    else if (type === "High") colorToUse = '#bcbddc';
    else if (type === "Moderate") colorToUse = '#efedf5';
    else colorToUse = "transparent";
    return {
        "color": colorToUse,
        "fillColor": colorToUse,
        "weight": 2,
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}

function stylegAP_DNR(feature) {
    var x = document.getElementById("fillop_gAP_DNR");
    var y = document.getElementById("boundop_gAP_DNR");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": '#88cd66',
        "fillColor": '#88cd66',
        "weight": 2,
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}

function styleGradientgAP_DNR(feature) {
    var x = document.getElementById("fillop_gAP_DNR");
    var y = document.getElementById("boundop_gAP_DNR");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": '#756bb1',
        "fillColor": '#756bb1',
        "weight": 2,
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}

function stylegAP_State(feature) {
    var x = document.getElementById("fillop_gAP_State");
    var y = document.getElementById("boundop_gAP_State");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": '#e8beff',
        "fillColor": '#e8beff',
        "weight": 2,
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}

function styleGradientgAP_State(feature) {
    var x = document.getElementById("fillop_gAP_State");
    var y = document.getElementById("boundop_gAP_State");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": '#756bb1',
        "fillColor": '#756bb1',
        "weight": 2,
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}

function stylegAP_Cnty(feature) {
    var x = document.getElementById("fillop_gAP_Cnty");
    var y = document.getElementById("boundop_gAP_Cnty");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": '#ffff73',
        "fillColor": '#ffff73',
        "weight": 2,
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}

function styleGradientgAP_Cnty(feature) {
    var x = document.getElementById("fillop_gAP_Cnty");
    var y = document.getElementById("boundop_gAP_Cnty");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": '#756bb1',
        "fillColor": '#756bb1',
        "weight": 2,
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}

function stylegAP_Fed(feature) {
    var x = document.getElementById("fillop_gAP_Fed");
    var y = document.getElementById("boundop_gAP_Fed");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": '#bee8ff',
        "fillColor": '#bee8ff',
        "weight": 2,
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}

function styleGradientgAP_Fed(feature) {
    var x = document.getElementById("fillop_gAP_Fed");
    var y = document.getElementById("boundop_gAP_Fed");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": '#756bb1',
        "fillColor": '#756bb1',
        "weight": 2,
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}

function styleeasemnts(feature) {
    var x = document.getElementById("fillop_easemnts");
    var y = document.getElementById("boundop_easemnts");
    var currentfillop = x.value;
    var currentboundop = y.value;
    return {
        "color": "#f28f24",
        "fillColor": "#f28f24",
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}


function styleBioIndex(feature) {
    var x = document.getElementById("fillop_bioIndex");
    var y = document.getElementById("boundop_bioIndex");
    var currentfillop = x.value;
    var currentboundop = y.value;
    type = feature.properties.b_i_mean;
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
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}

function styleHydIndex(feature) {
    var x = document.getElementById("fillop_hydIndex");
    var y = document.getElementById("boundop_hydIndex");
    var currentfillop = x.value;
    var currentboundop = y.value;
    type = feature.properties.h_i_mean;
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
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}

function styleGeoIndex(feature) {
    var x = document.getElementById("fillop_geoIndex");
    var y = document.getElementById("boundop_geoIndex");
    var currentfillop = x.value;
    var currentboundop = y.value;
    type = feature.properties.g_i_mean;
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
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}

function styleConIndex(feature) {
    var x = document.getElementById("fillop_conIndex");
    var y = document.getElementById("boundop_conIndex");
    var currentfillop = x.value;
    var currentboundop = y.value;
    type = feature.properties.c_i_mean;
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
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}

function styleWQIndex(feature) {
    var x = document.getElementById("fillop_wQIndex");
    var y = document.getElementById("boundop_wQIndex");
    var currentfillop = x.value;
    var currentboundop = y.value;
    type = feature.properties.w_i_mean;
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
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}

function styleCombIndex(feature) {
    var x = document.getElementById("fillop_combIndex");
    var y = document.getElementById("boundop_combIndex");
    var currentfillop = x.value;
    var currentboundop = y.value;
    type = feature.properties.a_i_mean;
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
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}

function styleBedrockPoll(feature) {
    var x = document.getElementById("fillop_bedrockPoll");
    var y = document.getElementById("boundop_bedrockPoll");
    var currentfillop = x.value;
    var currentboundop = y.value;
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
        "opacity": currentboundop,
        "fillOpacity": currentfillop
    };
}

function styleGradientbedrockPoll(feature) {
    var x = document.getElementById("fillop_bedrockPoll");
    var y = document.getElementById("boundop_bedrockPoll");
    var currentfillop = x.value;
    var currentboundop = y.value;
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
        "opacity": currentboundop,
        "fillOpacity": currentfillop
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
    layer: 'Lake Management Districts',
    legends: [{
        name: 'Lake Management Districts',
        elements: [{
            html: document.querySelector('#BndryLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendpoltJur = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Political Jurisdiction',
    legends: [{
        name: 'Political Jurisdiction',
        elements: [{
            html: document.querySelector('#poltJurLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendcnty = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Counties',
    legends: [{
        name: 'Counties',
        elements: [{
            html: document.querySelector('#cntyLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendcity = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Municipal',
    legends: [{
        name: 'Municipal',
        elements: [{
            html: document.querySelector('#cityLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendhuc8 = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Major Watershed HUC 8 Boundaries',
    legends: [{
        name: 'Major Watershed HUC 8 Boundaries',
        elements: [{
            html: document.querySelector('#huc8Legend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendhuc10 = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'HUC 10 Boundaries',
    legends: [{
        name: 'HUC 10 Boundaries',
        elements: [{
            html: document.querySelector('#huc10Legend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendhuc12 = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'HUC 12 Boundaries',
    legends: [{
        name: 'HUC 12 Boundaries',
        elements: [{
            html: document.querySelector('#huc12Legend').innerHTML
            }]
        }],
    detectStretched: true,
});


var legendwtrVul = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'DWSMA Vulnerability',
    legends: [{
        name: 'DWSMA Vulnerability',
        elements: [{
            html: document.querySelector('#wtrVulLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendnpcGround = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Native Plant Communities Connected with Groundwater',
    legends: [{
        name: 'Native Plant Communities Connected with Groundwater',
        elements: [{
            html: document.querySelector('#npcGroundLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendrecharge = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Recharge and Discharge Zones',
    legends: [{
        name: 'Recharge and Discharge Zones',
        elements: [{
            html: document.querySelector('#rechargeLegend').innerHTML
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
var legendbedrockPoll = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Bedrock Surface Pollution Sensitivity',
    legends: [{
        name: 'Bedrock Surface Pollution Sensitivity',
        elements: [{
            html: document.querySelector('#bedrockPollLegend').innerHTML
            }]
        }],
    detectStretched: true,
});

var legendpollsens = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Pollution Sensitivity of Near-Surface Materials',
    legends: [{
        name: 'Pollution Sensitivity of Near-Surface Materials',
        elements: [{
            html: document.querySelector('#pollsensLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendfEMAflood = L.control.htmllegend({
    position: 'bottomleft',
    layer: '100 Year Flood Plain',
    legends: [{
        name: '100 Year Flood Plain',
        elements: [{
            html: document.querySelector('#fEMAfloodLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendaltwtr = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Altered Watercourse',
    legends: [{
        name: 'Altered Watercourse',
        elements: [{
            html: document.querySelector('#altwtrLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendcONUS = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'NWI',
    legends: [{
        name: 'NWI',
        elements: [{
            html: document.querySelector('#cONUSLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendbuffbasins = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'PWI - Lakes, Ponds & Reservior',
    legends: [{
        name: 'PWI - Lakes, Ponds & Reservior',
        elements: [{
            html: document.querySelector('#buffbasinsLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendbuffwetlnds = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'PWI - Wetlands',
    legends: [{
        name: 'PWI - Wetlands',
        elements: [{
            html: document.querySelector('#buffwetlndsLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendbuffwtrcrse = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'PWI - Watercourse',
    legends: [{
        name: 'PWI - Watercourse',
        elements: [{
            html: document.querySelector('#buffwtrcrseLegend').innerHTML
            }]
        }],
    detectStretched: true,
});

var legendimptStrm = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Impaired Streams (Proposed)',
    legends: [{
        name: 'Impaired Streams (Proposed)',
        elements: [{
            html: document.querySelector('#imptStrmLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendimpLks = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Impaired Lakes (Proposed)',
    legends: [{
        name: 'Impaired Lakes (Proposed)',
        elements: [{
            html: document.querySelector('#impLksLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendphos = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Lake Phosphorus Sensitivity Significance',
    legends: [{
        name: 'Lake Phosphorus Sensitivity Significance',
        elements: [{
            html: document.querySelector('#phosLegend').innerHTML
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
var legendtrout = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Trout Streams',
    legends: [{
        name: 'Trout Streams',
        elements: [{
            html: document.querySelector('#troutLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendnatPra = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Native Prairies',
    legends: [{
        name: 'Native Prairies',
        elements: [{
            html: document.querySelector('#natPraLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendnatPlnt = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Native Plant Communities',
    legends: [{
        name: 'Native Plant Communities',
        elements: [{
            html: document.querySelector('#natPlntLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendmBSbio = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'MBS Sites of Biodiversity Significance',
    legends: [{
        name: 'MBS Sites of Biodiversity Significance',
        elements: [{
            html: document.querySelector('#mBSbioLegend').innerHTML
            }]
        }],
    detectStretched: true,
});

var legendgAP_DNR = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'GAP DNR Lands',
    legends: [{
        name: 'GAP DNR Lands',
        elements: [{
            html: document.querySelector('#gAP_DNRLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendgAP_State = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'GAP State Lands',
    legends: [{
        name: 'GAP State Lands',
        elements: [{
            html: document.querySelector('#gAP_StateLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendgAP_Cnty = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'GAP County Lands',
    legends: [{
        name: 'GAP County Lands',
        elements: [{
            html: document.querySelector('#gAP_CntyLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendgAP_Fed = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'GAP Federal Lands',
    legends: [{
        name: 'GAP Federal Lands',
        elements: [{
            html: document.querySelector('#gAP_FedLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendeasemnts = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Easements',
    legends: [{
        name: 'Easements',
        elements: [{
            html: document.querySelector('#easemntsLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendnLCD = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'NLCD 2016',
    legends: [{
        name: 'NLCD 2016',
        elements: [{
            html: document.querySelector('#nLCDLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendgSSURGO = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'GSSURGO',
    legends: [{
        name: 'GSSURGO',
        elements: [{
            html: document.querySelector('#gSSURGOLegend').innerHTML
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
var legendwQIndex = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Water Quality Index Mean',
    legends: [{
        name: 'Water Quality Index Mean',
        elements: [{
            html: document.querySelector('#wQIndexLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendcombIndex = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Combined Index Mean',
    legends: [{
        name: 'Combined Index Mean',
        elements: [{
            html: document.querySelector('#combIndexLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendwildLife = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Wildlife Habitat Quality Risk',
    legends: [{
        name: 'Wildlife Habitat Quality Risk',
        elements: [{
            html: document.querySelector('#wildLifeLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendwaterQual = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Water Quality Risk',
    legends: [{
        name: 'Water Quality Risk',
        elements: [{
            html: document.querySelector('#waterQualLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendsoil = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Soil Erosion Risk',
    legends: [{
        name: 'Soil Erosion Risk',
        elements: [{
            html: document.querySelector('#soilLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendenvBen = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Environmental Benefits Index',
    legends: [{
        name: 'Environmental Benefits Index',
        elements: [{
            html: document.querySelector('#envBenLegend').innerHTML
            }]
        }],
    detectStretched: true,
});
var legendmask = L.control.htmllegend({
    position: 'bottomleft',
    layer: 'Planning Area Mask',
    legends: [{
        name: 'Planning Area Mask',
        elements: [{
            html: document.querySelector('#maskLegend').innerHTML
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
            //                        layerClicked.on('loading', function (e) {
            //                            loadingControl._showIndicator()
            //                        });
            //                        layerClicked.on('load', function (e) {
            //                            loadingControl._hideIndicator
            //                        });
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
                                    layer.on({
                                        mouseover: function (e) {
                                            layer.setStyle({
                                                weight: 3,
                                                color: '#00FFFF',
                                                opacity: 1
                                            });
                                            if (!L.Browser.ie && !L.Browser.opera) {
                                                layer.bringToFront();
                                            }
                                        },
                                        mouseout: function (e) {
                                            //                                            console.log(e);
                                            distBound.resetStyle(e.target);
                                        },
                                    });
                                },
                            });
                            map.addLayer(distBound);
                        }

                    }); //end of call for distBound variable
                    break;
                case 'poltJur_layer':
                    $.ajax({
                        url: url_poltJur,
                        dataType: 'jsonp',
                        jsonpCallback: a_poltJur.replace(":", ""),
                        success: function (response) {
                            poltJur = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylepoltJur,
                            });
                            map.addLayer(poltJur);
                            //        console.log(distBound.getBounds().toBBoxString());
                            //        -93.02427108,45.22182617,-92.79967634,45.33440437
                        }

                    }); //end of call for political jursdiction variable
                    break;
                case 'cnty_layer':
                    $.ajax({
                        url: url_cnty,
                        dataType: 'jsonp',
                        jsonpCallback: a_cnty.replace(":", ""),
                        success: function (response) {
                            cnty = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylecnty,
                                onEachFeature: function (feature, layer) {
                                    layer.bindPopup('<p><i> County: ' + feature.properties.county_nam + '</i></p>');
                                    layer.on({
                                        mouseover: function (e) {
                                            layer.setStyle({
                                                weight: 3,
                                                color: '#00FFFF',
                                                opacity: 1
                                            });
                                            if (!L.Browser.ie && !L.Browser.opera) {
                                                layer.bringToFront();
                                            }
                                        },
                                        mouseout: function (e) {
                                            cnty.resetStyle(e.target);
                                        },
                                    });
                                },

                            });
                            map.addLayer(cnty);
                            console.log(cnty.getBounds().toBBoxString());
                        }

                    }); //end of call for county variable
                    break;
                    ///////////NEED OT CHECK THIS /////////////
                case 'city_layer':
                    $.ajax({
                        url: url_city,
                        dataType: 'jsonp',
                        jsonpCallback: a_city.replace(":", ""),
                        success: function (response) {
                            city = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylecity,
                                onEachFeature: function (feature, layer) {
                                    layer.bindPopup('<p><i> City: ' + feature.properties.feature_na + '</i></p>');
                                    layer.on({
                                        mouseover: function (e) {
                                            layer.setStyle({
                                                weight: 3,
                                                color: '#00FFFF',
                                                opacity: 1
                                            });
                                            if (!L.Browser.ie && !L.Browser.opera) {
                                                layer.bringToFront();
                                            }
                                        },
                                        mouseout: function (e) {
                                            city.resetStyle(e.target);
                                        },
                                    });
                                },

                            });
                            map.addLayer(city);
                            //                            console.log(city.getBounds().toBBoxString());
                        }

                    }); //end of call for county variable
                    break;
                case 'huc8_layer':
                    $.ajax({
                        url: url_huc8,
                        dataType: 'jsonp',
                        jsonpCallback: a_huc8.replace(":", ""),
                        success: function (response) {
                            huc8 = L.geoJSON(response, {
                                attribution: '',
                                interactive: true,
                                style: stylehuc8,
                                onEachFeature: function (feature, layer) {
                                    layer.bindPopup('<p><i> HUC 8 Name: ' + feature.properties.hu_8_name + '</i></p>');
                                    layer.on({
                                        mouseover: function (e) {
                                            layer.setStyle({
                                                weight: 3,
                                                color: '#00FFFF',
                                                opacity: 1
                                            });
                                            if (!L.Browser.ie && !L.Browser.opera) {
                                                layer.bringToFront();
                                            }
                                        },
                                        mouseout: function (e) {
                                            huc8.resetStyle(e.target);
                                        },
                                    });
                                },
                            });
                            map.addLayer(huc8);
                        }
                    }); //end of call for huc8 variable
                    break;
                case 'huc10_layer':
                    $.ajax({
                        url: url_huc10,
                        dataType: 'jsonp',
                        jsonpCallback: a_huc10.replace(":", ""),
                        success: function (response) {
                            huc10 = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylehuc10,
                                onEachFeature: function (feature, layer) {
                                    layer.bindPopup('<p><i> HUC 10 Name: ' + feature.properties.hu_10_name + '</i></p>');
                                    layer.on({
                                        mouseover: function (e) {
                                            layer.setStyle({
                                                weight: 3,
                                                color: '#00FFFF',
                                                opacity: 1
                                            });
                                            if (!L.Browser.ie && !L.Browser.opera) {
                                                layer.bringToFront();
                                            }
                                        },
                                        mouseout: function (e) {
                                            huc10.resetStyle(e.target);
                                        },
                                    });
                                },
                            });
                            map.addLayer(huc10);
                        }
                    }); //end of call for huc10 variable
                    break;
                case 'huc12_layer':
                    $.ajax({
                        url: url_huc12,
                        dataType: 'jsonp',
                        jsonpCallback: a_huc12.replace(":", ""),
                        success: function (response) {
                            huc12 = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylehuc12,
                                onEachFeature: function (feature, layer) {
                                    layer.bindPopup('<p><i> HUC 12 Name: ' + feature.properties.hu_12_name + '</i></p>');
                                    layer.on({
                                        mouseover: function (e) {
                                            layer.setStyle({
                                                weight: 3,
                                                color: '#00FFFF',
                                                opacity: 1
                                            });
                                            if (!L.Browser.ie && !L.Browser.opera) {
                                                layer.bringToFront();
                                            }
                                        },
                                        mouseout: function (e) {
                                            huc12.resetStyle(e.target);
                                        },
                                    });
                                },
                            });
                            map.addLayer(huc12);
                        }
                    }); //end of call for huc12 variable
                    break;
                case 'wtrVul_layer':
                    $.ajax({
                        url: url_wtrVul,
                        dataType: 'jsonp',
                        jsonpCallback: a_wtrVul.replace(":", ""),
                        success: function (response) {
                            wtrVul = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: styleWtrVul,
                            });
                            map.addLayer(wtrVul);
                        }
                    }); // end of wtrvul call
                    break;
                case 'npcGround_layer':
                    $.ajax({
                        url: url_npcGround,
                        dataType: 'jsonp',
                        jsonpCallback: a_npcGround.replace(":", ""),
                        success: function (response) {
                            npcGround = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylenpcGround,
                            });
                            map.addLayer(npcGround);
                        }
                    }); // end of wtrvul call
                    break;
                case 'recharge_layer':
                    $.ajax({
                        url: url_recharge,
                        dataType: 'jsonp',
                        jsonpCallback: a_recharge.replace(":", ""),
                        success: function (response) {
                            recharge = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylerecharge,
                            });
                            map.addLayer(recharge);
                        }
                    }); // end of wtrvul call
                    break;
                case 'bedrockPoll_layer':
                    $.ajax({
                        url: url_bedrockPoll,
                        dataType: 'jsonp',
                        jsonpCallback: a_bedrockPoll.replace(":", ""),
                        success: function (response) {
                            bedrockPoll = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: styleBedrockPoll,
                            });
                            map.addLayer(bedrockPoll);
                        }
                    }); // end of bedrockPoll call
                    break;
                case 'fEMAflood_layer':
                    $.ajax({
                        url: url_fEMAflood,
                        dataType: 'jsonp',
                        jsonpCallback: a_fEMAflood.replace(":", ""),
                        success: function (response) {
                            fEMAflood = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylefEMAflood,
                            });
                            map.addLayer(fEMAflood);
                            console.log(fEMAflood);
                        }
                    }); // end of fEMAflood call
                    break;
                case 'altwtr_layer':
                    $.ajax({
                        url: url_altwtr,
                        dataType: 'jsonp',
                        jsonpCallback: a_altwtr.replace(":", ""),
                        success: function (response) {
                            altwtr = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: styleAltWtr,
                            });
                            map.addLayer(altwtr);
                        }
                    }); // end of altwtr call
                    break;
                case 'buffwetlnds_layer':
                    $.ajax({
                        url: url_buffwetlnds,
                        dataType: 'jsonp',
                        jsonpCallback: a_buffwetlnds.replace(":", ""),
                        success: function (response) {
                            buffwetlnds = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylebuffwetlnds,
                            });
                            map.addLayer(buffwetlnds);
                        }
                    }); // end of buffwetlnds call

                    break;
                case 'buffbasins_layer':
                    $.ajax({
                        url: url_buffbasins,
                        dataType: 'jsonp',
                        jsonpCallback: a_buffbasins.replace(":", ""),
                        success: function (response) {
                            buffbasins = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylebuffbasins,
                            });
                            map.addLayer(buffbasins);
                        }
                    }); // end of buffwetlnds call

                    break;
                case 'buffwtrcrse_layer':
                    $.ajax({
                        url: url_buffwtrcrse,
                        dataType: 'jsonp',
                        jsonpCallback: a_buffwtrcrse.replace(":", ""),
                        success: function (response) {
                            buffwtrcrse = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylebuffwtrcrse,
                            });
                            map.addLayer(buffwtrcrse);
                        }
                    }); // end of buffwtrcrse call
                    break;
                case 'imptStrm_layer':
                    $.ajax({
                        url: url_imptStrm,
                        dataType: 'jsonp',
                        jsonpCallback: a_imptStrm.replace(":", ""),
                        success: function (response) {
                            imptStrm = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: styleimptStrm,
                                onEachFeature: function (feature, layer) {
                                    layer.bindPopup('<p><b><i> Impaired for: </b>' + feature.properties.imp_param + '</i></p>');
                                    layer.on({
                                        mouseover: function (e) {
                                            layer.setStyle({
                                                weight: 3,
                                                color: '#00FFFF',
                                                opacity: 1
                                            });
                                            if (!L.Browser.ie && !L.Browser.opera) {
                                                layer.bringToFront();
                                            }
                                        },
                                        mouseout: function (e) {
                                            var checkVal = document.getElementById("styleGradientimptStrm").checked;
                                            if (checkVal === true) {
                                                imptStrm.setStyle(styleGradientimptStrm);
                                            } else {
                                                imptStrm.resetStyle(e.target);
                                            }
                                        },
                                    });
                                },
                            });
                            map.addLayer(imptStrm);
                        }
                    }); // end of imptStrm call
                    break;
                case 'impLks_layer':
                    $.ajax({
                        url: url_impLks,
                        dataType: 'jsonp',
                        jsonpCallback: a_impLks.replace(":", ""),
                        success: function (response) {
                            impLks = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: styleimpLks,
                                onEachFeature: function (feature, layer) {
                                    layer.bindPopup('<p><b><i> Impaired for: </b>' + feature.properties.imp_param + '</i></p>');
                                    layer.on({
                                        mouseover: function (e) {
                                            layer.setStyle({
                                                weight: 3,
                                                color: '#00FFFF',
                                                opacity: 1
                                            });
                                            if (!L.Browser.ie && !L.Browser.opera) {
                                                layer.bringToFront();
                                            }
                                        },
                                        mouseout: function (e) {
                                            var checkVal = document.getElementById("styleGradientimpLks").checked;
                                            if (checkVal === true) {
                                                impLks.setStyle(styleGradientimpLks);
                                            } else {
                                                impLks.resetStyle(e.target);
                                            }
                                        },
                                    });
                                }
                            });
                            map.addLayer(impLks);
                        }
                    }); // end of impLks call
                    break;
                case 'phos_layer':
                    $.ajax({
                        url: url_phos,
                        dataType: 'jsonp',
                        jsonpCallback: a_phos.replace(":", ""),
                        success: function (response) {
                            phos = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylePhos,
                            });
                            map.addLayer(phos);
                        }
                    }); // end of phos call
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
                case 'trout_layer':
                    $.ajax({
                        url: url_trout,
                        dataType: 'jsonp',
                        jsonpCallback: a_trout.replace(":", ""),
                        success: function (response) {
                            trout = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: styletrout,
                            });
                            map.addLayer(trout);
                        }
                    }); // end of trout call
                    break;
                case 'natPra_layer':
                    $.ajax({
                        url: url_natPra,
                        dataType: 'jsonp',
                        jsonpCallback: a_natPra.replace(":", ""),
                        success: function (response) {
                            natPra = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylenatPra,
                            });
                            map.addLayer(natPra);
                        }
                    }); // end of natPra call
                    break;
                case 'natPlnt_layer':
                    $.ajax({
                        url: url_natPlnt,
                        dataType: 'jsonp',
                        jsonpCallback: a_natPlnt.replace(":", ""),
                        success: function (response) {
                            natPlnt = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylenatPlnt,
                            });
                            map.addLayer(natPlnt);
                        }
                    }); // end of natPlnt call
                    break;
                case 'mBSbio_layer':
                    $.ajax({
                        url: url_mBSbio,
                        dataType: 'jsonp',
                        jsonpCallback: a_mBSbio.replace(":", ""),
                        success: function (response) {
                            mBSbio = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: styleMBSBio,
                            });
                            map.addLayer(mBSbio);
                        }
                    }); // end of MBSBio call
                    break;
                case 'gAP_DNR_layer':
                    $.ajax({
                        url: url_gAP_DNR,
                        dataType: 'jsonp',
                        jsonpCallback: a_gAP_DNR.replace(":", ""),
                        success: function (response) {
                            gAP_DNR = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylegAP_DNR,
                            });
                            map.addLayer(gAP_DNR);
                        }
                    }); // end of gAP_DNR call
                    break;
                case 'gAP_State_layer':
                    $.ajax({
                        url: url_gAP_State,
                        dataType: 'jsonp',
                        jsonpCallback: a_gAP_State.replace(":", ""),
                        success: function (response) {
                            gAP_State = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylegAP_State,
                            });
                            map.addLayer(gAP_State);
                        }
                    }); // end of gAP_State call
                    break;
                case 'gAP_Cnty_layer':
                    $.ajax({
                        url: url_gAP_Cnty,
                        dataType: 'jsonp',
                        jsonpCallback: a_gAP_Cnty.replace(":", ""),
                        success: function (response) {
                            gAP_Cnty = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylegAP_Cnty,
                            });
                            map.addLayer(gAP_Cnty);
                        }
                    }); // end of gAP_Cnty call
                    break;
                case 'gAP_Fed_layer':
                    $.ajax({
                        url: url_gAP_Fed,
                        dataType: 'jsonp',
                        jsonpCallback: a_gAP_Fed.replace(":", ""),
                        success: function (response) {
                            gAP_Fed = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylegAP_Fed,
                            });
                            map.addLayer(gAP_Fed);
                        }
                    }); // end of gAP_Fed call
                    break;
                case 'easemnts_layer':
                    $.ajax({
                        url: url_easemnts,
                        dataType: 'jsonp',
                        jsonpCallback: a_easemnts.replace(":", ""),
                        success: function (response) {
                            easemnts = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: styleeasemnts,
                            });
                            map.addLayer(easemnts);
                        }
                    }); // end of easemnts call
                    break;

                case 'bioIndex_layer':
                    $.ajax({
                        url: url_bioIndex,
                        dataType: 'jsonp',
                        jsonpCallback: a_bioIndex.replace(":", ""),
                        success: function (response) {
                            bioIndex = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: styleBioIndex,
                                onEachFeature: function (feature, layer) {
                                    layer.bindPopup('<p><b> Bio Index Mean: ' + feature.properties.b_i_mean + '</b></p>');
                                }
                            });
                            map.addLayer(bioIndex);
                        }
                    }); // end of bioIndex call
                    break;
                case 'hydIndex_layer':
                    $.ajax({
                        url: url_hydIndex,
                        dataType: 'jsonp',
                        jsonpCallback: a_hydIndex.replace(":", ""),
                        success: function (response) {
                            hydIndex = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: styleHydIndex,
                                onEachFeature: function (feature, layer) {
                                    layer.bindPopup('<p><b> Hyd Index Mean: ' + feature.properties.h_i_mean + '</b></p>');
                                }
                            });
                            map.addLayer(hydIndex);
                            console.log(url_hydIndex);
                        }
                    }); // end of hydIndex call
                    break;
                case 'geoIndex_layer':
                    $.ajax({
                        url: url_geoIndex,
                        dataType: 'jsonp',
                        jsonpCallback: a_geoIndex.replace(":", ""),
                        success: function (response) {
                            geoIndex = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: styleGeoIndex,
                                onEachFeature: function (feature, layer) {
                                    layer.bindPopup('<p><b> Geo Index Mean: ' + feature.properties.g_i_mean + '</b></p>');
                                }
                            });
                            map.addLayer(geoIndex);
                            //                            console.log(url_geoIndex);

                        }
                    }); // end of geoIndex call
                    break;
                case 'conIndex_layer':
                    $.ajax({
                        url: url_conIndex,
                        dataType: 'jsonp',
                        jsonpCallback: a_conIndex.replace(":", ""),
                        success: function (response) {
                            conIndex = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: styleConIndex,
                                onEachFeature: function (feature, layer) {
                                    layer.bindPopup('<p><b> Con Index Mean: ' + feature.properties.c_i_mean + '</b></p>');
                                }
                            });
                            map.addLayer(conIndex);
                        }
                    }); // end of conIndex call
                    break;
                case 'wQIndex_layer':
                    $.ajax({
                        url: url_wQIndex,
                        dataType: 'jsonp',
                        jsonpCallback: a_wQIndex.replace(":", ""),
                        success: function (response) {
                            wQIndex = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: styleWQIndex,
                                onEachFeature: function (feature, layer) {
                                    layer.bindPopup('<p><b> Water Quality Index Mean: ' + feature.properties.w_i_mean + '</b></p>');
                                }
                            });
                            map.addLayer(wQIndex);
                        }
                    }); // end of wqIndex call
                    break;
                case 'combIndex_layer':
                    $.ajax({
                        url: url_combIndex,
                        dataType: 'jsonp',
                        jsonpCallback: a_combIndex.replace(":", ""),
                        success: function (response) {
                            combIndex = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: styleCombIndex,
                                onEachFeature: function (feature, layer) {
                                    layer.bindPopup('<p><b> Combined Index Mean: ' + feature.properties.a_i_mean + '</b></p>');
                                }
                            });
                            map.addLayer(combIndex);
                        }
                    }); // end of combIndex call
                    break;
                case 'mask_layer':
                    $.ajax({
                        url: url_mask,
                        dataType: 'jsonp',
                        jsonpCallback: a_mask.replace(":", ""),
                        success: function (response) {
                            mask = L.geoJson(response, {
                                attribution: '',
                                interactive: true,
                                style: stylemask,
                            });
                            map.addLayer(mask);
                        }

                    }); //end of call for mask variable 
                    break;
                case 'gSSURGO_layer':
                    console.log(layerClicked);
                    map.addLayer(layerClicked);
                    //console.log(gSSURGO.getBounds().toBBoxString());

                    var x = document.getElementById("fillop_gSSURGO");
                    var currentfillop = x.value;
                    layerClicked.setOpacity(currentfillop);
                    // end of hydric soils call
                    break;
                case 'cONUS_layer':
                    console.log(layerClicked);
                    map.addLayer(layerClicked);
                    //console.log(gSSURGO.getBounds().toBBoxString());

                    var x = document.getElementById("fillop_cONUS");
                    var currentfillop = x.value;
                    layerClicked.setOpacity(currentfillop);
                    // end of hydric soils call
                    break;
                case 'pollsens_layer':
                    map.addLayer(layerClicked);
                    // end of pollustion sensitivity call
                    break;
                    //                case 'pollsensGradient_layer':
                    //                    map.addLayer(layerClicked);
                    //                    // end of strms call
                    //                    break;
                case 'nLCD_layer':
                    console.log(layerClicked);
                    map.addLayer(layerClicked);
                    var x = document.getElementById("fillop_nLCD");
                    var currentfillop = x.value;
                    layerClicked.setOpacity(currentfillop);
                    // end of strms call
                    break;
                case 'wildLife_layer':
                    console.log(layerClicked);
                    map.addLayer(layerClicked);
                    var x = document.getElementById("fillop_wildLife");
                    var currentfillop = x.value;
                    layerClicked.setOpacity(currentfillop);
                    // end of strms call
                    break;
                case 'waterQual_layer':
                    console.log(layerClicked);
                    map.addLayer(layerClicked);
                    var x = document.getElementById("fillop_waterQual");
                    var currentfillop = x.value;
                    layerClicked.setOpacity(currentfillop);
                    // end of strms call
                    break;
                case 'soil_layer':
                    console.log(layerClicked);
                    map.addLayer(layerClicked);
                    var x = document.getElementById("fillop_soil");
                    var currentfillop = x.value;
                    layerClicked.setOpacity(currentfillop);
                    //                    console.log('soil clicked');
                    //                    console.log(layerClicked);
                    // end of strms call
                    break;
                case 'envBen_layer':
                    console.log(layerClicked);
                    map.addLayer(layerClicked);
                    var x = document.getElementById("fillop_envBen");
                    var currentfillop = x.value;
                    layerClicked.setOpacity(currentfillop);
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
        map.setView([45.28, -92.7885]);
        //map.setView([46.4, -91.99]);
        map.setZoom(10.75)
    } else if ($(window).width() < 768.1) {
        map.setView([45.28, -92.9])
    } else if ($(window).width() < 950) {
        map.setView([45.28, -92.9])
    } else if ($(window).width() < 1260) {
        map.setView([45.28, -92.9])
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
