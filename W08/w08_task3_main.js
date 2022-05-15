d3.csv("https://sho75th.github.io/InfoVis2022/W08/w08_task1.csv")
    .then( data => {
        data.forEach( d => { d.label = d.label; d.value = +d.value; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 128,
            radius: Math.min( width, height ) / 2,
            margin: {top:10, right:10, bottom:20, left:60}
        };

        const piechart = new PieChart( config, data );
        piechart.update();
    })
    .catch( error => {
        console.log( error );
    });

class PieChart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            radius: config.radius,
            margin: config.margin || {top:10, right:10, bottom:10, left:10}
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height)
            .append('g')
            .attr('transform', `translate(${self.config.width/2}, ${self.config.height/2})`);

        self.pie = d3.pie()
            .value( d => d.value );

        self.arc = d3.arc()
            .innerRadius(0)
            .outerRadius(self.config.radius);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        //self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        //self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        //self.xscale = d3.scaleLinear()
            //.domain([0, d3.max(self.data, d => d.value)])
            //.range([0, self.inner_width]);


        //self.yscale = d3.scaleBand()
            //.domain(self.data.map(d => d.label))
            //.range([self.inner_height, 0])
            //.paddingInner(0.1);

        //self.xaxis = d3.axisBottom( self.xscale )
            //.ticks(5)
            //.tickSizeOuter(0);
        
        //self.yaxis = d3.axisLeft( self.yscale )
            //.tickSizeOuter(0);
            
        //self.xaxis_group = self.chart.append('g')
            //.attr('transform', `translate(0, ${self.inner_height})`);
            //.call(xaxis);

        //self.yaxis_group = self.chart.append('g')
            //.call(yaxis);
            // .attr('transform', `translate(0, ${self.inner_width})`);

    }

    update() {
        let self = this;

       /* const xmin = d3.min( self.data, d => d.value );
        const xmax = d3.max( self.data, d => d.value );
        self.xscale.domain( [xmin, xmax] );

        const ymin = d3.min( self.data, d => d.label );
        const ymax = d3.max( self.data, d => d.label );
        self.yscale.domain( [ymin, ymax] ); */

        self.render();
    }

    render() {
        let self = this;

        self.svg.selectAll('pie')
            .data(self.pie(data))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', 'black')
            .attr('stroke', 'white')
            .style('stroke-width', '2px');

    }
}