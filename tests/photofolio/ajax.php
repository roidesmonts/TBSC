<?php

  header('Content-type: text/html; charset=utf-8');
  require_once('inc.php');

  if(isset($_REQUEST['block'])){$block = $_REQUEST['block'];}else{$block = 'none';}

  /////////////////////////////////////////////////
  //  METEO
  /////////////////////////////////////////////////

  if($block == 'ratp'){
    echo ratp();
  }
  if($block == 'wikipedia')
  {
  	echo wikipedia($_REQUEST['name']);
  }


?>
