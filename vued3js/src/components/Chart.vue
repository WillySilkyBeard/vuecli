<template>
    <div >
    <p>chart works!!!</p>
    <div id="chart" ref="chart">test</div>
    </div>
</template>

<script>
import * as d3 from 'd3';
export default {
    data() {
        return {
            element: 'any',
            margin:  {top: 20, right: 30, bottom: 40, left: 30},
            x: '',
            y: '',
            svg: '',
            bars: '',
            barsLabels: '',
            textLabels: '',
            text: '',
            data: [
                {name: 'A', value: -15},
                {name: 'B', value: 20},
                {name: 'C', value: 60},
                {name: 'D', value: -108},
                {name: 'E', value: 2},
                {name: 'Toyota', value: -200},
                {name: 'Honda', value: 20},
                {name: 'CC', value: 22},
                {name: 'DD', value: -80},
                {name: 'EE', value: 2},
            ],
        }
    },
    methods: {

        initChart() {
            // create scales
            this.x = d3.scaleLinear()
                .domain(d3.extent(this.data, d => d.value))
                .range([0, this.width])
            this.y = d3.scaleBand()
                .domain(this.data.map(d => d.name))
                .paddingInner(0.1)
                .range([0, this.height])

            // x & y domains
            // this.x.domain(d3.extent(this.data, d => d.value))
            // this.y.domain(this.data.map(d => d.name))

            // console.log(this.data.map(d => this.x(Math.min(0, d.value))))
            
            // svg
            this.svg = d3.select(this.$refs.chart).append('svg')
                .attr('width', this.width + this.margin.left + this.margin.right)
                .attr('height', this.height + this.margin.top + this.margin.bottom)
                .append('g')
                .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")") // сдвиг оси "вниз и вправо"
            // add bars
            this.svg.selectAll(".bar")
                .data(this.data)
                .enter().append("rect") 
                .attr("class", d => "bar bar--" + (d.value < 0 ? "negative" : "positive"))
                .attr("x", d => this.x(Math.min(0, d.value)))
                .attr("y", d => this.y(d.name))
                .attr("width", d => Math.abs(this.x(d.value) - this.x(0)))
                .attr("height", this.y.bandwidth())
            
            // xAxis
            this.svg.append('g')
                .attr('class', 'axis axis-x')
                .attr('transform', `translate(0, ${this.height})`)
                .transition()
                .call(d3.axisBottom(this.x))
            // yAxis
            this.svg.append('g')
                .attr('class', 'axis axis-y')
                .attr("transform", "translate(" + this.x(0) + ",0)") //.attr("transform", "translate(" + x(0) + ",0)")
                .transition()
                .call(d3.axisLeft(this.y))
        } 
    },
    computed: {
        width() { 
            return 560 - this.margin.left - this.margin.right
            },
        height() {
            return 500 - this.margin.top - this.margin.bottom
            }
    },
    mounted() {
        this.initChart()
    },
}
</script>

<style>
.blue {
    color: blue;
  }
  .bar--positive {
  fill: steelblue;
  }
  
  .bar--negative {
  fill: darkorange;
  }

  .bar--negative:hover {
    fill: rgb(212, 112, 30);
    transition: all .3s ease-in;
  }
  .bar--positive:hover {
    fill: rgb(30, 94, 212);
    transition: all .3s ease-in;
  }
  
  .axis text {
  font: 10px sans-serif;
  }
  
  .axis path,
  .axis line {
  fill: none;
  stroke: rgb(216, 46, 46);
  shape-rendering: crispEdges;
  }  
  
  /* text {
    fill: #999;
  } */
  .axis-x,
  .axis-y {
    fill: darkorange;
    stroke: rgba(4, 32, 14, 0.356);
  }
</style>