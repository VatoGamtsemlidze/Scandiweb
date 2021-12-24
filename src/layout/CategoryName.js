import React, {Component} from 'react';
import {connect} from "react-redux";

class CategoryName extends Component {
    render() {
        return (
            <div>
                <h1 style={{fontWeight:"lighter",fontSize:"40px",textTransform:"capitalize"}}>{this.props.category.category}</h1>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        category: state.categoryReducer,
    }
}
export default connect(mapStateToProps)(CategoryName);