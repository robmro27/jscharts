// create chart
function doughnut( elemId, inputData, innerTitle, innerSubTitle ) {
    
    // fill texts
    $('#'+elemId).next().find('.donut-inner-title').html(innerTitle);
    $('#'+elemId).next().find('.donut-inner-sub-title').html(innerSubTitle);
    
    
    // parse data
    var labels = [];
    var data = [];
    for (var j = 0 ; j < inputData.length; j++) {
        var key = Object.keys(inputData[j])[0];
        var value = inputData[j][key];
        labels.push(key);
        data.push(value);
    }
    
    // colours fixed labels and values from arg 
    var chartData = {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: [
                    "#009BD4",
                    "#006289",
                    "#6F85BF"
                ],
                hoverBackgroundColor: [
                    "#009BD4",
                    "#006289",
                    "#6F85BF"
                ],
            }]
    };
    
    // sum values for percentage calculations
    var sum = 0;
    for (var i = 0; i < data.length; i++  ) {
        sum += data[i];
    }
    
    // element for chart
    var ctx = document.getElementById(elemId);
    
    // create chart
    return new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options: {
            legend: {
                display: false
            },
            cutoutPercentage: 60, 
            legend:{display:false}, 
            showAllTooltips: true,
            tooltips: {
                labelFontSize:8,
                cornerRadius: 0,
                backgroundColor: 'transparent',
                xPadding: 0,
                yPadding: 0,
                caretSize: -14, // minus margin to display text on center
                callbacks: {
                    label: function(tooltipItem, data) {
                        var value = data.datasets[0].data[tooltipItem.index];
                        var percentage = Math.round(value / sum * 100);
                        return percentage + '%';
                    },
                }
            },
        },
    });
};




// global settings for each doughnut chart            
Chart.pluginService.register({
    
    beforeRender: function (chart) {
      if (chart.config.options.showAllTooltips) {
          // create an array of tooltips
          // we can't use the chart tooltip because there is only one tooltip per chart
          chart.pluginTooltips = [];
          chart.config.data.datasets.forEach(function (dataset, i) {
              chart.getDatasetMeta(i).data.forEach(function (sector, j) {
                  chart.pluginTooltips.push(new Chart.Tooltip({
                      _chart: chart.chart,
                      _chartInstance: chart,
                      _data: chart.data,
                      _options: chart.options.tooltips,
                      _active: [sector]
                  }, chart));
              });
          });

          // turn off normal tooltips
          chart.options.tooltips.enabled = false;
      }
    },

    afterDraw: function (chart, easing) {
      if (chart.config.options.showAllTooltips) {
          // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
          if (!chart.allTooltipsOnce) {
              if (easing !== 1)
                  return;
              chart.allTooltipsOnce = true;
          }

          // turn on tooltips
          chart.options.tooltips.enabled = true;
          Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
              tooltip.initialize();
              tooltip.update();
              // we don't actually need this since we are not animating tooltips
              tooltip.pivot();
              tooltip.transition(easing).draw();
          });
          chart.options.tooltips.enabled = false;
      }
    }

});