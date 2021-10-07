import React, {Component} from 'react';

class CategoryName extends Component {
    render() {
        return (
            <div>
                <h1 style={{fontWeight:"lighter",fontSize:"40px"}}>{this.props.category}</h1>
            </div>
        );
    }
}

export default CategoryName;