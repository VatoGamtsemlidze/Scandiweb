import React, {Component} from 'react';

class CategoryTitle extends Component {
    render() {
        return (
            <div style={{padding:"35px 0"}}>
                <h1 style={{fontSize:"40px",fontWeight:"lighter"}}>{this.props.category}</h1>
            </div>
        );
    }
}

export default CategoryTitle;