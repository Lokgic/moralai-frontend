import React, { Component } from "react";
import styled from "styled-components";
import { Transition } from "react-spring";

const StyHeader = styled.header`
  padding: 4rem 4rem 1rem 4rem;
  background: ${props => props.theme.primary};
  color: ${props => props.theme.milky};
  margin: 0 0;

  text-transform: uppercase;

  padding: 20px 20px;
  display: flex;
  flex-direction: row;

  @media (max-width: ${props => props.theme.breakpoint.w[1]}) {
    padding: 10px 10px;
  }
`;

const LineBreak = styled.br`
  display: static;
  /* @media (max-width: ${props => props.theme.breakpoint.w[0]}) {
    display: none;
  } */
`;

const Logo = styled.div`
  font-family: ${props => props.theme.sans};
  color: ${props => props.theme.tertiaryLight};
  font-size: 1.5rem;
  margin: 0 auto auto 5px;
  line-height: 1.4;
  font-weight: 700;
  display: inline;
  @media (max-width: ${props => props.theme.breakpoint.w[0]}) {
    /* font-size: 1.5rem;
    line-height: 1rem;
    text-align: center;
    margin: auto; */
  }
  @media (max-width: ${props => props.theme.breakpoint.w[1]}) {
    /* font-size: 1.5rem; */
  }
`;

const MenuLink = styled.a`
  margin: auto;
  color: ${props => props.theme.tertiaryLight};
  text-decoration: none;
  font-weight: 400;
  @media (max-width: ${props => props.theme.breakpoint.w[0]}) {
    display: none;
  }
`;

const Emphasis = styled.span`
  color: ${props => props.theme.blue};
`;
const SLogo = (
  <Logo>
    Who Should Get <LineBreak /> <Emphasis>the Kidney?</Emphasis>
  </Logo>
);

let tout;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle: { title: "default", subtitle: "default" }
    };
  }
  /* componentDidUpdate(prevProps, prevState, snapshot){
        if (this.props.headerState !== prevProps.headerState){
            this.setState({toShow:selectHeader(this.props.headerState)})
        } 

    } */
  render() {
    const { headerState } = this.props;

    return (
      <StyHeader>
        {SLogo}

        <MenuLink href="http://moralai.cs.duke.edu/about.html" target="_blank">
          Duke <Emphasis>Moral</Emphasis> AI
        </MenuLink>
      </StyHeader>
    );
  }
}

export default Header;
