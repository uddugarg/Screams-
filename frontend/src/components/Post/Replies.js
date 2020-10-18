import React, { useEffect, useState } from 'react'
import Comment from './Comment'

function Replies(props) {

    const [repliesNum, setRepliesNum] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        let RepliesNum = 0;

        props.replies.map((reply) => {
            if (reply.commentId === props.commentId) {
                RepliesNum++;
            }
            setRepliesNum(RepliesNum);
        })
    }, [props.replies, props.commentId])

    const handleOpen = () => {
        setOpen(!open);
    }

    return (
        <div className='replies'>
            {repliesNum > 0 &&
                <h5 onClick={handleOpen}>View {repliesNum} more Replies</h5>
            }

            {props.replies.map((reply, index) => (
                <React.Fragment key={index}>
                    {reply.commentId === props.commentId &&
                        <div className='replies__comment'>
                            {open &&
                                <Comment key={index} comment={reply} postId={props.postId} refreshFunction={props.refreshFunction} responseTo={reply.responseTo} />
                            }
                        </div>
                    }
                </React.Fragment>
            ))
            }
        </div>
    )
}

export default Replies
