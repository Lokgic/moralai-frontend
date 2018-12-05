import React, { Component } from 'react';
import {WeightContainer} from '../styles/weightsSty'
import {Slider} from '../styles/formSty'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {theme} from '../components/Page';
import {FlexContainer} from '../components/StyComps'
import {scaleLinear} from 'd3'
import { Spring } from 'react-spring'


class Datapoint {
    constructor(props){
        const defaultProperty = {
            p1: Math.round(Math.random()*100),
            p2: Math.round(Math.random()*100),
            id:0
        }
        this.properties = {
            ...defaultProperty,
            ...props
        }
        this.state = {
            r:0,
            cx:0,
            cy:0,
            fill:"black"
        }
    }
    setState(ns){
        const newState = {
            ...this.state,
            ...ns
        }
        this.state = newState
    }
    asArray(){
        return Object.keys(this.properties).map(d=>this.properties[d])
    }
}





export default class WeightsViz extends Component {
    constructor(props){
        super(props)
        this.state = {
            p1:50,
            p2:50
            }
        this.datapoints = Array.from(Array(30).keys()).map((d,i)=>new Datapoint({id:i}))
        this.updatePositions = this.updatePositions.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    sortDP(){
        const {p1,p2} = this.state;
        const sum = p1+p2
        const user = [p1,p2]
        const getEucDist = (p,q)=> Math.sqrt(p.reduce((ac,d,i)=>ac+((p[i]-q[i])*(p[i]-q[i])),0))
       
        const compare = (a,b)=>{
            const aScore = getEucDist(user,a.asArray())
            const bScore = getEucDist(user,b.asArray())
            
            if (aScore!==bScore) return aScore>bScore? 1:-1
            else return 0;
        }
        
        return this.datapoints.sort(compare).reduce((ac,d,i)=>{
            i<this.datapoints.length/2?ac[0].push(d.properties.id):ac[1].push(d.properties.id);
            return ac
        } ,
        [[],[]])
    }
    updatePositions(){
        const sortedDP = this.sortDP()
        console.log(sortedDP)
        const r = 4
        const rScale = scaleLinear().domain([0,100]).range([0.5,4])
        const m = 10
        const top = 20
        const lStart = 50
        let cx,cy
        const newDP = [...this.datapoints]
        console.log(newDP)
        for (let i = 0; i<15;i++){

            let cx,cy
            if (i<5){
                cx = 2*r*i+m
                cy = top 
            }else if (i<10){
                cx = 2*r*(i%5)+m
                cy = top*2 
            } else{
                cx = 2*r*(i%10)+m
                cy = top*3 
            }

            newDP[sortedDP[0][i]].setState({
                cx,cy,id:"c1_"+i,r:rScale(newDP[sortedDP[0][i]].properties.p1),fill:"blue"
            })
        }
        for (let i = 0; i<15;i++){
            let cx,cy
            if (i<5){
                cx = lStart+2*r*i+m
                cy = top 
            }else if (i<10){
                cx = lStart+2*r*(i%5)+m
                cy = top*2 
            } else{
                cx = lStart+2*r*(i%10)+m
                cy = top*3 
            }
            newDP[sortedDP[1][i]].setState({
                cx,cy,id:"c2_"+i,r:rScale(newDP[sortedDP[1][i]].properties.p1),fill:"red"
            })
        }
        this.datapoints = newDP

        return null
    }
    handleChange(event){
        this.setState({
            [event.target.id]:event.target.value
        })
    }
    render(){

        this.updatePositions()
        // const DP = this.datapoints
        return (
            <FlexContainer>
                <WeightContainer>
                    <svg width="100%" height="100%">
                        {/* {
                            pos.map(d=>
                                (   <g>
                                    <circle r = {d.r+"%"} cx = {d.cx+"%"} cy={d.cy+"%"} fill={d.fill} key={d.id}/>
                                    <text x={d.cx+"%"} y={d.cy - d.r-1 +"%"} textAnchor={"middle"}>{d.d.properties.p2}</text>
                                    </g>
                                    )
                            )
                        } */}
                        {
                            this.datapoints.map(d=>(
                                <Spring 
                                    to={{cx:d.state.cx,cy:d.state.cy,r:d.state.r,fill:d.state.fill }}
                                    
                                    >
                                    {
                                        props=><g> <circle
                                            r={d.state.r+"%"}
                                            cx={props.cx+"%"}
                                            cy={props.cy+"%"}
                                            fill={d.state.fill}
                                            key={d.state.id}
                                        />
                                            <text x={props.cx+"%"} y={props.cy - props.r-1 +"%"} textAnchor={"middle"}>{d.properties.id}</text>
                                        </g>
                                    }
                                    

                                </Spring>

                            ))
                        }
                    </svg>
                </WeightContainer>

                <WeightContainer>
                    <Slider type="range" min="0" max="100" id="p1" onChange={this.handleChange} value={this.state.p1}/>
                    <Slider type="range" min="0" max="100" id="p2" onChange={this.handleChange} value={this.state.p2}/>
                </WeightContainer>
            </FlexContainer>
        )
    }
}