import styled from "styled-components";

export const ModalBackgroundStyled = styled.div`
  background: #a1a1a1;
  position: absolute;
  height:220vh;
  opacity:70%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;
export const ModalStyled = styled.div`
  padding: 10px;
  background: white;
  border-radius: 4px;
  color:black;
  position: absolute;
  left: 85.5%;
  top: 4.5%;
  transform: translate(-50%);
  min-width: 21rem;
  z-index: 2;
  .item-list{
    &::-webkit-scrollbar {
        width: 7px;
        border-radius: 200px;
    }
    ::-webkit-scrollbar-track {
      box-shadow: inset 0px 0px 0px 0.5px lightgrey; 
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
      background: lightgray; 
      border-radius: 10px;
    }
  }
  @media (max-width: 1600px){
    left: 83.5%
  }
  @media (max-width: 1400px){
    left: 80%
  }
  @media (max-width: 1150px){
    left: 78%
  }
  @media (max-width: 1050px){
    left: 74%
  }
  @media (max-width: 850px){
    left: 70%
  }
  @media (max-width: 650px){
    left: 60%
  }
  @media (max-width: 400px){
    left: 53%
  }
`;
export const CartOverlayItemStyled = styled.div`
    margin-top: 1px;
    border-bottom: 1px solid #dbdbdb;
    display:flex;
    .description{
        width: 50%;
        h4{
            font-weight: 400;
        }
        h1{
            font-weight: 500;
            font-size: 18px;
        }
        ul{
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-column-gap: 10px;
            grid-row-gap: 10px;
            li{
                border: 1px solid black;
                padding: 6px 13px;
            }
        }
        .attribute-size{
            div{
                padding: 0;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr ;
                grid-column-gap: 10px;
                grid-row-gap: 10px;
            }
        }
    }
    .count-and-image{
        display: flex;
        ul{
            margin-right: 5px;
            text-align:center;
            display:flex;
            max-height:300px;
            flex-direction: column;
            justify-content: space-between;       
            li{
                border: 1px solid black;
                text-align: center;
                display: flex;
                justify-content: center;
                font-weight: 500;
                &:hover{
                    background:black;
                    color:white;
                }
            }     
        }
        img{
            max-width:200px;
            max-height: 200px
        }
    }
`;
export const ViewBagButtonStyled = styled.button`
    border: 1px solid black;
    background: transparent;
    border-radius: 2px;
    padding: 12px 30px;
    font-weight: 600;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 13px;
    transition: 400ms;
    &:hover{
        background: #1D1F22;
        color: white;
    }
`
export const CheckoutButtonStyled = styled.button`
    border: none;
    background: #5ECE7B;
    border-radius: 2px;
    padding: 12px 30px;
    font-weight: 600;
    color:white;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 13px;
    transition: 400ms;
    &:hover{
        background: #27b94d;
        color: white;
    }
`