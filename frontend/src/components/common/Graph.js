import React, { Component } from 'react'
import { Container, Grid, Segment, Menu, Header, Placeholder, Dropdown, Button, Card } from 'semantic-ui-react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default class Graph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      graph: 'Select Graph'
    }
  }



  render() {

    const data = this.props.salesAnalytics
    const productData = this.props.productAnalytics
    const stats = this.props.stats
    const statsMonthly = this.props.statsMonthly

    var plotData = []
    var plotDataAmount = []
    var plotDataQuantity = []
    var xLabel = []
    var yLabel = ''

    var switchcase = this.state.graph

    
    stats || data ? switchcase = this.state.graph : switchcase = 'Statastics Monthly'


    const cases = ['No of orders per day', 'Top 5 most sold products', 'Top 5 sellers based on total sales amount', 'Top 5 customers based on total purchase amount', 'Top 10 products based on rating', 'Top 10 products viewed per day']

    try {

      switch (switchcase) {
        case cases[0]:
          data['countOrdersPerDay'].map(d => {
            plotData.push(d.counts)
            xLabel.push(d._id)
          })
          yLabel = 'Number of Orders'
          break;
        case cases[1]:
          data['topFiveMostSoldProducts'].map(d => {
            plotData.push(d.counts)
            xLabel.push(d._id.name)
          })
          yLabel = 'Number of Orders'
          break;
        case cases[2]:
          data['topFiveSellersAmount'].map(d => {
            plotData.push(d.counts)
            xLabel.push(d._id)
          })
          yLabel = 'Sales Amount'
          break;
        case cases[3]:
          data['topFiveCustomerAmount'].map(d => {
            plotData.push(d.counts)
            xLabel.push(d._id)
          })
          yLabel = 'Purchase Amount'
          break;
        case cases[4]:
          productData['topTenProductsRating'].map(d => {
            plotData.push(d.overallRating)
            xLabel.push(d.name)
          })
          yLabel = 'Overall Rating'
          break;
        case cases[5]:
          productData['topTenViewedPerDay'].map(d => {
            plotData.push(d.views)
            xLabel.push(d.name)
          })
          yLabel = 'Views'
          break;
        case 'Statastics':
          stats.map(d => {
            plotDataAmount.push(d.amount)
            plotDataQuantity.push(d.quantity)
            xLabel.push(d._id.name)
          })
          yLabel = 'Quantity'
          break;
        case 'Statastics Monthly':
          const yearmap = {1 : 'Jan', 2: 'Feb',3:'Mar',4:'Apr',5:'May',6:'June',7:'July',8:'Aug',9:'Sep',10:'Oct',11:'Nov',12:'Dec'}
          statsMonthly.map(d => {
            plotData.push(d.amount)
            xLabel.push(yearmap[d._id])
          })
          yLabel = 'Quantity'
          break;
        default:
          plotData = []
          xLabel = []
          yLabel = ''
      }
    }
    catch (e) {
      plotData = []
      xLabel = []
      yLabel = ''
    }


    const options = {
      chart: {
        type: 'column'
      },
      title: {
        text: switchcase
      },
      xAxis: {
        categories: xLabel
      },
      yAxis: {
        min: 0,
        title: {
          text: yLabel
        }
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: this.state.graph === 'Statastics' ? [
        {
          name: 'Amount',
          showInLegend: true,
          data: plotDataAmount
        },
        {
          name: 'Quantity',
          showInLegend: true,
          data: plotDataQuantity
        }
      ] : [{
        showInLegend: false,
        data: plotData
      }]
    }

    const dropdownOptions = stats ? [
      { key: 'Statastics', text: 'Statastics', value: 'Statastics' },
      { key: 'Statastics Monthly', text: 'Statastics Monthly', value: 'Statastics Monthly' },

    ] : [
      { key: cases[0], text: cases[0], value: cases[0] },
      { key: cases[1], text: cases[1], value: cases[1] },
      { key: cases[2], text: cases[2], value: cases[2] },
      { key: cases[3], text: cases[3], value: cases[3] },
      { key: cases[4], text: cases[4], value: cases[4] },
      { key: cases[5], text: cases[5], value: cases[5] },
    ]

    return (
      <Card style={{ backgroundColor: 'rgb(226, 226, 226)', padding: '10px' }} fluid>
        {stats || data ? <Menu>
          <Dropdown placeholder={this.state.graph} options={dropdownOptions} simple item onChange={(e, v) => this.setState({ ...this.state, graph: v.value })} />
        </Menu>:<div></div>}
        <Card style={{ padding: '10px' }} fluid>
          <div>
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
            />
          </div>
        </Card>
      </Card>
    );
  }
}

