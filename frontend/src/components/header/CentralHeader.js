import React, { Component } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'

export default class CentralHeader extends Component {
  state = { activeItem: 'Manage Inventory' }

  handleItemClick = (e, { name }) => {
    this.props.handleNavItem(name)
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <div style={{margin:'65px 0px 0px 0px'}}>
        <Menu pointing secondary>
          <Dropdown text='INVENTORY' pointing className='link item'>
            <Dropdown.Menu>
              <Dropdown.Item
                name='Manage Inventory'
                active={activeItem === 'Manage Inventory'}
                onClick={this.handleItemClick}>Manage Inventory</Dropdown.Item>
              <Dropdown.Item
                name='Add a Product'
                active={activeItem === 'Add a Product'}
                onClick={this.handleItemClick}>Add a Product</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item
            name='ORDERS'
            active={activeItem === 'ORDERS'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='REPORTS'
            active={activeItem === 'REPORTS'}
            onClick={this.handleItemClick}
          />
        </Menu>
      </div>
    )
  }
}
