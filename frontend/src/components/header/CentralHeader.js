import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'

export default class CentralHeader extends Component {
  state = { activeItem: 'CATALOG' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name='CATALOG'
            active={activeItem === 'CATALOG'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='INVENTORY'
            active={activeItem === 'INVENTORY'}
            onClick={this.handleItemClick}
          />
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
