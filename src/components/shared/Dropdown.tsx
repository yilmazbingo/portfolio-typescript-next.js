import React, { Component } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

interface PortButtonDropdownState {
  dropdownOpen: boolean;
}

interface Item {
  key: string;
  text: string;
  handlers: { onClick: () => Promise<void> };
}

interface PortButtonDropdownProps {
  items: Item[];
}
export default class PortButtonDropdown extends Component<
  PortButtonDropdownProps,
  PortButtonDropdownState
> {
  constructor(props: PortButtonDropdownProps) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  // TODO: Pass on item ID, don't use Index
  renderMenu(items: Item[]) {
    return (
      <DropdownMenu>
        {items.map((item) => (
          <DropdownItem key={item.key} {...item.handlers}>
            {item.text}
          </DropdownItem>
        ))}
      </DropdownMenu>
    );
  }

  render() {
    const { items } = this.props;

    return (
      <ButtonDropdown
        className="port-dropdown"
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
      >
        <DropdownToggle caret size="sm"></DropdownToggle>
        {this.renderMenu(items)}
      </ButtonDropdown>
    );
  }
}
