import React from 'react';
import Box from './Box.js';
import o from './o.jpg';
import x from './x.jpg';

class Main extends React.Component {
    render() {
        return(
            <>
                <div>
                    <Box src={o} alt={'the letter O'} />
                    <Box src={x} alt={'the letter X'}/>
                    <Box src={x} alt={'the letter X'}/>
                </div>
                <div>
                    <Box />
                    <Box src={o} alt={'the letter O'} />
                    <Box />
                </div>
                <div>
                    <Box />
                    <Box />
                    <Box src={o} alt={'the letter O'} />
                </div>                                
            </>
        )
    }
}

export default Main;