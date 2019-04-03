/*

L'exemple suivant est avec des ul/li mais on peut indiff�remment utiliser des div/span.
La seule contrainte est d'utiliser les noms de class "jour"/"heure"/"minute"/"seconde" 
et "fini" pour le message final qui sera affich� dans le container (ici un ul trouv� avec
$('#essai') ) dans le container.

L'initialisation doit se faire APRES le tag ou bien AVANT dans le $.ready()

	<ul id="essai">
		<li class="jour">000</li>
		<li class="separateur">:</li>
		<li class="heure">000</li>
		<li class="minute">000</li>
		<li class="seconde">000</li>
		<li class="fini">This is the...</li>
	</ul>

	<script type="text/javascript">
	$('#essai').setFinalCountdown(2011, 10, 5, 10, 28, 20);
	</script>
	
Pour tout probl�me : Florent Genette	
Perso, je pense que la liste en ul/li est s�mantiquement plus correct que des p/span car l'ordre est signifiant
 
 */

// la fonction � �xecuter p�riodiquement	
function countdownCycle() {
	$('.auto_countdown').each(function() {
		// maintenant :
		var now = new Date();
		// on calcule la distance en secondes entre les 2 dates :
		var diff = -now.getTime() + $(this).data('final').getTime();
		if (diff > 0) {
			// attention : ce calcul n'est pas toujours exact s'il y a un
			// changement d'heure d'�t�/hiver
			var days = Math.floor(diff / 86400000);
			diff -= days * 86400000;
			if (days < 10)
				days = '0'+days;
			if (days == 1)
				{
					day_label = 'jour';
				} else {
					day_label = 'jours';
				}
			var hours = Math.floor(diff / 3600000);
			diff -= hours * 3600000;
			if (hours < 10)
				hours = '0'+hours;
			var minutes = Math.floor(diff / 60000);
			diff -= minutes * 60000;
			if (minutes < 10)
				minutes = '0'+minutes;
			var seconds = Math.floor(diff / 1000);
			if (seconds < 10)
				seconds = '0'+seconds;
			// le rendu des atome dans le container
			$(this).find('.jour').text(days);
			$(this).find('.jour_sep').text(day_label);
			$(this).find('.heure').text(hours);
			$(this).find('.minute').text(minutes);
			$(this).find('.seconde').text(seconds);
		} else {
			// si on est arriv� au bout du d�compte :
			$(this).children().hide();  // on cache tout
			$(this).find('.fini').show();  // et on affiche le message final
		}

	});
}

// j'�tends les tag avec la m�thode setFinalCountdown
jQuery.fn.extend({
	setFinalCountdown : function(y, mnth, d, h, m, s) {
		return this.each(function() {
			$(this).data('final', new Date(y, mnth - 1, d, h, m, s));
			$(this).addClass('auto_countdown');  // on ajoute une classe qui va servir d'accesseur aux container car setInterval est global
			$(this).find('.fini').hide();  // au d�part on cache le message final
			countdownCycle();
		});
	}
});

$(function() {

	// le background pour tous les d�comptes :
	var clockwork = setInterval(countdownCycle, 1000);

});
