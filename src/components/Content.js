import React, {Component} from 'react';
import styled from "styled-components";
import Topbar from "../layout/Topbar";

const Wrapper = styled.div`
    padding: 20px 100px
`

class Content extends Component {
    render() {
        return (
            <Wrapper>
                <Topbar/>
                {this.props.children}
            </Wrapper>

        );
    }
}

export default Content;