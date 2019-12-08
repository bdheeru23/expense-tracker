import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import {observer,inject} from 'mobx-react';


class ExpenseByCategory extends Component {
    constructor(props){
        super(props);
        this.state = {
            options: {
              labels: [],
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },
            series: [],
        }
    }

    async componentDidMount(){
        await this.props.analysisStore.loadExpenseByCategory();
        this.setState({
            series:this.props.analysisStore.amounts,
        });
        this.setState(prevState => ({
            options: {
              ...prevState.options,           // copy all other key-value pairs of food object
              labels : this.props.analysisStore.categories
            }
          }))
    }
    render() {
        
         
        return ( 
          <div> 
          <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width="500px" />
          </div>
      );
    }
}
 
export default inject("analysisStore")(observer(ExpenseByCategory));