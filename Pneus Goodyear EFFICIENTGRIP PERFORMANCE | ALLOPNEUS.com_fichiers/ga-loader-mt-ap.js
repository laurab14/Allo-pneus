 /* Contenu de remplacement pour le fichier http://static.allopneus.com/js/ga-loader-mt-ap.js
 
 Permet de dire à GTM que le tag ga.js en dur n'est plus dispo et que le tag Universal peut être déclenché à la place
 
 */
 var dataLayer = dataLayer || [];
 dataLayer.push({
        'fireUniversalAnalytics': true
    });
