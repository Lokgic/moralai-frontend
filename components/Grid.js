import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {theme} from './Page';
import MockData from '../static/mock'
import {FlexContainer} from './StyComps'


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

const expandTranslator = feature=>{
    return {
        age:["age","Should age matter? Should preference be given to younger patients?"],
        additionalHealthIssues:["additional health issues","A patient might have additional non-kidney related health problems, which might affect how healthy they will be after receiving a kidney. Should their non-kidney-related health be taken into account in allocating a kidney?"],
        drinkingHabitPrediagnosis:["drinking habit before diagnosis","Should we consider drinking habits when allocating a kidney? Does it matter if the patient’s drinking habits changed after they were diagnosed with a kidney problem?"],
        criminalRecord:["criminal record","Should we judge someone by his/her criminal record when distributing kidneys? Does the nature of the crime matter? Or patterns of behavior?"],
        dependents:["dependents","Sometimes a patient has someone depending on them - it could be a child or an elderly person such as a parent."]
    }[feature]
}

export const predicateTranslater = (feature,value)=>{
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


export const valueTranslater = (feature,value)=>{
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


export const graphicSelector = (feature)=>{
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
            return `You have chosen ${names[chosen]}`;
        case 2:
            return "The choice will be made by flipping a coin"
        case 3:
        case 4:
            return `Our AI predicts that you will choose ${names[chosen -3]}`;
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



const BottomCell = styled.div`
    background-color:${props=>props.theme.grey};
    color:${props=>props.theme.offWhite};
    display:grid;
    grid-template-columns: repeat(3,1fr);
    grid-template-rows:1fr 1fr;
    overflow:hidden;

    /* height:250px; */

`

const ChoiceButton = styled.div`

    display:flex;
    flex-direction:column;
    background: ${props=>props.chosen==="chosen"||props.predicted==="predicted"?props.theme.secondary:props.theme.offWhite};
    padding-top:5px;
    &:hover {
            background: ${props=>props.theme.secondary};
        }
    p {
        text-align: center;
        color: ${props=>props.theme.black};
        font-size: 1.3rem;
        margin:0 auto auto auto;
    }
    svg{
        margin:auto auto 0 auto;
        height:30px;
        fill: ${props=>props.theme.black};
        
        
    }
    .choice-icon{
        font-size:65px;
        color: ${props=>props.theme.black};
    }
    @media (max-height:${props=>props.theme.breakpoint.h[0]}){
        p {
            font-size: 1.2rem;

            }
            svg{

            height:20px;



            }
            .choice-icon{
            font-size:35px;

            }
    }
    @media (max-width:${props=>props.theme.breakpoint.w[1]}){
        p {

            font-size: 1.2rem;

        }
        svg{

            height:15px;

            
            
        }
        .choice-icon{
            font-size:35px;

        }
    }
`

const MsgBox = styled.div`
        grid-column: 1 / -1;
        background-color:${props=>props.theme.primaryDark};
        display:flex;
        justify-content:center;
        p{
            font-size:2rem;
            color: ${props=>props.theme.offWhite};
            margin:auto;
            @media(max-width:${props=>props.theme.breakpoint.w[1]}){
                font-size:1.5rem;
            }
            @media (max-height:${props=>props.theme.breakpoint.h[0]}){
                font-size:1.7rem;
            }   
            
        }
        button {
            background:${({theme})=>theme.secondary};
            border:none;
            font-size:1.5em;
            cursor:pointer;
            display:${props=>props.chosen===-1? "none":"static"};
            height:100%;
            @media(max-width:${props=>props.theme.breakpoint.w[1]}){
                font-size:1.2rem;
            }
            @media (max-height:${props=>props.theme.breakpoint.h[0]}){
                font-size:1.2rem;
            } 
            &:hover{
                color:${({theme})=>theme.secondary};
                background:${({theme})=>theme.primaryDark};
            }
        }
 
`

const GridCell = styled.div`
    background-color:${({theme,expand})=>expand==2?theme.grey:theme.offWhite};
    display:grid;
    grid-template-columns: ${props=>props.expand===2? "1fr" :"2fr 1fr 2fr"};
    grid-template-rows:${props=>props.expand===2? "1fr 4fr 4fr" :"1fr"};;
    flex-grow:${props=>props.expand};
    flex-basis:0;
    transition: all .2s;
    overflow:hidden;
    border-bottom:1px solid rgba(0,0,0,.12);
    cursor:pointer;
    &:hover{
        background: ${({theme,expand})=>theme.grey};
    }
    .expanded-title {
        background-color:${({theme,expand})=>theme.offWhite};
        margin:0;
        display:flex;
        padding-left: 16px;
        h1 {
            margin:auto 0;
            text-align:left;
            font-family: ${props=>props.theme.sans}; 
            text-transform:uppercase;
            font-weight:400;
            color: ${props=>props.theme.primary};
            font-size:3rem;
            @media (max-width:${props=>props.theme.breakpoint.w[1]}){
             font-size:2rem;
            }
        }
        
    }
    .expanded-description{
        background-color:${({theme,expand})=>theme.offWhite};
        margin:0;
        padding: 16px;
        text-align:left;
        font-family: ${props=>props.theme.sans}; 
        font-weight:400;
        color: ${props=>props.theme.primary};
        font-size:1.7rem;
        @media (max-width:${props=>props.theme.breakpoint.w[1]}){
             font-size:1.2rem;
            }
    }
` 

const Cell = styled.div`
    /* background-color:${props=>props.theme.offWhite}; */
    display:flex;
    flex-direction:column;
    align-content: center;
    align-items:center;
    min-height:60px;

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
        font-weight:700;
        font-size:3rem;
        line-height:3rem;
        color:${props=>props.theme.secondaryDark};
        @media (max-width:${props=>props.theme.breakpoint.w[0]}){
            font-size:2.5rem;
            line-height:2.5rem;
        }
        @media (max-width:${props=>props.theme.breakpoint.w[1]}){
            font-size:2.3rem;
            line-height:2.3rem;
        }
    }
    h3 {
        font-family: ${props=>props.theme.sans};
        font-weight:300;
        font-size:1.4rem;
        line-height:1.4rem;
        color: #888;
        @media (max-width:${props=>props.theme.breakpoint.w[0]}){
            font-size:1.2rem;
            line-height:1rem;
        }
        @media (max-width:${props=>props.theme.breakpoint.w[1]}){
            font-size:1rem;
            line-height:1rem;
        }

    }
    h4 {
        font-family: ${props=>props.theme.sans};
        font-weight: 400;
        font-size:2rem;
        line-height:2rem;
        color: ${({theme})=>theme.black};
        @media (max-width:${props=>props.theme.breakpoint.w[0]}){
            font-size:1.5rem;
            line-height:1.5rem;
        }
        @media (max-width:${props=>props.theme.breakpoint.w[1]}){
            font-size:1.4rem;
            line-height:1.4rem;
        }

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

    @media (max-width:${props=>props.theme.breakpoint.w[1]}){
        h1{
        margin:4px  auto 4px 8px;
        }
        h3 {
            margin:auto auto 0px 8px;
        }
        h4 {
            margin:0px  auto auto 8px;
        }

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
    @media (max-width:${props=>props.theme.breakpoint.w[0]}){


    }
    @media (max-width:${props=>props.theme.breakpoint.w[1]}){
    h1{
        margin:4px  8px 4px auto;
    }
    h3 {
        margin:auto 8px 0px auto;
    }
    h4 {
        margin:0px  8px auto auto;
    }

}
    

`

const IconCell = styled.div`

    display:flex;

    overflow:hidden;
    font-size:${props=>props.expand===2?"7em":"4em"};
    svg{
        margin:auto;
    }
    @media (max-height:${props=>props.theme.breakpoint.h[0]}){
        font-size:${props=>props.expand===2?"3em":"1.7em"};
        }
    @media (max-width:${props=>props.theme.breakpoint.w[1]}){
        font-size:${props=>props.expand===2?"3em":"1.7em"};

    }
`




class Grid extends Component {
    constructor(props){
        super(props);
        this.state = {
            expand:"none",
            chosen:-1

        }
        this.handleClick = this.handleClick.bind(this);
        this.handleHover = this.handleExpand.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }
    handleExpand(el){

        const expand = el===this.state.expand? "none": el;
        this.setState({expand})
    
        
    }
    handleClick(el){
        const chosen = el===this.state.chosen? -1: el;
            this.setState({chosen})

    }
    handleConfirm(el){
            this.setState({chosen:3})

    }
    render() {
        const names = Object.keys(MockData);
        const {setHeaderState} = this.props;
        const {chosen, expand} = this.state;
        let cells = []
  

        for (let feat of featuresKey){
            const key1 = `${feat}_L`;
            const key2 = `${feat}_R`;
            const key3 = `${feat}_M`;
            
            cells.push(
                <GridCell onClick={()=>this.handleExpand(feat)} expand = {expand==="none"?1:expand===feat?2:0} key={`${feat}_gridcell`}>
                    {
                        expand!==feat? (
                            <LeftCell key={`${key1}_cell`} >
                            <h3 key={`${key1}_h3`}>{subjectTranslater(feat, names[0])}</h3>
                            <h1 key={`${key1}_h1`}>{valueTranslater(feat,MockData[names[0]][feat])}</h1>
                            <h4 key={`${key1}_h4`}>{predicateTranslater(feat,MockData[names[0]][feat])}</h4>
                        </LeftCell>):<div className="expanded-title"><h1 >{expandTranslator(feat)[0]}</h1></div>
                        
                    }
                    
            
                    <IconCell key={`${feat}_icon_cell`} expand = {expand==="none"?1:expand===feat?2:0}>
                        <FontAwesomeIcon icon={graphicSelector(feat)}  key={`cellicon_${feat}`}/>
                    </IconCell>
                    {
                        expand!==feat? (
                            <RightCell key={`${key2}_cell`}>
                                <h3 key={`${key2}_h3`}>{subjectTranslater(feat, names[1])}</h3>
                                <h1 key={`${key2}_h1`}>{valueTranslater(feat,MockData[names[1]][feat])}</h1>
                                <h4 key={`${key2}_h4`}>{predicateTranslater(feat,MockData[names[1]][feat])}</h4>
                            </RightCell>
                        ):<div className="expanded-description">{expandTranslator(feat)[1]}</div>
                    }
                    
                </GridCell>
            )

        }

        

        return (
 
            <FlexContainer>
                {cells}
            <BottomCell id="tour1">
                <MsgBox chosen={chosen}>
                    <p>
                        {
                            MsgSelector(chosen,names)
                        }
                    </p>
                    <button onClick={()=>this.handleConfirm()}>confirm <FontAwesomeIcon  icon="check-circle"/></button>
                </MsgBox>
                <ChoiceButton 
                    chosen = {chosen===0?"chosen":"notChosen"}
                    predicted = {chosen===3?"predicted":"notPredicted"}
                    onClick={()=>this.handleClick(0)}
                    >
                        <FontAwesomeIcon icon="user" className = "choice-icon" />
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
                    chosen = {chosen===1?"chosen":"notChosen"}
                    predicted = {chosen===4?"predicted":"notPredicted"}
                    
                    >

                        <FontAwesomeIcon className = "choice-icon" icon="user"/>
                        <p>Choose {names[1]}</p>

                </ChoiceButton>
            </BottomCell>
 
            </FlexContainer>
          
        );
    }
}

export default Grid;