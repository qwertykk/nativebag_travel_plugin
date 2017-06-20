/**
 * Created by krishna on 8/6/17.
 */

// Add Jquery to head
// window.onload = function() {
    console.log("Yeah!");
    //
    if (window.jQuery) {
        // jQuery is loaded
        console.log("We have JQuery!");
    } else {
        // jQuery is not loaded
        var head = document.getElementsByTagName('head')[0];

        var script_Jquery = document.createElement('script');
        script_Jquery.type = 'text/javascript';
        script_Jquery.onload = function () {

            $('head').append('<script src="http://localhost:3000/javascripts/try.js" type="text/javascript">');
            $('head').append('<link rel="stylesheet" href="http://localhost:3000/stylesheets/my.css" type="text/css" />');
            // $('head').append('<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">');
// link(rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css")
// script(defer src="https://code.getmdl.io/1.3.0/material.min.js")

        };
        script_Jquery.src = 'https://code.jquery.com/jquery-3.2.1.js';
        head.insertBefore(script_Jquery, head.firstChild);
    }

        // var link_my = document.createElement('link');
        // link_my.rel = 'stylesheet';
        // link_my.href = 'http://localhost:3000/stylesheets/my.css';
        // link_my.type = 'text/css';
        // head.appendChild(link_my);
    // }
// };
