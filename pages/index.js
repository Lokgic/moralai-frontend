import React, { Component } from 'react';
import Grid from '../components/Grid'
import styled from 'styled-components'

const DecisionContainer = styled.div`
    width:auto;
    padding: 40px 40px 0px 80px;
    flex-grow:1;
    @media (max-width:${props=>props.theme.breakpoint.w[0]}) {
        width:100%;
        padding: 20px 20px;
    }
`

class index extends Component {
    render() {

        return (
            // <DecisionContainer>
                <Grid setHeaderState={this.props.setHeaderState}/>
            // </DecisionContainer>
        );
    }
}

export default index;