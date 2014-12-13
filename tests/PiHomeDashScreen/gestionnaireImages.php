<?php
/******************************************************************************/
/*                                                                            */
/*                       __        ____                                       */
/*                 ___  / /  ___  / __/__  __ _____________ ___               */
/*                / _ \/ _ \/ _ \_\ \/ _ \/ // / __/ __/ -_|_-<               */
/*               / .__/_//_/ .__/___/\___/\_,_/_/  \__/\__/___/               */
/*              /_/       /_/                                                 */
/*                                                                            */
/*                                                                            */
/******************************************************************************/
/*                                                                            */
/* Titre          : Viewer ou browser d'images à partir d'un répertoire       */
/*                                                                            */
/* URL            : http://www.phpsources.org/scripts186-PHP.htm              */
/* Auteur         : KOogar                                                    */
/* Date édition   : 27 Nov 2006                                               */
/* Website auteur : http://ref.nc                                             */
/*                                                                            */
/******************************************************************************/



/****************************************************************************/
/*                                                                          */
/* le répertoire ou se trouve les images                                    */
/* exemple : image                                                          */
/* pas de / à la fin du nom                                                 */
/*                                                                          */
/****************************************************************************/


$repertoire = 'image';


/****************************************************************************/
/*                                                                          */
/*  DEBUT FONCTIONS -  mettez bien les fonctions pour les 2 fichiers        */
/*                    index.php et view.php                                 */
/*                                                                          */
/****************************************************************************/


function poid_image($dest) 
{ 
$poid = filesize($dest);
$poid = $poid / 1000 ;
$poid = ereg_replace("\.",",",$poid);

return $poid ;
}

function count_pages($folder, $ext, $subfolders) 
{ 
$nb = count_files($folder, $ext, $subfolder);

$nb_pages = $nb/10;
$nb_pages = floor($nb_pages);
$nb_pages = $nb_pages + 1;

return $nb_pages ;

}

function count_files($folder, $ext, $subfolders) 
{ 
   if(substr($folder, -1) != '/') 
      $folder .= '/'; 
    

   $array = false; 
   if(is_array($ext)) 
      $array = true; 
  

   $rep = @opendir($folder); 
   if(!$rep) 
      return -1; 
       
   $nb_files = 0; 

   while($file = readdir($rep)) 
   { 
 
      if($file == '.' || $file == '..') 
continue; 
  

if(is_dir($folder . $file) && $subfolders) 

$nb_files += count_files($folder . $file, $ext, 1); 

      else if(!$array && substr($file, -strlen($ext)) == $ext) 
         $nb_files++; 

    else if($array && in_array(substr($file, strrpos($file, '.') + 1), $ext))
         $nb_files++; 
   } 
    

   closedir($rep); 
   return $nb_files; 
} 


/****************************************************************************/
/*                                                                          */
/*  FIN - FONCTIONS                                                          /
/*                                                                          */
/****************************************************************************/
/****************************************************************************/
/*                                                                          */
/*  FICHIER  index.php ou le nom que vous voulez                             /
/*  1 niveau de l'arborescence                                               /
/*                                                                          */
/****************************************************************************/


$t = 0 ;

 echo '<table  cellpadding="0" cellspacing="0" width="200">
                <tr>
                    <td width="50%">';

    $dossier = "images/";
	$rep=opendir($dossier); 
    while ($file = readdir($rep)) 
    { 
        if($file != '..' && $file !='.' && $file !='') 
        { 
            if (is_dir($dossier . $file)) 
            { 
            $file2 = ereg_replace("_"," ",ereg_replace("-"," ",$file));
            $nb_temp = count_files("$repertoire/".$file,"gif","true");
            
                echo '<td width="50%" align="left">
               <table width="100%">
                            <tr>
                                <td valign="middle" width="30">
<p align="left"><a href="view.php?act=1&d='.$file.'&dir=none&page=1">
<img src="dossier.jpg"></a></p>
                                </td>
                                <td width="125">';


echo' <a href="view.php?act=1&d='.$file.'&dir=none&page=1">'.ucfirst($file2).'
      </a><br>
(<b>'.count_files("$repertoire/".$file,"gif","true").' gifs</b>)</td>
                            </tr>
                        </table></td>'; 
                                                    
                                                    $t++;
            } 
        } 
    } 

    echo '</td></tr></table>';

    closedir($rep); 
    clearstatcache(); 


/****************************************************************************/
/*                                                                          */
/*  FIN FICHIER  index.php ou autre                                          /
/*                                                                          */
/****************************************************************************/
/****************************************************************************/
/*                                                                          */
/*  FICHIER  view.php                                                       */
/* Deuxième niveau de l'arborecence + affichage des images                   /
/*                                                                          */
/****************************************************************************/



@$d = $_GET['d'];
@ $act = $_GET['act'];
@ $page = $_GET['page'];

if (!$page)
{
$page = 1 ;
}
if (!$d and $act == 1)
{
header ("location:index.php");
exit;
}

$dossier = "$repertoire/$d/";
  
