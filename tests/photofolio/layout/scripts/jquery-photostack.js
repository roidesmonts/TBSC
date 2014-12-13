$(function() {
    /**
     * navR,navL are flags for controlling the categories navigation
     * first gives us the position of the category on the left
     * positions are the left positions for each of the 5 categories displayed at a time
     */
	 
	horloge();
	ratp();
  wikipedia("pi");
    var navR, navL = false;
    var first = 1;
    var positions = {
        '0': 0,
        '1': 194,
        '2': 388,
        '3': 582,
        '4': 776
    }
    var $categories = $('#categories');
    /**
     * number of categories available
     */
    var elems = $categories.children().length;
    var $slider = $('#slider');
    /**
     * let's position all the categories on the right side of the window
     */
    var hiddenRight = $(window).width() - $categories.offset().left;
    $categories.children('li').css('left', hiddenRight + 'px');
    /**
     * move the first 5 categories to the viewport
     */
    $categories.children('li:lt(5)').each(function(i) {
        var $elem = $(this);
        $elem.animate({
            'left': positions[i] + 'px',
            'opacity': 1
        }, 800, function() {
            if (elems > 5) enableNavRight();
        });
    });
    /**
     * next category
     */
    $slider.find('.next').bind('click', function() {
        if (!$categories.children('li:nth-child(' + parseInt(first + 5) + ')').length || !navR) return;
        disableNavRight();
        disableNavLeft();
        moveRight();
    });
    /**
     * we move the first category (the one on the left) to the left side of the window
     * the next 4 categories slide one position, and finally the next one in the list
     * slides in, to fill the space of the first one
     */
    function moveRight() {
            var hiddenLeft = $categories.offset().left + 163;
            var cnt = 0;
            $categories.children('li:nth-child(' + first + ')').animate({
                'left': -hiddenLeft + 'px',
                'opacity': 0
            }, 500, function() {
                var $this = $(this);
                $categories.children('li').slice(first, parseInt(first + 4)).each(function(i) {
                    var $elem = $(this);
                    $elem.animate({
                        'left': positions[i] + 'px'
                    }, 800, function() {
                        ++cnt;
                        if (cnt == 4) {
                            $categories.children('li:nth-child(' + parseInt(first + 5) + ')').animate({
                                'left': positions[cnt] + 'px',
                                'opacity': 1
                            }, 500, function() {
                                //$this.hide();
                                ++first;
                                if (parseInt(first + 4) < elems) enableNavRight();
                                enableNavLeft();
                            });
                        }
                    });
                });
            });
        }
    /**
    * previous category
    */
    $slider.find('.prev').bind('click', function() {
        if (first == 1 || !navL) return;
        disableNavRight();
        disableNavLeft();
        moveLeft();
    });
    /**
     * we move the last category (the one on the right) to the right side of the window
     * the previous 4 categories slide one position, and finally the previous one in the list
     * slides in, to fill the space of the last one
     */
    function moveLeft() {
            var hiddenRight = $(window).width() - $categories.offset().left;
            var cnt = 0;
            var last = first + 4;
            $categories.children('li:nth-child(' + last + ')').animate({
                'left': hiddenRight + 'px',
                'opacity': 0
            }, 500, function() {
                var $this = $(this);
                $categories.children('li').slice(parseInt(last - 5), parseInt(last - 1)).each(function(i) {
                    var $elem = $(this);
                    $elem.animate({
                        'left': positions[i + 1] + 'px'
                    }, 800, function() {
                        ++cnt;
                        if (cnt == 4) {
                            $categories.children('li:nth-child(' + parseInt(last - 5) + ')').animate({
                                'left': positions[0] + 'px',
                                'opacity': 1
                            }, 500, function() {
                                //$this.hide();
                                --first;
                                enableNavRight();
                                if (first > 1) enableNavLeft();
                            });
                        }
                    });
                });
            });
        }
    /**
    * disable or enable category navigation
    */
    function disableNavRight() {
        navR = false;
        $slider.find('.next').addClass('disabled');
    }

    function disableNavLeft() {
        navL = false;
        $slider.find('.prev').addClass('disabled');
    }

    function enableNavRight() {
        navR = true;
        $slider.find('.next').removeClass('disabled');
    }

    function enableNavLeft() {
        navL = true;
        $slider.find('.prev').removeClass('disabled');
    }
});

