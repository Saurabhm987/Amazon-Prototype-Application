import React, { Component } from 'react'
import Header from './Header'
import { 
    Icon, 
    Image, 
    Menu, 
    Segment, 
    Sidebar 
} from 'semantic-ui-react'

class SideBar extends Component {
    constructor(props){
        super(props)

        this.state = {
            visible : true,
            name : 'Click me'
        }

        this.setVisible = this.setVisible.bind(this)

    }

    setVisible = () => {
        this.setState({
            visible: false
        });
    }

    render() {
        return (
                <Sidebar.Pushable as={Segment}>
                        <Sidebar
                            as={Menu}
                            animation='overlay'
                            icon='labeled'
                            inverted
                            vertical
                            visible
                            width='thin'
                            >
                            <Menu.Item as='a    '>
                                <Icon name='home' />
                                Home
                            </Menu.Item>
                            <Menu.Item as='a'>
                                <Icon name='gamepad' />
                                Games
                            </Menu.Item>
                            <Menu.Item as='a'>
                                <Icon name='camera' />
                                Channels
                            </Menu.Item>
                            </Sidebar>
                        <Sidebar.Pusher>
                                {/* <Header /> */}
                        </Sidebar.Pusher>
                </Sidebar.Pushable>
        );
    }
}

export default SideBar;