import React, {Component} from 'react';
import Category from "./pages/Category";
import Content from "./components/Content";

class App extends Component {
    render() {
        return (
            <Content>
                <Category/>
            </Content>
        );
    }
}

export default App;