if (isset($_GET['dir']) and $_GET['dir'] != 'none') 
{ 

$cat = $_GET['dir'];

       echo ' <table  height="17" width="100%">
             
            <tr>
                <td align="center" height="11" width="33%">';
                
                if ($page == 1)
                {
                echo 'Page précédente';
                }
                else
                {
                $page2 = $page - 1 ;


echo '<a href="view.php?act=1&d='.$d.'&dir='.$_GET['dir'].'&page='.$page2.'">
      Page précédente</a>';

                }
                
                echo '</td>
                <td align="center" height="11" width="33%"><font size="2">';
                
                $rep_temp = "$repertoire/".$d."/".$cat;
                
                $nb_temp = count_pages($rep_temp,"gif","false") + 1;
                for ($ii == 1 ; $ii < $nb_temp ; $ii++)
                {
                if ($ii == $page)
                {
                echo ' -'.$ii.'-  ';
                }
                else
                {
echo ' <a href="view.php?act=1&d='.$d.'&dir='.$_GET['dir'].'&page='.$ii.'">
       '.$ii.'</a>  ';
                }
                }

echo "</font></td><td align=\"center\" width=\"33%\"><font size=\"2\">";
   
   if ($nb_temp > 1 and $page != ($nb_temp - 1))
                {
                $page22 = $page + 1 ;
echo '<a href="view.php?act=1&d='.$d.'&dir='.$_GET['dir'].'&page='.$page22.'">
       Page suivante</a>';
                }
                else
                {
                echo "Page suivante";
                }
   
   echo "</font></td></tr></table>";
        
        
        
@ $file2 = $_GET[dir];


echo '<br /><br />';
    $rep=opendir($dossier . stripslashes($_GET['dir']). '/'); 
    $i = 0 ;
    

    while ($file = readdir($rep)) 
    { 

        if($file != '..' && $file !='.' && $file !='') 
        {
            $photo = $dossier . stripslashes($_GET['dir']) . '/' . $file;
            $width_ref = '200';
            list($width, $height, $type, $attr) = @getimagesize($photo);

            if (!($type)) 
            { 
                echo ''; 
            } 
            else 
            {     
                  $i++; 
      
            $nb = ($page-1)*10;
            
            if ($page > 1 and $i <= $nb)
        {
        echo '';
        }
        else
        {
        
$nb3 = $page*10;
            
        
      if ($i > $nb3)
      {
      break;
      }       
      $taille = getimagesize("".$photo)  ;
      $poid = poid_image($photo);
echo '<center><img src="' . $photo . '">
      <br />Taille : '.$taille[0].'*'.$taille[1].' | Poid : '.$poid.' ko <br />
                <br /><hr color="#000000" width="300"><br /></center>';
             }
            }
           }
          }
    echo'<br /><br />';



    echo '<table  height="17" width="100%">
             
            <tr>
                <td align="center" height="11" width="33%">';
                
                if ($page == 1)
                {
                echo 'Page précédente';
                }
                else
                {
                $page2 = $page - 1 ;
                
echo '<a href="view.php?act=1&d='.$d.'&dir='.$_GET['dir'].'&page='.$page2.'">
       Page précédente</a>';
                }
                
                echo '</td>
                <td align="center" height="11" width="33%"><font size="2">';
                
                for ($iii == 1 ; $iii < $nb_temp ; $iii++)
                {
                if ($iii == $page)
                {
                echo ' -'.$iii.'-  ';
                }
                else
                {
echo ' <a href="view.php?act=1&d='.$d.'&dir='.$_GET['dir'].'&page='.$iii.'">
       '.$iii.'</a>  ';
               }
               }

echo "</font></td><td align=\"center\" width=\"33%\"><font size=\"2\">";
   
   if ($nb_temp > 1 and $page != ($nb_temp - 1))
                {
                $page22 = $page + 1 ;
                
echo '<a href="view.php?act=1&d='.$d.'&dir='.$_GET['dir'].'&page='.$page22.'">
       Page suivante</a>';

                }
                else
                {
                echo "Page suivante";
                }
   
   echo "</td></tr></table>";

    closedir($rep); 
    clearstatcache(); 
}
else 
{ 
echo 'Ci-dessous vous trouverez les sous catégories de <strong>'.$d.'</strong>
    </h4>';

echo '


<table align="center" width="500" cellspacing="0" ><tr><td width="800">';
          echo '<table align="center" width="500" cellspacing="0" ><tr><td >';
$t = 0 ;


    $rep=opendir($dossier); 
    while ($file = readdir($rep)) 
    { 
        if($file != '..' && $file !='.' && $file !='') 
        { 
            if (is_dir($dossier . $file)) 
            { 
            
            $file2 = ereg_replace("_"," ",ereg_replace("-"," ",$file));


if ($t == 3)
               {
               echo '</tr></table><hr color="#000000" size="1">';
     echo '<table align="center" cellpadding="0" cellspacing="0" width="100%">
                <tr>';

               $t = 0 ;
               }
               
                echo '<td width="33%"><table width="100%">
                       <tr>
                       <td valign="middle" width="29">
    <p align="center"><a href="view.php?act=1&d='.$d.'&dir='.$file.'&page=1">
                       <img src="dossier.jpg"></a></p>
                       </td>
                          <td width="125">';

echo'<a href="view.php?act=1&d='.$d.'&dir='.$file.'&page=1">'.ucfirst($file2).'
     </a><br />
(<b>'.count_files("$repertoire/".$d."/".$file,"gif","false").' gifs</b>)</td>
                            </tr>
                        </table></td>'; 

                   $t++;

            } 
        } 
    } 
    closedir($rep); 
    clearstatcache(); 
echo '</tr></table></td></tr></table>';
}

/****************************************************************************/
/*                                                                          */
/*  FIN FICHIER  view.php                                                   */
/*                                                                          */
/****************************************************************************/
?>