function horloge()
{
  dows  = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  mois  = ["janv", "f&eacute;v", "mars", "avril", "mai", "juin", "juillet", "ao&ucirc;t", "sept", "oct", "nov", "d&eacute;c"];

  now          = new Date;
  heure        = now.getHours();
  min          = now.getMinutes();
  sec          = now.getSeconds();
  jour_semaine = dows[now.getDay()];
  jour         = now.getDate();
  mois         = mois[now.getMonth()];
  annee        = now.getFullYear();

  if (sec < 10){sec0 = "0";}else{sec0 = "";}
  if (min < 10){min0 = "0";}else{min0 = "";}
  if (heure < 10){heure0 = "0";}else{heure0 = "";}

  horloge_heure   = heure + ":" + min0 + min;
  horloge_date    = "<span class='horloge_grey'>" + jour_semaine + "</span> " + jour + " " + mois + " <span class='horloge_grey'>" + annee + "</span>";
  horloge_content = "<div class='horloge_heure'>" + horloge_heure + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='horloge_date'>" + horloge_date + "</div>";

  $("#horloge").html(horloge_content);

  horloge_timeout = setTimeout("horloge()", 1000);
}
function file_get_contents(url, flags, context, offset, maxLen) {
  //  discuss at: http://phpjs.org/functions/file_get_contents/
  // original by: Legaev Andrey
  //    input by: Jani Hartikainen
  //    input by: Raphael (Ao) RUDLER
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //        note: This function uses XmlHttpRequest and cannot retrieve resource from different domain without modifications.
  //        note: Synchronous by default (as in PHP) so may lock up browser. Can
  //        note: get async by setting a custom "phpjs.async" property to true and "notification" for an
  //        note: optional callback (both as context params, with responseText, and other JS-specific
  //        note: request properties available via 'this'). Note that file_get_contents() will not return the text
  //        note: in such a case (use this.responseText within the callback). Or, consider using
  //        note: jQuery's: $('#divId').load('http://url') instead.
  //        note: The context argument is only implemented for http, and only partially (see below for
  //        note: "Presently unimplemented HTTP context options"); also the arguments passed to
  //        note: notification are incomplete
  //        test: skip
  //   example 1: var buf file_get_contents('http://google.com');
  //   example 1: buf.indexOf('Google') !== -1
  //   returns 1: true

  var tmp, headers = [],
    newTmp = [],
    k = 0,
    i = 0,
    href = '',
    pathPos = -1,
    flagNames = 0,
    content = null,
    http_stream = false;
  var func = function(value) {
    return value.substring(1) !== '';
  };

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  var ini = this.php_js.ini;
  context = context || this.php_js.default_streams_context || null;

  if (!flags) {
    flags = 0;
  }
  var OPTS = {
    FILE_USE_INCLUDE_PATH: 1,
    FILE_TEXT: 32,
    FILE_BINARY: 64
  };
  if (typeof flags === 'number') { // Allow for a single string or an array of string flags
    flagNames = flags;
  } else {
    flags = [].concat(flags);
    for (i = 0; i < flags.length; i++) {
      if (OPTS[flags[i]]) {
        flagNames = flagNames | OPTS[flags[i]];
      }
    }
  }

  if (flagNames & OPTS.FILE_BINARY && (flagNames & OPTS.FILE_TEXT)) { // These flags shouldn't be together
    throw 'You cannot pass both FILE_BINARY and FILE_TEXT to file_get_contents()';
  }

  if ((flagNames & OPTS.FILE_USE_INCLUDE_PATH) && ini.include_path && ini.include_path.local_value) {
    var slash = ini.include_path.local_value.indexOf('/') !== -1 ? '/' : '\\';
    url = ini.include_path.local_value + slash + url;
  } else if (!/^(https?|file):/.test(url)) { // Allow references within or below the same directory (should fix to allow other relative references or root reference; could make dependent on parse_url())
    href = this.window.location.href;
    pathPos = url.indexOf('/') === 0 ? href.indexOf('/', 8) - 1 : href.lastIndexOf('/');
    url = href.slice(0, pathPos + 1) + url;
  }

  var http_options;
  if (context) {
    http_options = context.stream_options && context.stream_options.http;
    http_stream = !! http_options;
  }

  if (!context || http_stream) {
    var req = this.window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
    if (!req) {
      throw new Error('XMLHttpRequest not supported');
    }

    var method = http_stream ? http_options.method : 'GET';
    var async = !! (context && context.stream_params && context.stream_params['phpjs.async']);

    if (ini['phpjs.ajaxBypassCache'] && ini['phpjs.ajaxBypassCache'].local_value) {
      url += (url.match(/\?/) == null ? '?' : '&') + (new Date())
        .getTime(); // Give optional means of forcing bypass of cache
    }

    req.open(method, url, async);
    if (async) {
      var notification = context.stream_params.notification;
      if (typeof notification === 'function') {
        // Fix: make work with req.addEventListener if available: https://developer.mozilla.org/En/Using_XMLHttpRequest
        if (0 && req.addEventListener) { // Unimplemented so don't allow to get here
          /*
          req.addEventListener('progress', updateProgress, false);
          req.addEventListener('load', transferComplete, false);
          req.addEventListener('error', transferFailed, false);
          req.addEventListener('abort', transferCanceled, false);
          */
        } else {
          req.onreadystatechange = function(aEvt) { // aEvt has stopPropagation(), preventDefault(); see https://developer.mozilla.org/en/NsIDOMEvent
            // Other XMLHttpRequest properties: multipart, responseXML, status, statusText, upload, withCredentials
            /*
  PHP Constants:
  STREAM_NOTIFY_RESOLVE   1       A remote address required for this stream has been resolved, or the resolution failed. See severity  for an indication of which happened.
  STREAM_NOTIFY_CONNECT   2     A connection with an external resource has been established.
  STREAM_NOTIFY_AUTH_REQUIRED 3     Additional authorization is required to access the specified resource. Typical issued with severity level of STREAM_NOTIFY_SEVERITY_ERR.
  STREAM_NOTIFY_MIME_TYPE_IS  4     The mime-type of resource has been identified, refer to message for a description of the discovered type.
  STREAM_NOTIFY_FILE_SIZE_IS  5     The size of the resource has been discovered.
  STREAM_NOTIFY_REDIRECTED    6     The external resource has redirected the stream to an alternate location. Refer to message .
  STREAM_NOTIFY_PROGRESS  7     Indicates current progress of the stream transfer in bytes_transferred and possibly bytes_max as well.
  STREAM_NOTIFY_COMPLETED 8     There is no more data available on the stream.
  STREAM_NOTIFY_FAILURE   9     A generic error occurred on the stream, consult message and message_code for details.
  STREAM_NOTIFY_AUTH_RESULT   10     Authorization has been completed (with or without success).

  STREAM_NOTIFY_SEVERITY_INFO 0     Normal, non-error related, notification.
  STREAM_NOTIFY_SEVERITY_WARN 1     Non critical error condition. Processing may continue.
  STREAM_NOTIFY_SEVERITY_ERR  2     A critical error occurred. Processing cannot continue.
  */
            var objContext = {
              responseText: req.responseText,
              responseXML: req.responseXML,
              status: req.status,
              statusText: req.statusText,
              readyState: req.readyState,
              evt: aEvt
            }; // properties are not available in PHP, but offered on notification via 'this' for convenience
            // notification args: notification_code, severity, message, message_code, bytes_transferred, bytes_max (all int's except string 'message')
            // Need to add message, etc.
            var bytes_transferred;
            switch (req.readyState) {
              case 0:
                //     UNINITIALIZED     open() has not been called yet.
                notification.call(objContext, 0, 0, '', 0, 0, 0);
                break;
              case 1:
                //     LOADING     send() has not been called yet.
                notification.call(objContext, 0, 0, '', 0, 0, 0);
                break;
              case 2:
                //     LOADED     send() has been called, and headers and status are available.
                notification.call(objContext, 0, 0, '', 0, 0, 0);
                break;
              case 3:
                //     INTERACTIVE     Downloading; responseText holds partial data.
                bytes_transferred = req.responseText.length * 2; // One character is two bytes
                notification.call(objContext, 7, 0, '', 0, bytes_transferred, 0);
                break;
              case 4:
                //     COMPLETED     The operation is complete.
                if (req.status >= 200 && req.status < 400) {
                  bytes_transferred = req.responseText.length * 2; // One character is two bytes
                  notification.call(objContext, 8, 0, '', req.status, bytes_transferred, 0);
                } else if (req.status === 403) { // Fix: These two are finished except for message
                  notification.call(objContext, 10, 2, '', req.status, 0, 0);
                } else { // Errors
                  notification.call(objContext, 9, 2, '', req.status, 0, 0);
                }
                break;
              default:
                throw 'Unrecognized ready state for file_get_contents()';
            }
          };
        }
      }
    }

    if (http_stream) {
      var sendHeaders = http_options.header && http_options.header.split(/\r?\n/);
      var userAgentSent = false;
      for (i = 0; i < sendHeaders.length; i++) {
        var sendHeader = sendHeaders[i];
        var breakPos = sendHeader.search(/:\s*/);
        var sendHeaderName = sendHeader.substring(0, breakPos);
        req.setRequestHeader(sendHeaderName, sendHeader.substring(breakPos + 1));
        if (sendHeaderName === 'User-Agent') {
          userAgentSent = true;
        }
      }
      if (!userAgentSent) {
        var user_agent = http_options.user_agent || (ini.user_agent && ini.user_agent.local_value);
        if (user_agent) {
          req.setRequestHeader('User-Agent', user_agent);
        }
      }
      content = http_options.content || null;
      /*
      // Presently unimplemented HTTP context options
      var request_fulluri = http_options.request_fulluri || false; // When set to TRUE, the entire URI will be used when constructing the request. (i.e. GET http://www.example.com/path/to/file.html HTTP/1.0). While this is a non-standard request format, some proxy servers require it.
      var max_redirects = http_options.max_redirects || 20; // The max number of redirects to follow. Value 1 or less means that no redirects are followed.
      var protocol_version = http_options.protocol_version || 1.0; // HTTP protocol version
      var timeout = http_options.timeout || (ini.default_socket_timeout && ini.default_socket_timeout.local_value); // Read timeout in seconds, specified by a float
      var ignore_errors = http_options.ignore_errors || false; // Fetch the content even on failure status codes.
      */
    }

    if (flagNames & OPTS.FILE_TEXT) { // Overrides how encoding is treated (regardless of what is returned from the server)
      var content_type = 'text/html';
      if (http_options && http_options['phpjs.override']) { // Fix: Could allow for non-HTTP as well
        content_type = http_options['phpjs.override']; // We use this, e.g., in gettext-related functions if character set
        //   overridden earlier by bind_textdomain_codeset()
      } else {
        var encoding = (ini['unicode.stream_encoding'] && ini['unicode.stream_encoding'].local_value) ||
          'UTF-8';
        if (http_options && http_options.header && (/^content-type:/im)
          .test(http_options.header)) { // We'll assume a content-type expects its own specified encoding if present
          content_type = http_options.header.match(/^content-type:\s*(.*)$/im)[1]; // We let any header encoding stand
        }
        if (!(/;\s*charset=/)
          .test(content_type)) { // If no encoding
          content_type += '; charset=' + encoding;
        }
      }
      req.overrideMimeType(content_type);
    }
    // Default is FILE_BINARY, but for binary, we apparently deviate from PHP in requiring the flag, since many if not
    //     most people will also want a way to have it be auto-converted into native JavaScript text instead
    else if (flagNames & OPTS.FILE_BINARY) { // Trick at https://developer.mozilla.org/En/Using_XMLHttpRequest to get binary
      req.overrideMimeType('text/plain; charset=x-user-defined');
      // Getting an individual byte then requires:
      // responseText.charCodeAt(x) & 0xFF; // throw away high-order byte (f7) where x is 0 to responseText.length-1 (see notes in our substr())
    }

    try {
      if (http_options && http_options['phpjs.sendAsBinary']) { // For content sent in a POST or PUT request (use with file_put_contents()?)
        req.sendAsBinary(content); // In Firefox, only available FF3+
      } else {
        req.send(content);
      }
    } catch (e) {
      // catches exception reported in issue #66
      return false;
    }

    tmp = req.getAllResponseHeaders();
    if (tmp) {
      tmp = tmp.split('\n');
      for (k = 0; k < tmp.length; k++) {
        if (func(tmp[k])) {
          newTmp.push(tmp[k]);
        }
      }
      tmp = newTmp;
      for (i = 0; i < tmp.length; i++) {
        headers[i] = tmp[i];
      }
      this.$http_response_header = headers; // see http://php.net/manual/en/reserved.variables.httpresponseheader.php
    }

    if (offset || maxLen) {
      if (maxLen) {
        return req.responseText.substr(offset || 0, maxLen);
      }
      return req.responseText.substr(offset);
    }
    return req.responseText;
  }
  return false;
}

