import React from 'react';

// Initial Usage of withClass
// const withClass = props => (
//     <div className={props.classes}>{props.children}</div>
// )

const withClass = (WrappedComponent, className) => {
    return props => (
        <div className ={className}>
            <WrappedComponent {...props}/> {/* Props is necessary to dynamically wrap the props of the component */}
        </div>
    )
}

export default withClass;