import React from 'react';

class Box extends React.Component {
    render() {
        console.log(this.props)
        return(
            <>
                <img 
                    src={this.props.src}
                    alt={this.props.alt}
                />
            </>
        )
    }
}

export default Box;