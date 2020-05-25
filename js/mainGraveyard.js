// javascript graveyard. Things tried but ended up not working out 

//****SET UP to try and dynamically add and use the urls for data from geoserver***////

// Since the layer is checked on and off I don't think this would work since can't pass variables. issues trying to turn layers off at this point
function getData(url_var, a_url_var, variablename, style_var) {
    $.ajax({
        url: url_var,
        dataType: 'jsonp',
        jsonpCallback: a_url_var.replace(":", ""),
        success: function (response) {
            variablename = L.geoJson(response, {
                attribution: '',
                interactive: true,
                //            layerName: 'distBound',
                style: style_var,
            });
            map.addLayer(variablename);
        }

    }); //end of get data function. not sure if will work

}

function checkData(dataname, layerClicked) {
    if (dataname = 'layerdistBound') {
        getData(url_distBound, a_distBound, layerClicked, styledistBound);

    } else if (dataname = 'layerdistMask') {
        console.log('this didnt work');

    } else return
}
//getData(url_distBound, a_distBound, distBound, styledistBound);

//in the on on document function part
naming = this.name; // delete in not work
console.log(naming); // delete if not work

// in the if else statement to get the layers to load
}
else if ($(this).is(":checked")) {
    //            layerClicked.on('loading', function (e) {
    //                loadingControl._showIndicator()
    //            });
    //            layerClicked.on('load', function (e) {
    //                loadingControl._hideIndicator
    //            });
    checkData(naming, layerClicked); // remove if doesn't work

    //            map.addLayer(layerClicked); //this works revert back if new option doesn't work
    //            console.log(layerClicked);
} else if ($(this).is(":not(:checked)")) {
    map.removeLayer(layerClicked);
}

//****END OF*** SET UP to try and dynamically add and use the urls for data from geoserver***////

/////////////////////////////////////////////////////////////
// Different attempts to get the raster images/tile layers from geoserver to leaflet. it seems the style attriubtion was the problem. ///
/////////////////////////////////////////////////////////////
//var pollsens;
//var url_pollsens = getRast_CLFL_URL(a_pollsens, style_pollsens);
//var pollsens = L.tileLayer.wms(url_pollsens).addTo(map);
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

// URL for Raster CLFLWD layers
// get url dynamically with this function;
function getRast_CLFL_URL(layername, stylename) {
    var map_width = map.getSize().x;
    var map_height = map.getSize().y;
    var map_bbox = map.getBounds().toBBoxString();

    var geoserverRoot = "https://post.eorinc.com/geoserver/clflwd_rasters/wms";
    var defaultParameters = {
        service: 'WMS',
        version: '1.1.0',
        request: 'GetMap',
        layers: layername,
        styles: stylename,
        //        format: 'image/jpeg',
        transparent: true,
        height: map_height,
        width: map_width,
        bbox: map_bbox,
        //        info_format: 'text/javascript',
        format_options: 'callback:' + layername.replace(":", ""), //had to do this because otherwise each callback wasn't unique and wouldn't load multiple layers ///not sure if this needs to be callback:processJson. that could be old documentation. 
        SRS: 'EPSG:4326'
    };
    //    var customParms = {
    //        bbox: map.getBounds().toBBoxString()
    //    };
    var parameters = L.Util.extend(defaultParameters);
    var URL = geoserverRoot + L.Util.getParamString(parameters);
    console.log('this is the url: ', URL);
    return URL;
};


/////////////////////////////////////////////////////////////
// END of raster images/tile layers from geoserver to leaflet troubleshootin ///
////////////////////////////////////////////////////////////

//// to get bounds of the counties surrounding CLFLWD /////
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

//// END of 'get bounds of the counties surrounding CLFLWD' /////
////////////////////////////////////////////////////////////