function ratp()
{
	$.ajax({
    async : false,
    type: "GET",
    url: "./ajax.php",
    data: "block=ratp",
    success: function(html){
      //html.replace("<script"," ");
	    //alert(html);
      $("#ratp").html(html);
    }
  });

  meteo_timeout = setTimeout("ratp()", 5000);

}
	//var text="http://www.ratp.fr/horaires/fr/ratp/metro/prochains_passages/PP/place+de+clichy/13/A";
function wikipedia(){    /* attach a submit handler to the form */
    //$("#search").submit(function(event) {

      /* stop form from submitting normally */
      //event.preventDefault();

      /* get some values from elements on the page: */
      //var $form = $( this ),
       /*   url = $form.attr( 'action' );

       Send the data using post 
      var posting = $.post( url, { name: $('#name').val()} );

      /* Alerts the results */

      //posting.done(function( data ) {
        
        var name = "pi";
        //$("#wiki").html($('#name').val());
        $.ajax({
        async : false,
        type: "GET",
        url: "./ajax.php",
        data: "block=wikipedia&name=" + name,
        success: function(html){
          //html.replace("<script"," ");
          alert(html);
          $("#wiki").html(html);
          }
  //});
        });
    }



function writeHoraireXitiTag(tag)
{
  var aCodeClient = "63390";
  var aSection = "9";
  var aPrefix = "HORAIRES";
  var aSeparator = "_";

  var aXitiTag = aPrefix + aSeparator + tag;
  //writeXitiTag(aCodeClient, aSection, aXitiTag);
}
function writeXitiTag (s,s2,p)
{
  hsh = new Date();
  hsd = document;
  hsi = '<img name="xiti_img" width="1" height="1" src="http://logc5.xiti.com/hit.xiti?s=' + s + '&s2=' + s2;
  hsi += '&p=' + p + '&hl=' + hsh.getHours() + 'x' + hsh.getMinutes()+ 'x' + hsh.getSeconds();

  if(parseFloat(navigator.appVersion)>=4)
  {
    Xiti_s=screen;
    hsi += '&r=' + Xiti_s.width + 'x' + Xiti_s.height +'x'+Xiti_s.pixelDepth + 'x' + Xiti_s.colorDepth;
  }
  aXitiUrl= hsi + '&ref=' + hsd.referrer.replace(/&/g, '$') + '" >' ;
  hsd.writeln(aXitiUrl);

  //Pour l'affichage du tag Xiti dans la page, decommenter la ligne suivante
  //hsd.writeln("<B>" + p + "</B>");

  //Pour tester le bon envoi du tag Xiti, decommenter la ligne suivante
  //document.xiti_img.onload = new Function ('alert("image xiti recue : "+ aXitiUrl);');
}
