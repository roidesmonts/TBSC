<?php
function LoadPNG($imgname)
{
    /* Tente d'ouvrir l'image */
    $im = @imagecreatefromgif($imgname);

    /* Traitement en cas d'échec */
    if(!$im)
    {
        /* Création d'une image vide */
        $im  = imagecreatetruecolor(150, 30);
        $bgc = imagecolorallocate($im, 255, 255, 255);
        $tc  = imagecolorallocate($im, 0, 0, 0);

        imagefilledrectangle($im, 0, 0, 150, 30, $bgc);

        /* On y affiche un message d'erreur */
        imagestring($im, 1, 5, 5, 'Erreur de chargement ' . $imgname, $tc);
    }

    return $im;
}

header('Content-Type: image/gif');

$img = LoadPNG('images/1.gif');

//echo $img;

imagegif($img);
imagedestroy($img);
?>