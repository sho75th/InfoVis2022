let input_data;
let scatter_plot;
let bar_chart;
let filter = [];

d3.csv("https://sho75th.github.io/InfoVis2022/covid.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.covid = +d.covid;
            d.severe = +d.severe;
        });

        const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
        color_scale.domain(['0','10','20']);

        scatter_plot = new ScatterPlot( {
            parent: '#drawing_region_scatterplot',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'new patients [person]',
            ylabel: 'severely [person]',
            cscale: color_scale
        }, input_data );
        scatter_plot.update();

        bar_chart = new BarChart( {
            parent: '#drawing_region_barchart',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
            xlabel: 'average_temperature[°C]',
            cscale: color_scale
        }, input_data );
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });

function Filter() {
    if ( filter.length == 0 ) {
        scatter_plot.data = input_data;
    }
    else {
        scatter_plot.data = input_data.filter( d => filter.includes( d.tag ) );
    }
    scatter_plot.update();
}
