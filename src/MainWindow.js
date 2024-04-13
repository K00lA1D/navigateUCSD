import React from 'react';
import SplitPane from 'react-split-pane';
import LeftSideWidget from './LeftSideWidget';
import RightSideWidget from './RightSideWidget';

const MainWindow = () => {
    return (
        //<div style={{ height: '100vh' }}>
        <SplitPane split='vertical' minSize={50}>
            <div>
                <LeftSideWidget />
            </div>
            <div>
                <RightSideWidget />
            </div>
        </SplitPane>
        //</div>
    );
};

export default MainWindow;