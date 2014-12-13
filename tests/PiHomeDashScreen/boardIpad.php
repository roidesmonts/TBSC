<?php session_start();?>
<p>Bonjour !</p>

<p> et ton ip est : <?php echo $_SERVER['REMOTE_ADDR']?></p>
<p> ton id est : <?php echo $_SESSION['id'];?></p>
<p> le nombre de visiteurs actuellement est de : <?php echo $_GET['cpt'];?>

<p>Si tu veux changer de prénom, <a href="formulaire.php">clique ici</a> pour revenir à la page formulaire.php.</p>