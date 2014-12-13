<?php

  function htmlspecialchars_array(array $array) {
    foreach($array as $key => $val) {
      $array[$key] = (is_array($val)) ? htmlspecialchars_array($val) : htmlspecialchars($val);
    }
    return $array;
  }

  /////////////////////////////////////////////////
  //  Meteo
  /////////////////////////////////////////////////

  function meteo () {

    $meteo  = '<!-- widget meteo -->
<div id="widget_c82087de3194f879069f4a84876fb8fc">
<span id="l_c82087de3194f879069f4a84876fb8fc"><a href="http://www.my-meteo.fr/">M&eacute;t&eacute;o du jour</a></span>
<script type="text/javascript">
(function() {
	var my = document.createElement("script"); my.type = "text/javascript"; my.async = true;
 	my.src = "http://services.my-meteo.fr/widget/js2.php?ville=251&format=vertical&nb_jours=3&temps&icones&vent&c1=393939&c2=a9a9a9&c3=e6e6e6&c4=ffffff&c5=00d2ff&c6=d21515&police=0&t_icones=1&x=160&y=321&id=c82087de3194f879069f4a84876fb8fc";
 	var z = document.getElementsByTagName("script")[0]; z.parentNode.insertBefore(my, z);
})();
</script>
</div>
<!-- widget meteo -->';

    return $meteo;
  }

