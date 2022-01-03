import React, {Component} from "react";
import styled, {keyframes} from "styled-components";

const entrance = keyframes`
  0% {
    opacity: 0%;
    transform: translateY(-200%)
  }

  100% {
    transform: translateY(0%)
  }
`;
const ToastStyled = styled.div`
    background:#5ECE7B;
    color: white;
    transition:1s;
    animation-name: ${entrance};
    animation-duration: 1s;
    border-radius: 10px;
    padding: 15px 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`
export class Toast extends Component {
    componentDidMount() {
        setTimeout(this.props.toastOff, 3000)
    }
    render() {
        return (
            <ToastStyled>
                {this.props.text}
            </ToastStyled>
        );
    };
};