import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components'
import {GridContainer, PersonalBox, SliderBox, InputDiv, TextInput, Dropdown, Slider,SliderDiv} from '../styles/formSty'
import {graphicSelector,predicateTranslater} from '../components/Grid'


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
                <SliderBox>
                    {
                        ["age","additionalHealthIssues","drinkingHabitPrediagnosis","criminalRecord","dependents"].map(
                            d=>(
                                    <SliderDiv key={d+"div"}>
                                        <label><FontAwesomeIcon icon={graphicSelector(d)} className = "form-icon" />{predicateTranslater(d)}</label>
                                        <Slider type="range" min="0" max="100" key={d+"slider"}/>
                                    </SliderDiv>
                            )
                        )
                    }

                </SliderBox>
                <SliderBox></SliderBox>
            </GridContainer>
        );
    }
}

export default form;