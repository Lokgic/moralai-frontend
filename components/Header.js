import React, { Component } from "react";
import styled from "styled-components";
import { Transition } from "react-spring";

const StyHeader = styled.header`
    padding:4rem 4rem 1rem 4rem;
    background:${props => props.theme.primary};
    color:${props => props.theme.milky};
    margin: 0 0;

    text-transform:uppercase;

    padding: 20px 20px;
    display:flex;
    flex-direction:column;
    p {
        font-family:${props => props.theme.sans};
        font-size:1.4rem;
        line-height:2.2rem;
        font-weight:300;
        text-transform:none;
        color:${props => props.theme.tertiary};
        @media (max-width:${props => props.theme.breakpoint.w[0]}){
            display:none;
        }


    }
    div {
        display:flex;
        margin-top:50px;
    }
    @media (max-width:${props => props.theme.breakpoint.w[0]}) {

        display:flex;
        flex-direction:column;
        padding:10px 10px;
        div {
            margin:auto;
        }
`;

const LineBreaker = styled.br`
  display: static;
  @media (max-width: ${props => props.theme.breakpoint.w[0]}) {
    display: none;
  }
`;

const Logo = styled.h1`
  font-family: ${props => props.theme.sans};
  color: ${props => props.theme.tertiaryLight};
  font-size: 7rem;
  margin: 0 0;
  line-height: 1.4;
  font-weight: 700;
  @media (max-width: ${props => props.theme.breakpoint.w[0]}) {
    font-size: 1.5rem;
    line-height: 1rem;
    text-align: center;
    margin: auto;
  }
  @media (max-width: ${props => props.theme.breakpoint.w[1]}) {
    font-size: 1.5rem;
  }
`;

const MenuLink = styled.a`
  margin: auto auto 0 auto;
  color: ${props => props.theme.tertiaryLight};
  text-decoration: none;
  font-weight: 400;
  @media (max-width: ${props => props.theme.breakpoint.w[0]}) {
    display: none;
  }
`;

const Emphasis = styled.span`
  color: ${props => props.theme.secondary};
`;
const SLogo = (
  <Logo>
    Who <LineBreaker /> Should <LineBreaker /> Get <LineBreaker />
    <Emphasis>the Kidney?</Emphasis>
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

        <p>
          In a kidney exchange, patients in need of a kidney transplant who have
          a willing but medically incompatible donor can attempt to swap, or
          exchange, their donors with other patients who also have a medically
          incompatible donor. Determining the optimal way to make these donor
          exchanges is a computationally challenging problem. In addition,
          kidney exchanges may bring up moral issues. Please help us determine
          what the moral priorities of kidney exchanges should be.
        </p>
        <MenuLink href="http://moralai.cs.duke.edu/about.html" target="_blank">
          Duke Moral AI Group
        </MenuLink>
      </StyHeader>
    );
  }
}

export default Header;
