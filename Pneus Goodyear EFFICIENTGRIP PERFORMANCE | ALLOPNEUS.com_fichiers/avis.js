var AvisVerifies = {
    chartLoaded: false,
    loadAvisVerifiesStats: function (url, $htmlContainer) {
        console.log("Avis clients : chargement du contenu de l'url " + url);

        $.get(url, function (reviewStatsHtml) {
            $htmlContainer.html(reviewStatsHtml);

            if ($('ul.tabs > li[data-chart="avis"] a').hasClass('active')) {
                if (!AvisVerifies.chartLoaded) {
                    AvisVerifies.drawGraph(ui.radarChart.canvasIdentifier, ui.radarChart.graphData, ui.radarChart.graphOptions);
                    AvisVerifies.chartLoaded = true;
                }
            } else {
                $('ul.tabs > li[data-chart="avis"]').on('click', function () {
                    if (!AvisVerifies.chartLoaded) {
                        AvisVerifies.drawGraph(ui.radarChart.canvasIdentifier, ui.radarChart.graphData, ui.radarChart.graphOptions);
                        AvisVerifies.chartLoaded = true;
                    }
                });
            }
            console.log("Avis clients : chargement terminé");
        });
    },
    drawGraph: function (canvasIdentifier, graphData, graphOptions) {
        var ctx = $(canvasIdentifier).get(0).getContext("2d");
        var myRadarChart = new Chart(ctx).Radar(graphData, graphOptions);
    },
    loadAvisVerifiesContent: function (url, $htmlContainer) {
        $.get(url, function (html) {
            $htmlContainer.html(html);
        });
    }
};

