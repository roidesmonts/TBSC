<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml"
    xmlns:widget="http://www.netvibes.com/ns/">
    <head>

        <!-- Application Metas -->
        <title>Title of the App</title>
        <meta name="author" content="John Doe" />
        <meta name="description" content="A descriptive description" />

        <!-- Application Standalone emulation files -->
        <link rel="stylesheet" type="text/css"
            href="http://uwa.netvibes.com/lib/c/UWA/assets/css/standalone.css" />
        <script type="text/javascript"
            src="http://uwa.netvibes.com/lib/c/UWA/js/UWA_Standalone_Alone.js"></script>

        <!-- Application JavaScript Source -->
        <script type="text/javascript">
        //<![CDATA[

            /*
                We create the global MyWidget object (it could be any other name).
                This object will be used to store variables and functions.
            */
            var MyWidget = {

                /*
                    The onLoad() function is the first one,
                    it will be triggered by widget "onLoad" event.
                */
                onLoad: function() {

                    // Here we update the content of the widget body.
                    widget.setBody('Hello World!');
                }
            };

            /*
                The "onLoad" event is the very first event triggered when
                the widget is fully loaded or when the preferences are validated.

                Here, we add MyWidget.onLoad() function as "onLoad" event
                listener on the widget.
            */
            widget.addEvent('onLoad', MyWidget.onLoad);

        //]]>
        </script>
      </head>
      <body>
            <p>Loading...</p>
      </body>
</html>


<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"
    xmlns:widget="http://www.netvibes.com/ns/">
    <head>

        <!-- Application Metas -->
        <title>Title of the App</title>
        <meta name="author" content="John Doe" />
        <meta name="description" content="A descriptive description" />

        <!-- Application Standalone emulation files -->
        <link rel="stylesheet" type="text/css"
            href="http://uwa.netvibes.com/lib/c/UWA/assets/css/standalone.css" />
        <script type="text/javascript"
            src="http://uwa.netvibes.com/lib/c/UWA/js/UWA_Standalone_Alone.js"></script>

        <!-- Application Preferences -->
        <widget:preferences>
            <widget:preference name="hellowho" type="text" label="Hello who ?" defaultValue="World"></widget:preference>
        </widget:preferences>

        <!-- Application JavaScript Source -->
        <script type="text/javascript">
        //<![CDATA[

            /*
                We create the global MyWidget object (it could be any other name).
                This object will be used to store variables and functions.
            */
            var MyWidget = {

                toWhom: "no one",

                /*
                    The onLoad() function is the first one,
                    it will be triggered by widget "onLoad" event.
                */
                onLoad: function() {

                    // The URL should return the hellowho in plain text from "who" parameter,
                    // following code will perform a GET request like this:
                    // http://api.example.org/request?who=<widget.getValue('hellowho')>
                    UWA.Data.request('http://api.example.org/request', {
                        onComplete: MyWidget.onComplete,
                        onFailure: MyWidget.onFailure,
                        method: 'GET',
                        data: {
                            who: widget.getValue('hellowho')
                        }
                    });
                },

                onComplete: function(who) {

                    if (who) {
                        MyWidget.toWhom = who;
                    }

                    widget.setBody({
                        tag: 'p',
                        text: 'Hello ' + MyWidget.toWhom + '!'
                    });
                },

                onFailure: function(error) {
                    widget.setBody({
                        tag: 'p',
                        'class': 'error',
                        text: 'Unable to get the API response cause: ' + error
                    });
                }
            }

            /*
                The "onLoad" event is the very first event triggered when
                the widget is fully loaded or when the preferences are validated.

                Here, we add MyWidget.onLoad() function as "onLoad" event
                listener on the widget.
            */
            widget.addEvent('onLoad', MyWidget.onLoad);

        //]]>
        </script>
    </head>
    <body>
        <p>Loading...</p>
    </body>
</html>