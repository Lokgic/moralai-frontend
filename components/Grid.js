import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {theme} from './Page';
import MockData from '../static/mock'


const CF = props=>(
    <svg viewBox="0 0 272 232">
    <g>
        <g transform="translate(-24.000000, -20.000000)">
            <g id="coinflip" transform="translate(24.000000, 20.000000)">
                <ellipse  transform="translate(204.354603, 41.396866) rotate(27.000000) translate(-204.354603, -41.396866) " cx="204.354603" cy="41.3968659" rx="29.5" ry="7.5"></ellipse>
                <path d="M0,158.913303 L0,223.219034 C29.610732,229.073011 57.6798472,232 84.2073457,232 C123.998593,232 161.224187,206.208669 165.721065,199.29675 C170.575671,191.834987 162.323116,181.910872 164.929905,179.818876 C168.535435,176.925373 170.439309,165.443786 170.575671,163.304314 C171.026028,156.238361 169.144106,151.281978 164.929905,148.435165 C168.50297,143.594542 170.384891,139.677599 170.575671,136.684334 C170.76645,133.69107 169.429713,129.054241 166.56546,122.773847 L258.547017,122.773847 C267.515672,116.338639 272,109.831037 272,103.251041 C272,96.671046 266.282261,91.1904942 254.846783,86.809386 L173.466424,86.809386 L106.284762,86.809386 L150.195155,29.6862345 C148.582733,17.5839625 144.797476,9.27381473 138.839385,4.75579132 C132.881294,0.237767909 123.994709,-1.06114839 112.17963,0.85904242 C106.258433,11.6257852 97.9811733,21.2348493 87.347851,29.6862345 C76.7145287,38.1376198 63.8590629,45.3248872 48.7814535,51.2480368 L0,71.9723661 L0,158.913303 Z" id="Path-2"></path>
                <ellipse transform="translate(205.262584, 39.614853) rotate(27.000000) translate(-205.262584, -39.614853) " cx="205.262584" cy="39.6148529" rx="29.5" ry="7.5"></ellipse>
            </g>
        </g>
    </g>
</svg>
)


const predicateTranslater = (feature,value)=>{
    switch(feature){
        case "age": 
            return `years old`;
        case "additionalHealthIssues":
            return `additional health issues`;
        case "drinkingHabitPrediagnosis":
            return `drinking habit before diagnosis`;
        case "criminalRecord":
            return `crimincal record`;
        case "dependents":
            return `dependent`;
        default:
            return feature;
            
    }
}


const valueTranslater = (feature,value)=>{
    switch(feature){
        case "age": 
            return value;
        case "additionalHealthIssues":
            return ["no","serious"][value];
        case "drinkingHabitPrediagnosis":
            return ["moderate","no"][value];
        case "criminalRecord":
            return ["no","criminal felony"][value];
        case "dependents":
            return ["no",1][value];
        default:
            return feature;
            
    }
}

