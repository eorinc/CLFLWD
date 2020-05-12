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
