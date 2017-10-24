import React from 'react';

export default ({main, routeProps}) => {
    // main represents the component to render passed from the router
    // route props represent the properties that it receives from the router
    
    // where we do createElement, that's where your components will get rendered.
    return (
        <div id="app">
            {React.createElement(main, routeProps)}
        </div>
    )
}