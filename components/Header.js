import React,{Component} from 'react';
import styled from 'styled-components';
import { Transition } from 'react-spring'

const StyHeader = styled.header`
    padding:4rem 4rem 1rem 4rem;
    background:${props=>props.theme.lightbrown};
    color:${props=>props.theme.darkblue};
    margin: 0 0;
    height:100vh;
    text-transform:uppercase;
    width:450px;
    padding: 20px 20px;
    display:flex;
    flex-direction:column;
    p {
        font-family:${props=>props.theme.serif};
        font-size:2rem;
        line-height:2rem;
        font-weight:400;
        text-transform:none;
        color:${props=>props.theme.blue};


    }
    div {
        display:flex;
        margin-top:50px;
    }
    @media (max-width:${props=>props.theme.breakpoint.w[0]}) {
        width:100%;
        height:300px;
        display:flex;
        flex-direction:column;
        padding:40px 40px;
        div {
            margin:auto;
        }
    @media (max-width:${props=>props.theme.breakpoint.w[1]}) {
        height:100vh;
    }
    
`
const LineBreaker = styled.br`
    display: static;
    @media (max-width:${props=>props.theme.breakpoint.w[0]}) {
        display:none;
    }
`



const Logo = styled.h1`
    font-family:${props=>props.theme.sans};
    color:${props=>props.theme.darkblue};
        font-size: 7rem;
        margin: 0 0;
        line-height:1.4;
        font-weight:800;
        @media (max-width:${props=>props.theme.breakpoint.w[0]}) {
            font-size: 4rem;
            text-align:center;
            margin:auto;
        }
`


const MenuLink = styled.a`
    margin: auto auto 0 auto;
    color:${props=>props.theme.bg};
    text-decoration:none;
    font-weight:800;
    @media (max-width:${props=>props.theme.breakpoint.w[0]}) {
        display: none;
    }
`

const Emphasis = styled.span`
    color:${props=>props.theme.contrast};
`
const SLogo = (<Logo>Who <LineBreaker/> Should <LineBreaker/> Get <LineBreaker/><Emphasis>the Kidney?</Emphasis></Logo>);

const selectSubtitle = headerState => {
    switch(headerState){
        case "age":
            return  "Should age matter? Should preference be given to younger patients?"
        case "drinkingHabitPrediagnosis":
                return "Should we consider drinking habits when allocating a kidney? Does it matter if the patient’s drinking habits changed after they were diagnosed with a kidney problem?"
        case "additionalHealthIssues":
        return "A patient might have additional non-kidney related health problems, which might affect how healthy they will be after receiving a kidney. Should their non-kidney-related health be taken into account in allocating a kidney?"
        case "criminalRecord":
                return "Should we judge someone by his/her criminal record when distributing kidneys? Does the nature of the crime matter? Or patterns of behavior?"
        case "dependents":
                return "Sometimes a patient has someone depending on them - it could be a child or an elderly person such as a parent."
        default:
        return "Who should get the kidney? You will be shown two patients, both in need the same kidney, and you get to decide who gets it. After a number of scenarios, you will see a summary of your judgements and how it compares to others"
    }
}


let tout;

class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            subtitle:{title:"default",subtitle:"default"}
        }

    }
    /* componentDidUpdate(prevProps, prevState, snapshot){
        if (this.props.headerState !== prevProps.headerState){
            this.setState({toShow:selectHeader(this.props.headerState)})
        } 

    } */
    render(){
        const {headerState} = this.props
        const items = [selectSubtitle(headerState.subtitle)]
        return (
        <StyHeader>
            {SLogo}
            <Transition
                items={items} 
                from={{ transform: 'translate3d(0,-40px,0)' ,opacity:0}}
                enter={{ transform: 'translate3d(0,0px,0)',opacity:1 }}
                leave={{display:"none"}}
                >
                {item => props =>
                <div style={props}><p>{item}</p></div>
  }
</Transition>

            <MenuLink href="http://moralai.cs.duke.edu/about.html"  target="_blank" >Duke Moral AI Group</MenuLink>
        </StyHeader>
    );
    }
}


export default Header;