const subjectTranslater = (feature,name)=>{
    switch(feature){
        case "age": 
            return `${name} is`;
        case "additionalHealthIssues":
        case "drinkingHabitPrediagnosis":
        case "criminalRecord":
        case "dependents":
            return `${name} has`;
        default:
            return name;
            
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

const MsgSelector = (chosen,names)=>{
    switch(chosen){
        case 0: 
        case 1:
            return `You have chosen ${names[chosen]}: confirm?`;
        case 2:
            return "The choice will be made by flipping a coin: confirm?"
        default:
            return "who should get the kidney?";
            
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
    grid-template-columns: 3fr 1fr 3fr;
    /* grid-template-rows: 3fr 3fr 3fr 3fr 3fr; */
    grid-auto-rows: 1fr;
    grid-auto-flow: row;
    width:1fr;
    flex-grow:1;
    margin: 0 0;
    grid-gap:0px;
    /* border-style:solid;
    border-color:${props=>props.theme.tertiaryDark}}; */
    margin:20px 40px;
    background-color:${props=>props.theme.tertiaryDark}};
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),
                0 2px 2px 0 rgba(0,0,0,.14),
                0 1px 5px 0 rgba(0,0,0,.12);

    @media (max-width:${props=>props.theme.breakpoint.w[0]}){
        min-height:700px;
        margin:0px 0px;
    }
    @media (max-width:${props=>props.theme.breakpoint.w[1]}){
        /* height:100vh; */
        grid-template-rows:  ${()=>"20% " + featuresKey.filter(d=>d!=="name").map(d=>`${80/featuresKey.length}%`).join(' ')}
    }

`

const BottomCell = styled.div`
    background-color:${props=>props.theme.grey};
    color:${props=>props.theme.offWhite};
    grid-column: 1 / -1;
    display:grid;
    grid-template-columns: repeat(3,1fr);
    grid-template-rows:1fr 2fr;
    


`

const ChoiceButton = styled.div`

    display:flex;
    flex-direction:column;
    background: ${props=>props.chosen==="chosen"?props.theme.secondary:props.theme.offWhite};
    &:hover {
            background: ${props=>props.theme.secondary};
        }
    p {
        text-align: center;
        color: ${props=>props.theme.black};
        font-size: 1.2rem;
        margin:0 auto auto auto;
    }
    svg{
        margin:auto auto 0 auto;
        height:45px;
        fill: ${props=>props.theme.black};
        
        
    }
    
`

const MsgButton = styled.div`
      grid-column: 1 / -1;
        background-color:${props=>props.theme.primaryDark};
        display:flex;
        p{
            font-size:1.9rem;
            color: ${props=>props.theme.offWhite};
            margin:auto;
        }
        &:hover {
               background: ${props=>props.theme.primaryLight};
           }
`

const Cell = styled.div`
    background-color:${props=>props.theme.offWhite};
    /* background:brown; */
    display:flex;
    flex-direction:column;
    align-content: center;
    align-items:center;
    border-bottom:1px solid rgba(0,0,0,.12);
    div {
        margin: auto auto auto 16px;
        height:82px;
        width:82px;
        background: ${props=>props.theme.secondary};
        display:flex;
        border-radius:2px 2px;
        svg{
            margin:auto;
        }
    }
    h1{
        font-family: ${props=>props.theme.sans};
        text-transform:uppercase;
        font-weight:400;
        color: ${props=>props.theme.primary};
        font-size:3rem;
        line-height:3rem;
    }
    h3 {
        font-family: ${props=>props.theme.sans};
        font-weight:400;
        font-size:2rem;
        line-height:2rem;
        /* line-height:3rem; */

    }
    h4 {
        font-family: ${props=>props.theme.sans};
        font-weight: 400;
        font-size:1.4rem;
        line-height:1.4rem;
        color: #888;

    }
    @media (max-width:${props=>props.theme.breakpoint.w[0]}){
        min-height:25px;
    }
    
`

const LeftCell = styled(Cell)`
    h1{
        margin:8px  auto 8px 16px;
    }
    h3 {
        margin:auto auto 0px 16px;
    }
    h4 {
        margin:0px  auto auto 16px;
    }
    

`


const RightCell = styled(Cell)`
    text-align:right;
    h1{
        margin:8px  16px 8px auto;
    }
    h3 {
        margin:auto 16px 0px auto;
    }
    h4 {
        margin:0px  16px auto auto;
    }
    

`

const IconCell = styled.div`
    display:flex;
    background-color:${props=>props.theme.offWhite};
    border-bottom:1px solid rgba(0,0,0,.12);
    svg{
        margin:auto;
    }
`


const TopCell = styled.div`
    flex-direction:row-reverse;
    background:${props=>props.theme.primary};
    color: white;
    display:flex;
    flex-direction:row;
    align-content: center;
    align-items:center;
    grid-column: 1 / -1;
    div{
        display:flex;
        margin:auto;
    }
     h3 {
        font-family: ${props=>props.theme.serif};
        font-weight:400;
        font-size:2.5rem;
            margin:auto auto auto 0;
            text-align: center;
        }
        svg{
            margin:auto 16px auto 16px;
        }

`


const CoinFlipContainer = styled.img`
        width:20px;
        height:20px;
        svg{
            color: blue;
        }
        
`

class Grid extends Component {
    constructor(props){
        super(props);
        this.state = {
            highlight:"none",
            chosen:-1
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleHover = this.handleHover.bind(this);
    }
    handleHover(el){
        if (el!==this.state.chosen){
            const highlight = el===this.state.highlight? "none": el;
            this.setState({highlight})

        }
    }
    handleClick(el){
        const chosen = el===this.state.chosen? -1: el;
            this.setState({chosen})

    }
    render() {
        const names = Object.keys(MockData);
        const {setHeaderState} = this.props;
        let cells = []
  

        for (let feat of featuresKey){
            const key1 = `${names[0]}_${feat}`;
            const key2 = `${names[1]}_${feat}`;
            
            cells.push(
                <LeftCell key={`${key1}_cell`}>
                    <h3 key={`${key1}_h3`}>{subjectTranslater(feat, names[0])}</h3>
                    <h1 key={`${key1}_h1`}>{valueTranslater(feat,MockData[names[0]][feat])}</h1>
                    <h4 key={`${key1}_h4`}>{predicateTranslater(feat,MockData[names[0]][feat])}</h4>
                </LeftCell>
            )
            cells.push(
                <IconCell key={`${feat}_icon_cell`}>
                    <FontAwesomeIcon icon={graphicSelector(feat)} size="2x" color = {theme.black} key={`cellicon_${feat}`}/>
                </IconCell>
            )
            cells.push(
                <RightCell key={`${key2}_cell`}>
                    <h3 key={`${key2}_h3`}>{subjectTranslater(feat, names[1])}</h3>
                    <h1 key={`${key2}_h1`}>{valueTranslater(feat,MockData[names[1]][feat])}</h1>
                    <h4 key={`${key2}_h4`}>{predicateTranslater(feat,MockData[names[1]][feat])}</h4>
                </RightCell>
            )

        }

        const {chosen, highlight} = this.state;

        return (
            <GridContainer>
            {cells}
            <BottomCell>
                <MsgButton>
                    <p>
                        {
                            MsgSelector(chosen,names)
                        }
                    </p>
                </MsgButton>
                <ChoiceButton 
                    chosen = {chosen===0?"chosen":"notChosen"}
                    onClick={()=>this.handleClick(0)}
                    >
                        <FontAwesomeIcon icon="user" size="3x" color = {theme.black}/>
                        <p>Choose {names[0]}</p>

                </ChoiceButton>
                <ChoiceButton
                    chosen = {chosen===2?"chosen":"notChosen"}
                    onClick={()=>this.handleClick(2)}
                    >

                    <CF/>
                    <p>Flip a coin</p>
                    </ChoiceButton>
                <ChoiceButton
                    onClick={()=>this.handleClick(1)}
                    chosen = {chosen===1?"chosen":"notChosen"
                    }
                    yo
                    >

                        <FontAwesomeIcon icon="user" size="3x" color = {theme.black}/>
                        <p>Choose {names[1]}</p>

                </ChoiceButton>
            </BottomCell>
            </GridContainer>
        );
    }
}

export default Grid;