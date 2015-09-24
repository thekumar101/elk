/*
 * Author: Saurav Kumar
 * Created on: Speteber 13,2015
 * Purpose: To grap essential data from client and push it to server
 */
var ip = '';

function copyIp(response) {
    ip = response.ip;
}

(function() {
    window.onload = function() {
        var userData = {};

        //get User: WMC Application specific
        userData.userName = window.username ? window.username : "Anonymous";

        //get userAgent
        userData.userAgent = navigator.userAgent;

        //get location obj
        userData.location = window.location

        //get IP
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://www.telize.com/jsonip?callback=copyIp";
        document.getElementsByTagName("body")[0].appendChild(script);
        setTimeout(function() {
            userData.ip = ip;
            console.log(userData);
            //after iDB implementation add the code below to a separate method POST iDB storage
            sendData(userData);
        }, 1000);

        document.onclick = function(e) {
            logClick(e)
        };

        //click capture - TODO: link with iDB
        function logClick(e) {
            console.log(e);
        }

        //sends data from client to WS
        function sendData(userData) {
            var dataToSend = JSON.stringify(userData);
            console.log(dataToSend);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/Hackovation/data/analytics', true); //'/server' would be replaced by the WS provided by Priya
            xhr.onload = function(e) {
                if (this.status == 200) {
                    console.log(this.responseText);
                } else {
                    console.log('Reason: ' + this.statusText + '\n' + 'Response: ' + this.responseText.trim() + '\n' + 'Status Code: ' + this.status);
                }
            };
            xhr.send(dataToSend);
        }

        //iDB partial... <start>
        var request, db;

        if (!window.indexedDB) {
            console.log("Browser does not support IndexedDB");
        } else {
            //If IndexedDB is supported, open a database, by providing name and version
            request = window.indexedDB.open("userDetailDB", 1);

            //what to do in case of an error
            request.onerror = function(event) {
                console.log("Error opening DB", event);
            }

            //what to do when version is changed, onupgradeneeded event will be called whenever the webpage is hit for the first time on user’s web browser or if there is an upgrade in version of database
            request.onupgradeneeded = function(event) {
                console.log("Upgrading");
                db = event.target.result;
                var objectStore = db.createObjectStore("userData", {
                    autoIncrement: true
                });
            };

            //what to do on success,  If there is no upgrade in version and the page has been opened previously, you will get onsuccess event
            request.onsuccess = function(event) {
                console.log("Success opening DB");
                db = event.target.result;
            }
        }
        //iDB <end>
    };
})();