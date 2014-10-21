// ==UserScript==
// @name WMP to HTML5 Audio
// @description Turns WMP audio elements into HTML5 audio elements
// @downloadURL https://openuserjs.org/install/vuongdothanhhuy/HTM5-gify_WMP.user.js
// @updateURL https://openuserjs.org/install/vuongdothanhhuy/HTM5-gify_WMP.user.js
// @icon
// @match *://*.tgpsaigon.net/*
// @match *://*.trungtammucvudcct.com/*
// @match *://*.thanhcavietnam.org/forum/*
// @exclude
// @namespace wmptohtml5
// @grant none
// @require
// @resource
// @run-at document-end
// @version 0.0.1
// @copyright 2014, Vuong Do Thanh Huy (https://vuongdothanhhuy.github.io)
// @homepageURL https://vuongdothanhhuy.github.io/greasemonkey-scripts/
// @supportURL https://github.com/vuongdothanhhuy/greasemonkey-scripts/issues
// ==/UserScript==

// Document here: http://wiki.greasespot.net/Metadata_block

'use strict';

console.log('Scanning and converting all WMP embeds into HTML5 audio elements...');

// This block of code will turn WMP embed elements into HTML5 audio players
// Tested and worked with:
//  trungtammucvudcct.com
//  thanhcavietnam.org/forum
//
var mediaDCCT = document.getElementsByTagName('embed');

for (var i = 0; i < mediaDCCT.length; i++) {
    var audio = new Audio();
    audio.controls = true;
    audio.src = mediaDCCT[i].src;

    mediaDCCT[i].parentNode.parentNode.replaceChild(audio, mediaDCCT[i].parentNode);
}


// This block of code will turn Flash audio embed elements into HTML5 audio players
// Tested and worked with:
//  tgpsaigon.net
//
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
