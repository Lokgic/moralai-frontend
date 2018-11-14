import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components'

export const GridContainer = styled.div `
    margin:20px 40px;
    flex-grow:1;
    background-color:${props=>props.theme.primary};

    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 3fr;
    grid-gap:10px;
    @media (max-width:${props=>props.theme.breakpoint.w[0]}){
        /* min-height:700px; */
        margin:0px 0px;
    }
    @media (max-width:${props=>props.theme.breakpoint.w[1]}){
        /* min-height:700px; */
        /* height:100vh; */
        margin:0px 0px;
    }
`   

const PersonalBox = styled.div`
    background:${({theme})=>theme.primaryDark};
    grid-column:1/-1;
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows:1fr;
`
const SliderBox = styled.div`
    background:${({theme})=>theme.primaryDark};
   
`

const InputDiv = styled.div`
    display:flex;
    color:white;
    flex-direction:column;
    .form-icon{
        margin:auto;
    }
    label {
        font-size:2rem;
        margin:auto auto 8px auto;
    }
`
const TextInput = styled.input`
    margin:auto;
`

const Dropdown = styled.select`
    margin:0px auto auto  auto;
    width:50%;
`

class form extends Component {
    render() {

        return (
            <GridContainer>
               <PersonalBox>
                   <InputDiv><label><FontAwesomeIcon icon="transgender-alt" className = "form-icon" /> Gender</label>
                    <Dropdown><option>Male</option></Dropdown>
                   </InputDiv>
                   <InputDiv><label><FontAwesomeIcon icon="id-card" className = "form-icon" /> Age</label><TextInput/></InputDiv>
                   <InputDiv><label><FontAwesomeIcon icon="graduation-cap" className = "form-icon" /> Highest level of education </label>
                    <Dropdown><option>Male</option></Dropdown>
                   </InputDiv>
                   <InputDiv><label><FontAwesomeIcon icon="hand-holding-usd" className = "form-icon" /> Income</label>
                    <Dropdown><option>Male</option></Dropdown>
                   </InputDiv>
                   </PersonalBox>
                <SliderBox></SliderBox>
                <SliderBox></SliderBox>
            </GridContainer>
        );
    }
}

export default form;