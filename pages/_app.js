import App, { Container } from 'next/app';
import Page from '../components/Page'
import { library as faLibrary} from '@fortawesome/fontawesome-svg-core'
import { faUser, faThumbsUp, faBirthdayCake, faBriefcaseMedical,faWineGlassAlt,faGavel,faChild } from '@fortawesome/free-solid-svg-icons'

faLibrary.add(faUser, faThumbsUp, faBirthdayCake, faBriefcaseMedical,faWineGlassAlt,faGavel,faChild)

class MyApp extends App{
    render(){
        const { Component } = this.props;
        return (
            <Container>
                <Page>
                <Component />
                </Page>

            </Container>
        )
    }
}

export default MyApp;