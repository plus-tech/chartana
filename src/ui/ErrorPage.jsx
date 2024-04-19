import * as React from 'react';

export default function ErrorPage({errdetail}){
    return (
        <div>
            <p style={{color: 'red'}}>
            Something went wrong.
            </p>
            <br/>
            <div style={{textAlign: 'left', margin: '1em'}}>{errdetail.error}</div>
            <div style={{textAlign: 'left', margin: '1em'}}>{errdetail.info}</div>
        </div>
    )
}