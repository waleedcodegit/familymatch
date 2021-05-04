import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './redux/reducer'

const store = createStore(reducer);

function Index() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>

                        <div className="card-body">I'm an example component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Index;

if (document.getElementById('root')) {
    ReactDOM.render(<Provider store = {store}><App /></Provider> , document.getElementById('root'));
}
