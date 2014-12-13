<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
  <head>
    <title>Jarvis</title>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
    <meta http-equiv="Content-Language" content="Fr"/>
    <meta http-equiv="Cache-Control" content="no-cache">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <meta http-equiv="refresh" content="3600;url=index.php">
    <script type="text/javascript" src="jquery.js"></script>
    <script type="text/javascript" src="javascript.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css"/>
  </head>
  <body>

    <div id="main">
      <div id="horloge"></div>
      <div id="meteo"></div>
	  <div id="earth">
	  <?php echo file_get_contents('http://mobile.lemonde.fr'); ?>
	  </div>
    </div>

  </body>
</html>
