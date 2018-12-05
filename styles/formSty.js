import styled from 'styled-components';


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

export const PersonalBox = styled.div`
    background:${({theme})=>theme.primaryDark};
    grid-column:1/-1;
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows:1fr;
`

export const SliderBox = styled.div`
    background:${({theme})=>theme.primaryDark};
    display:flex;
    flex-direction:column;
   
`
export const SliderDiv = styled.div`
    display:flex;
    color:white;
    flex-direction:column;
    margin:auto;
    width:100%;
    .form-icon{
        margin:auto;
    }
    label {
        font-size:2rem;
        margin:auto auto 8px auto;
    }
`

export const InputDiv = styled.div`
    display:flex;
    color:white;
    flex-direction:column;
    margin:auto;
    .form-icon{
        margin:auto;
    }
    label {
        font-size:2rem;
        margin:auto auto 8px auto;
    }
`

export const TextInput = styled.input`
    margin:auto;
`

export const Dropdown = styled.select`
    margin:0px auto auto  auto;
    width:50%;
`

export const Slider = styled.input`
    margin:auto;
    width:100%;

`