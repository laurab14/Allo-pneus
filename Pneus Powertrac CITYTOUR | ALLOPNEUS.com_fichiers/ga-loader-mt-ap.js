 /* Contenu de remplacement pour le fichier http://static.allopneus.com/js/ga-loader-mt-ap.js
 
 Permet de dire � GTM que le tag ga.js en dur n'est plus dispo et que le tag Universal peut �tre d�clench� � la place
 
 */
 var dataLayer = dataLayer || [];
 dataLayer.push({
        'fireUniversalAnalytics': true
    });
