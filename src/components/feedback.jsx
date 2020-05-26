import React from 'react';

function Feedback({ message }) {
    return <div clasName = "feedback">
        <h1 className="feedback__message">{message}</h1>
    </div>
};

export default Feedback