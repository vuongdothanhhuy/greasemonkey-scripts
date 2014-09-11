'use strict';

console.log('\'Allo \'Allo! Content script');

//Search for WMP embed objects and replace
var mediaDCCT = document.getElementsByTagName('embed');

for (var i = 0; i < mediaDCCT.length; i++) {
    var audio = new Audio();
    audio.controls = true;
    audio.src = mediaDCCT[i].src;

    mediaDCCT[i].parentNode.parentNode.replaceChild(audio, mediaDCCT[i].parentNode);
}


//Search for Flash embed objects and replace
var mediaTGPSG = document.getElementsByClassName('swftools');

for (var i = 0; i < mediaTGPSG.length; i++) {
    for (var j = 0; j < mediaTGPSG[i].childNodes.length; j++) {
        if (typeof mediaTGPSG[i].childNodes[j] === 'object') {
            for (var k = 0; k < mediaTGPSG[i].childNodes[j].childNodes.length; k++) {
                if (mediaTGPSG[i].childNodes[j].childNodes[k].name === 'flashvars') {
                    var audio = new Audio();
                    audio.controls = true;
                    audio.src = decodeURIComponent(mediaTGPSG[i].childNodes[j].childNodes[k].value.split('=')[1]);

                    mediaTGPSG[i].replaceChild(audio, mediaTGPSG[i].childNodes[j]);
                }
            }
        }
    }
}
