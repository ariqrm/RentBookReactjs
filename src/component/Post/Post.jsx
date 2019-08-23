import React from 'react';

const Post = (props) => {
    return (
        <div className="post">
            <div className="content">
            <div className="img-thumb">
                {/* <img src={props.data.image} alt="" /> */}
            </div>
                <p className="id_book">{props.data.id_book}</p>
                <p className="Date">{props.data.Date}</p>
            </div>
        </div>
    )
}

export default Post