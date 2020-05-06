import React, { Component } from 'react'
import { Container, Grid, Segment, Menu, Header, Placeholder, Dropdown, Button, Card } from 'semantic-ui-react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default class Graph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      graph: 'No of orders per day'
    }
  }
  


  render() {

    const data = this.props.salesAnalytics

    var plotData = []
    var xLabel = []
    var yLabel = ''

  const cases = ['No of orders per day','Top 5 most sold products','Top 5 sellers based on total sales amount','Top 5 customers based on total purchase amount','Top 10 products based on rating','Top 10 products viewed per day']

  try {
    console.log(data);
    
    switch (this.state.graph) {
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
        plotData = []
        xLabel = []
        yLabel = ''
        break;
      case cases[5]:
        plotData = []
        xLabel = []
        yLabel = ''
        break;
      default:
        plotData = []
        xLabel = []
        yLabel = ''
    }
  }
  catch(e) {
    plotData = []
    xLabel = []
    yLabel = ''
  }


    const options = {
      chart: {
        type: 'column'
      },
      title: {
        text: this.state.graph
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
      series: [{
        showInLegend: false,
        data: plotData
      }]
    }

    const dropdownOptions = [
      { key: cases[0], text: cases[0], value: cases[0] },
      { key: cases[1], text: cases[1], value: cases[1] },
      { key: cases[2], text: cases[2], value: cases[2] },
      { key: cases[3], text: cases[3], value: cases[3] },
      { key: cases[4], text: cases[4], value: cases[4] },
      { key: cases[5], text: cases[5], value: cases[5] },
    ]
    
    return (
      <Card style={{ backgroundColor: 'rgb(226, 226, 226)', padding: '10px' }} fluid>
        <Menu>
          <Dropdown placeholder={this.state.graph} options={dropdownOptions} simple item onChange={(e,v) => this.setState({ ...this.state, graph: v.value })}/>
        </Menu>
        {/* <Row>
          <Col xs md="5">
            <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
              <ToggleButton value={1} style={{ fontSize: 10 }} onClick={() => this.setState({ ...this.state, graph: 'bar' })}>Alarms</ToggleButton>
              <ToggleButton value={2} style={{ fontSize: 10 }} onClick={() => this.setState({ ...this.state, graph: 'pie' })}>By Category</ToggleButton>
            </ToggleButtonGroup>
          </Col>
          <Col xs md="2">
            <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
              <ToggleButton value={1} style={{ fontSize: 10 }} onClick={() => this.setState({ ...this.state, mode: 'duration' })}>Duration</ToggleButton>
              <ToggleButton value={2} style={{ fontSize: 10 }} onClick={() => this.setState({ ...this.state, mode: 'frequency' })}>Frequency</ToggleButton>
            </ToggleButtonGroup>
          </Col>
        </Row> */}
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