/// LAyer URLS /////
//var url_distBound = 'https://post.eorinc.com/geoserver/clflwd/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=clflwd%3ALkMgt_Dist_7_17&outputFormat=text%2Fjavascript&format_options=callback%3AclflwdLkMgt_Dist_7_17&SrsName=EPSG%3A4326';
//var url_imptStrm = 'https://post.eorinc.com/geoserver/minnesota/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=minnesota%3Aimpaired_streams_mview&outputFormat=text%2Fjavascript&format_options=callback%3Aminnesotaimpaired_streams_mview&SrsName=EPSG%3A4326';
//var url_impLks = 'https://post.eorinc.com/geoserver/minnesota/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=minnesota%3Aimpaired_lakes_mview&outputFormat=text%2Fjavascript&format_options=callback%3Aminnesotaimpaired_lakes_mview&SrsName=EPSG%3A4326';
//var url_altwtr = 'https://post.eorinc.com/geoserver/minnesota/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=minnesota%3Aaltr_wtrcrse_mview&outputFormat=text%2Fjavascript&format_options=callback%3Aminnesotaaltr_wtrcrse_mview&SrsName=EPSG%3A4326';
//var url_phos = 'https://post.eorinc.com/geoserver/minnesota/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=minnesota%3Alakes_of_phosphorus_sensitivity&outputFormat=text%2Fjavascript&format_options=callback%3Aminnesotalakes_of_phosphorus_sensitivity&SrsName=EPSG%3A4326';
//var url_wellhead = 'https://post.eorinc.com/geoserver/minnesota/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=minnesota%3Awellhead_protection_areas&outputFormat=text%2Fjavascript&format_options=callback%3Aminnesotawellhead_protection_areas&SrsName=EPSG%3A4326';
//var url_strms = 'https://post.eorinc.com/geoserver/minnesota/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=minnesota%3Aassessed_2018_streams&outputFormat=text%2Fjavascript&format_options=callback%3Aminnesotaassessed_2018_streams&SrsName=EPSG%3A4326';
//var url_bedrockPoll = 'https://post.eorinc.com/geoserver/minnesota/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=minnesota%3Abedrocksurface_pollutionsensitivity&outputFormat=text%2Fjavascript&format_options=callback%3Aminnesotabedrocksurface_pollutionsensitivity&SrsName=EPSG%3A4326';
//var url_easemnts = 'https://post.eorinc.com/geoserver/minnesota/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=minnesota%3Abdry_bwsr_rim_cons_easements&outputFormat=text%2Fjavascript&format_options=callback%3Aminnesotabdry_bwsr_rim_cons_easements&SrsName=EPSG%3A4326

//var url_lkes = 'https://post.eorinc.com/geoserver/minnesota/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=minnesota%3Aassessed_2018_lakes&outputFormat=text%2Fjavascript&format_options=callback%3Aminnesotaassessed_2018_lakes&SrsName=EPSG%3A4326';


L.esri.featureLayer({
    url: a_bioIndex,
    style: styleBioIndex,
    onEachFeature: function (feature, layer) {
        layer.bindPopup('<p><b> Bio Index Mean: ' + feature.properties.B_I_MEAN + '</b></p>');
    },
}); = L.esri.featureLayer({
    url: a_hydIndex,
    style: styleHydIndex,
    onEachFeature: function (feature, layer) {
        layer.bindPopup('<p><b> Hyd Index Mean: ' + feature.properties.H_I_MEAN + '</b></p>');
    },
}); = L.esri.featureLayer({
    url: a_geoIndex,
    style: styleGeoIndex,
    onEachFeature: function (feature, layer) {
        layer.bindPopup('<p><b> Geo Index Mean: ' + feature.properties.G_I_MEAN + '</b></p>');
    },
}); = L.esri.featureLayer({
    url: a_conIndex,
    style: styleConIndex,
    onEachFeature: function (feature, layer) {
        layer.bindPopup('<p><b> Con Index Mean: ' + feature.properties.C_I_MEAN + '</b></p>');
    },
}); = L.esri.featureLayer({
    url: a_wQIndex,
    style: styleWQIndex,
    onEachFeature: function (feature, layer) {
        layer.bindPopup('<p><b> Water Quality Index Mean: ' + feature.properties.W_I_MEAN + '</b></p>');
    },
}); = L.esri.featureLayer({
    url: a_combIndex,
    style: styleCombIndex,
    onEachFeature: function (feature, layer) {
        layer.bindPopup('<p><b> Combined Index Mean: ' + feature.properties.A_I_MEAN + '</b></p>');
    },
});
