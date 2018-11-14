import styled from 'styled-components'

export const FlexContainer = styled.div `
    margin:20px 40px;
    flex-grow:1;
    background-color:${props=>props.theme.offWhite};
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),
                0 2px 2px 0 rgba(0,0,0,.14),
                0 1px 5px 0 rgba(0,0,0,.12);
    display:flex;
    flex-direction:column;
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
