<?php
  require("libs/dom.php");
  function htmlspecialchars_array(array $array) {
    foreach($array as $key => $val) {
      $array[$key] = (is_array($val)) ? htmlspecialchars_array($val) : htmlspecialchars($val);
    }
    return $array;
  }


  	function DOMinnerHTML(DOMNode $element) 
	{ 
    
    $innerWithoutScripts="";
    
    $children  = $element->childNodes;
 	$cpt=0;
    foreach ($children as $child) 
    { 
    	$innerHTML = "";
        $innerHTML = $element->ownerDocument->saveHTML($child);

        //$findMe = "script";
        //$pos = strpos($innerHTML,$findMe);
        //$innerWithoutScripts.=$pos;
        if($cpt==5)$innerWithoutScripts.=$cpt.$innerHTML;
    	$cpt++;
    }

    //$innerWithoutScripts.="</div>";

    return $innerWithoutScripts; 
	} 


  function ratp () {
  
	error_reporting(0);
	
	$dom = new DomDocument();
	//$dom->preserveWhiteSpace = false;

	$dom->loadHTML(file_get_contents('http://www.ratp.fr/horaires/fr/ratp/metro/prochains_passages/PP/place+de+clichy/13/A'));
	

	$books = new DomDocument();
	$books = $dom->getElementById ('contenu_horaire');

	$tables = $dom->getElementsByTagName('td');

	// Find the correct <table> element you want, and store it in $table
	// ...

	// Assume you want the first table
	
	/*$table = $tables->item(0);
	$sortie="";
	foreach ($table->childNodes as $td) {
	    $sortie.= $td->nodeValue."<br>";
	  }
	
	$file = 'people.txt';
	$handle = fopen($file, 'a');
	fwrite($handle, DOMinnerHTML($books));
	fclose($handle);*/




	$table = array();
    $bus_stop = array();
    $html = file_get_html('http://www.ratp.fr/horaires/fr/ratp/metro/prochains_passages/PP/place+de+clichy/13/A');
    $cpt = 0;
    foreach($html->find('td') as $row) {
       
       $table[] = $row->plaintext;

       $cpt++;
    }
    fclose($handle);

    $it=0;
    for($it=0;$it<4;$it++)
    {
	    $bus_stop[$it]['station'] = $table[$it*2+1];
	    $bus_stop[$it]['time'] = $table[$it*2+2];
	}

    $sortie="<div style='text-align:center;'><img src='horaires/images/lines/metro/13.png' style='width:70px; height:70px;' /></div>";
    foreach ($bus_stop as $value) {
    	$sortie.='<p>'.$value['station'].' : <br><strong>'.'&nbsp'.$value['time'].'</strong></p>';
    }
    return $sortie;	
    //return $sortie;//DOMinnerHTML($books);

    }

    function wikipedia ($name) {
  
  	error_reporting(0);
	
	$dom = new DomDocument();
	//$dom->preserveWhiteSpace = false;
	$dom->loadHTML(file_get_contents('http://www.wolframalpha.com/input/?i=pi'));

	$file = 'people.txt';
	$handle = fopen($file, 'a');
       
    fwrite($handle,$dom->saveHTML()) ;


	$books = new DomDocument();
	$books = $dom->getElementById ('solutions');

	return function DOMinnerHTML(DOMNode $books);
	/*
	//error_reporting(0);
	$url = 'http://fr.wikipedia.org/w/api.php?action=parse&page='.$name.'&format=json&prop=text&section=0';
	$ch = curl_init($url);
	curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt ($ch, CURLOPT_USERAGENT, "TestScript"); // required by wikipedia.org server; use YOUR user agent with YOUR contact information. (otherwise your IP might get blocked)
	$c = curl_exec($ch);

	$json = json_decode($c);

	$content = $json->{'parse'}->{'text'}->{'*'}; // get the main text content of the query (it's parsed HTML)

	// pattern for first match of a paragraph
	$pattern = '#<p>(.*)</p>#Us'; // http://www.phpbuilder.com/board/showthread.php?t=10352690
	if(preg_match($pattern, $content, $matches))
	{
	    // print $matches[0]; // content of the first paragraph (including wrapping <p> tag)
	    return strip_tags($matches[1]); // Content of the first paragraph without the HTML tags.
	    */

	}

?>

