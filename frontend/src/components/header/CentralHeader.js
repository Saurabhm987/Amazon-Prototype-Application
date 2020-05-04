import React, { Component } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'

export default class CentralHeader extends Component {
  state = { activeItem: 'CATALOG' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div style={{margin:'65px 0px 0px 0px'}}>
        <Menu pointing secondary>
          <Dropdown text='CATALOG' pointing className='link item'>
            <Dropdown.Menu>
              <Dropdown.Item
                name='Demo'
                active={activeItem === 'Demo'}
                onClick={this.handleItemClick}>Demo</Dropdown.Item>
              <Dropdown.Item>Bedroom</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Order</Dropdown.Header>
              <Dropdown.Item>Status</Dropdown.Item>
              <Dropdown.Item>Cancellations</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* <Menu.Item
            name='INVENTORY'
            active={activeItem === 'INVENTORY'}
            onClick={this.handleItemClick}
          /> */}
          <Dropdown text='INVENTORY' pointing className='link item'>
            <Dropdown.Menu>
              <Dropdown.Item
                name='Manage Inventory'
                active={activeItem === 'Manage Inventory'}
                onClick={this.handleItemClick}>Manage Inventory</Dropdown.Item>
              <Dropdown.Item
                name='Manage FBA Inventory'
                active={activeItem === 'Manage FBA Inventory'}
                onClick={this.handleItemClick}>Manage FBA Inventory</Dropdown.Item>
              <Dropdown.Item
                name='Inventory Planning'
                active={activeItem === 'Inventory Planning'}
                onClick={this.handleItemClick}>Inventory Planning</Dropdown.Item>
              <Dropdown.Item
                name='Add a Product'
                active={activeItem === 'Add a Product'}
                onClick={this.handleItemClick}>Add a Product</Dropdown.Item>
              <Dropdown.Item
                name='Add products via Upload'
                active={activeItem === 'Add products via Upload'}
                onClick={this.handleItemClick}>Add products via Upload</Dropdown.Item>
              <Dropdown.Item
                name='Inventory Reports'
                active={activeItem === 'Inventory Reports'}
                onClick={this.handleItemClick}>Inventory Reports</Dropdown.Item>
              <Dropdown.Item
                name='Sell Globaly'
                active={activeItem === 'Sell Globaly'}
                onClick={this.handleItemClick}>Sell Globaly</Dropdown.Item>
              <Dropdown.Item
                name='Manage FBA'
                active={activeItem === 'Manage FBA'}
                onClick={this.handleItemClick}>Manage FBA</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item
            name='PRICING'
            active={activeItem === 'PRICING'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='ORDERS'
            active={activeItem === 'ORDERS'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='ADVETISING'
            active={activeItem === 'ADVETISING'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='STOREFRONT'
            active={activeItem === 'STOREFRONT'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='REPORTS'
            active={activeItem === 'REPORTS'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='PERFORMANCE'
            active={activeItem === 'PERFORMANCE'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}
