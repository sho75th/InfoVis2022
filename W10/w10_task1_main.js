d3.csv("https://sho75th.github.io/InfoVis2022/w08_task1.csv")
    .then( data => {
        data.forEach( d => { d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 256,
            margin: {top:30, right:10, bottom:60, left:100},
            title: 'Sample Data',
            xlabel: 'Value',
            ylabel: 'Label'
        };

        const bar_chart = new BarChart( config, data );
        bar_chart.update();

        d3.select('#reverse').on('click', d => { bar_chart.sort('reverse'); bar_chart.update(); });
        d3.select('#descend').on('click', d => { bar_chart.sort('descend'); bar_chart.update(); });
        d3.select('#ascend').on('click', d => { bar_chart.sort('ascend'); bar_chart.update(); });
    })
    .catch( error => {
        console.log( error );
    });
