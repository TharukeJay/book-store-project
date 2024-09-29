// import React from 'react'
// import ReactLoading from 'react-loading'
// // import './Loading.css'
//
// export default function ScreenLoading() {
//     return (
//         <div className="viewLoading">
//             <ReactLoading type={'spinningBubbles'} color={'yellowgreen'} height={'5%'} width={'5%'} />
//         </div>
//     )
// }
import React from 'react';
import ReactLoading from 'react-loading';
// import './Loading.css';

export default function ScreenLoading() {
    return (
        <div className="viewLoading" style={styles.container}>
            <ReactLoading type={'spinningBubbles'} color={'yellowgreen'} height={'15%'} width={'15%'} />
            <br/>
            <br/>
            <br/>
            <p style={styles.text}>Wait, processing...</p>
        </div>
    );
}

// Inline styles (optional)
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    text: {
        marginTop: '10px',
        fontSize: '16px',
        color: 'black',
    }
};
