import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {theme} from './Page';
import MockData from '../static/mock'



const translater = (feature,value)=>{
    switch(feature){
        case "age": 
            return `${value} years old`;
        case "additionalHealthIssues":
            return `no additional health issues`;
        case "drinkingHabitPrediagnosis":
            return `moderate drinking before diagnosis`;
        case "criminalRecord":
            return `non-violent felony`;
        case "dependents":
            return `one child dependent`;
        default:
            return value;
            
    }
}

const graphicSelector = (feature)=>{
    switch(feature){
        case "age": 
            return `birthday-cake`;
        case "additionalHealthIssues":
            return `briefcase-medical`;
        case "drinkingHabitPrediagnosis":
            return `wine-glass-alt`;
        case "criminalRecord":
            return `gavel`;
        case "dependents":
            return `child`;
        default:
            return null;
            
    }
}



const featuresDisplayName = {
    age: "age",
    additionalHealthIssues: "additional health issues",
    drinkingHabitPrediagnosis: "drinking habits prediagnosis",
    criminalRecord: "criminal record",
    dependents:"dependents"
}

const featuresKey = Object.keys(featuresDisplayName)

const GridContainer = styled.div`
    display:grid;
    grid-template-columns: 50% 50%;
    /* grid-template-rows: ${()=>"120px " + featuresKey.filter(d=>d!=="name").map(d=>"100px").join(' ')}; */
    grid-template-rows:  ${()=>"15% " + featuresKey.filter(d=>d!=="name").map(d=>`${70/featuresKey.length}%`).join(' ')}
    grid-auto-flow: column;
    width:100%;
    height:100%;
    margin: 0 0;
    @media (max-width:${props=>props.theme.breakpoint.w[0]}){
        min-height:700px;
        height:
    }
    @media (max-width:${props=>props.theme.breakpoint.w[1]}){
        height:100vh;
        grid-template-rows:  ${()=>"20% " + featuresKey.filter(d=>d!=="name").map(d=>`${80/featuresKey.length}%`).join(' ')}
    }

`

const Cell = styled.div`

    display:flex;
    flex-direction:row;
    align-content: center;
    align-items:center;
    h3 {
        font-family: ${props=>props.theme.serif};
        font-weight:400;
        font-size:2.5rem;
        margin:auto 0 5px 0;
        /* line-height:3rem; */
        text-transform:capitalize;
        text-align:center;
    }
    h4 {
        font-family: ${props=>props.theme.sans};
        font-weight: 400;
        font-size:2.4rem;
        margin:auto  ;
        line-height:2.5rem;
        text-align: left;
        width:70%;
        &:hover {
            text-decoration:underline;
        }

    }
    svg {
        margin: auto auto auto 0 ;
    }
    @media (max-width:${props=>props.theme.breakpoint.w[0]}){
        min-height:25px;
    }
    
`

const TopCell = styled(Cell)`
    flex-direction:row-reverse;
     h3 {
            margin:auto auto auto 0;;
            text-align: center;
        }
        svg{
            margin:auto 20px auto 0;
        }

`

class Grid extends Component {
    
    render() {
        const names = Object.keys(MockData);
        const {setHeaderState} = this.props;
        let cells = []
        for (let name of names){
            cells.push(
                <TopCell key={`topcell${name}`}>
                <h3 key={`name${name}`} >{name}</h3>
                <FontAwesomeIcon icon="user" size="5x" color = {theme.milky} key={`port_${name}`}/>
                </TopCell>)
            cells = [...cells,
                    ...Object.keys(MockData[name]).map((d,i)=>(
                        <Cell key={`cell1_${name+d+i}}`}>
                        <FontAwesomeIcon icon={graphicSelector(d)} size="2x" color = {theme.milky} key={`cellicon_${name+d+i}`}/>
                        <h4 key={`desc_${name}_${d}`}
                            onMouseEnter={()=>setHeaderState({subtitle:d})}
                            onMouseLeave={()=>setHeaderState({subtitle:"mouseLeft"})}
                            >{translater(d,MockData[name][d])}</h4>
                        </Cell>
                    ))]
        }
        return (
            <GridContainer>
                {cells}
   
            </GridContainer>
        );
    }
}

export default Grid;