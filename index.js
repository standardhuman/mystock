'use strict'
// json.parse
// map, filter, split
var request = require('request');
var $ = require('jquery');
var url = "http://www.istocknow.com/live/live.php?type=7Plus&operator=tmobile&color=black&model=128GB&ajax=1&nocache=1476765128664&nobb=false&notarget=false&noradioshack=false&nostock=false"

var istock, iArr;
var arr = [];
var pureObjs = [];
var liveOnly = [];

function valuesToArray(obj) {
    return Object.keys(obj).map(function(key) {
        return obj[key];
    });
};

// $(document).ready(

    request({
        url: url,
        json: true
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            iArr = valuesToArray(body);
            for (var i = 0; i < iArr.length; i++) {
                if (typeof iArr[i] === 'object') {
                    arr.push(iArr[i]);
                };
            };
            arr.forEach(function(element) {
                for (var obj in element) {
                    pureObjs.push(element[obj]);
                };
            });
            for (var i = 0; i < pureObjs.length; i++) {
                if (pureObjs[i].live !== '0') {
                    liveOnly.push(pureObjs[i].title);
                }
            }
            var allAvailabe = console.log("All available locations: ", liveOnly, ".");
            for (var i = 0; i < liveOnly.length; i++) {
                if (liveOnly[i] === '4th Street' || liveOnly[i] === 'Emeryville' || liveOnly[i] === 'San Francisco') {
                    console.log("BINGO! Phone is available at ", liveOnly);
                } else {
                    console.log("Nothing found in Berkeley or Emeryville");
                    return;
                }
            }
        } else {
            console.log("error");
        }
    });
// );
