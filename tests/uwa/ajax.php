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

                onLoad: function() {

                    // the URL should return 'World' in plain text
                    UWA.Data.getText('http://api.example.org/request', MyWidget.onComplete);
                },

                onComplete: function(who) {

                    if (who) {
                        MyWidget.toWhom = who;
                    }

                    widget.setBody({
                        tag: 'p',
                        text: 'Hello ' + MyWidget.toWhom + '!'
                    });
                }
            }

            /*
                The "onLoad" event is the very first event triggered when the widget is loaded.
                Here, we make it trigger the MyWidget.onLoad() function as listener.
            */
            widget.addEvent('onLoad', MyWidget.onLoad);

        //]]>
        </script>
    </head>
    <body>
        <p>Loading...</p>
    </body>
</html>