import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { productCategories } from '../../actions/product';

class ProductCategoryDropdown extends Component {
    constructor() {
        super();
        //todo this wont be used, category to come from props
        this.state = {
            categories: [{ text: "Clothing", value: "Clothing" },
            { text: "Amazon Fresh", value: "Amazon Fresh" },
            { text: "Books", value: "Books" },
            { text: "Electronics", value: "Electronics" }],
        }
    }

    async componentDidMount() {
        //await this.props.productCategories();
    }

    render() {
        //todo this wont be used, category to come from props
        return (
            <Dropdown placeholder='Categories' selection options={this.state.categories} />
        )
    }


}

const mapStateToProps = (state) => ({
    categories: state.product.categoryList
});

export default connect(mapStateToProps, {
    productCategories,
})(ProductCategoryDropdown);