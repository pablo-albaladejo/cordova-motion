/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {


    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        var options = { frequency: 500 }; // Update every 5 ms
        var watchID = navigator.accelerometer.watchAcceleration(this.onSuccess, this.onError, options);
    },
    onError(){
        alert('onError!');
    },
    onSuccess: function (motion) {
        console.log('motion X: ' + motion.x + '\n' +
            'motion Y: ' + motion.y + '\n' +
            'motion Z: ' + motion.z + '\n' +
            'Timestamp: ' + motion.timestamp + '\n');

        app.updateView(motion);
        app.checkShaken(motion);
    },
    updateView: function (motion) {
        window.document.getElementById("sensor_x").innerHTML = "X: " + motion.x;
        window.document.getElementById("sensor_y").innerHTML = "Y: " + motion.y;
        window.document.getElementById("sensor_z").innerHTML = "Z: " + motion.z;
    },
    checkShaken: function (motion) {
        var shakenX = Math.abs(motion.x) > 10;
        var shakenY = Math.abs(motion.y) > 10;

        if (shakenX || shakenY) {
            this.shaken();
        } 
    },
    shaken: function () {
        var body = document.getElementsByTagName("BODY")[0];
        body.classList.add("shaken");
        
        setTimeout(()=>{
            body.classList.remove("shaken");
        },3000);
    },

};

app.initialize();