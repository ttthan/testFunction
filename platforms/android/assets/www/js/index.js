$(document).ready(function() {

    $(document).on('pageshow', '#first', function(data) {});

});

//Eddystone URL : uuid = null
//Eddystone TLM, UID : uuuid = namespaceId, major = instanceId
//iBeacon : uuid = uuid
var regions = [{

}, ];

var beacons = {};

var timer;
var app = {

    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.getElementById("start").addEventListener("click", start);
        document.getElementById("stop").addEventListener("click", stop);
        document.getElementById("test").addEventListener("click", test);
        

        // document.addEventListener("stop", start, false);
        // document.addEventListener("pause", stopScan, false);
        // document.addEventListener("resume", scanDevice, false);
        document.addEventListener("deviceready", function() {});
    },

};

app.initialize();

function start() {
    console.log("start");
    timer = setInterval(run, 500);
}

function run() {
  // console.log('run');
    var timeNow = Date.now();
    $.each(beacons, function(key, beacon) {
        if (beacon.timeStamp + 6000 > timeNow) {
            // var rssiWidth = 1;
            // if (beacon.rssi < -100) {
            //     rssiWidth = 100;
            // } else if (beacon.rssi < 0) {
            //     rssiWidth = 100 + beacon.rssi;
            // }
            // var res =
            //     '<ul>' + '<li>UUID : ' + beacon.uuid + '</li>' + '<li>Major : ' + beacon.major + '</li>' + '<li>Minor : ' + beacon.minor + '</li>' + '<li>RSSI : ' + beacon.rssi + '</li>' + '<li>Distance : ' + beacon.accuracy + '</li>' + '</ul>';

            console.log(beacon);

        }
    });
}

function stop() {
    console.log("stop");
    clearInterval(timer);
}


function test() {
    // var values = [1, 3, 3, 4, 5, 6, 6, 7, 8, 8];
    // values.sort((a, b) => a - b);
    // var avg = findAverage(values);
    // console.log(avg);
    // var median = findMedian(values);
    // console.log(findQ1(values));
    // console.log(median);
    // console.log(findQ3(values));
    // console.log(findQ(values, 0.25));
    // console.log(findQ(values, 0.55));
    // console.log(findQ(values, 0.75));
    // // console.log(findQ(values, 0.20));
    // // console.log(findQ(values, 0.30));
    // // console.log(findQ(values, 0.40));
    //
    // console.log(numbers.statistic.quantile(values,25,100));
    // console.log(numbers.statistic.quantile(values,50,100));
    // console.log(numbers.statistic.quantile(values,75,100));

    window.locationManager = cordova.plugins.locationManager;
    var delegate = new locationManager.Delegate();
    delegate.didRangeBeaconsInRegion = function(pluginResult) {
        for (var i in pluginResult.beacons) {
            var beacon = pluginResult.beacons[i];
            beacon.timeStamp = Date.now();
            // var key = beacon.uuid + ':' + beacon.major + ':' + beacon.minor;
            beacons[i] = beacon;
            // console.log(beacon.minor);
        }
    };
    delegate.didStartMonitoringForRegion = function(pluginResult) {
        console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult))
    };
    locationManager.setDelegate(delegate);
    locationManager.requestAlwaysAuthorization();
    for (var i in regions) {
        var beaconRegion = new locationManager.BeaconRegion(
            i + 1,
            regions[i].uuid);
        // Start ranging beaconRegion
        locationManager.startRangingBeaconsInRegion(beaconRegion)
            .fail(console.error)
            .done();
        // Start monitoring beaconRegion
        locationManager.startMonitoringForRegion(beaconRegion)
            .fail(console.error)
            .done();
    }

timer = setInterval(run, 500);

}


///////////////////////// Array
//
// function findAverage(values) {
//     var avg;
//     avg = values.map((c, i, arr) => c / arr.length).reduce((p, c) => c + p);
//     return avg;
// }
//
// function findMedian(values) {
//     var pivot = Math.floor(values.length / 2);
//     return values.length % 2 ? values[pivot] : (values[pivot - 1] + values[pivot]) / 2;
// }
//
// function findQ1(values) {
//     var q1Arr;
//     q1Arr = (values.length % 2 == 0) ? values.slice(0, (values.length / 2)) : values.slice(0, Math.floor(values.length / 2));
//     return findMedian(q1Arr);
// }
//
// function findQ3(values) {
//     var q3Arr;
//     q3Arr = (values.length % 2 == 0) ? values.slice((values.length / 2), values.length) : values.slice(Math.ceil(values.length / 2), values.length);
//     return findMedian(q3Arr);
// }
//
// function findQ(values, x) {
//     var len = values.length;
//     var per = Math.floor(len * x) - 1;
//     return values[per];
// }
