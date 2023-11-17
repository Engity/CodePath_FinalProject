import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import '../assets/styles/PostDetail.css'
import databaseUtils from '../utils/databaseUtils';

const PostDetail = ({ createMode }) => {
    const { id } = useParams();

    const [currentData, setCurrentData] = useState(!createMode ? {} : {
        'title': '',
        'content': '',
        'course': '',
        'imageURL': '',
        'lastModified': '',
        'like': 0,
        'commentCount': 0,
        'courseRating': 5,
    });

    const [commentList, setCommentList] = useState([]);
    const commentRef = useRef(null);
    const secretKeyRef = useRef(null);


    useEffect(() => {
        if (!createMode) {
            databaseUtils.fetchPostByID(id).then((data) => {
                setCurrentData(data);
            });

            databaseUtils.fetchCommentsByPostID(id).then((data) => {
                setCommentList(data);
            });
        }
    }, []);

    const dbID = !createMode ? id : -1;

    // if ((!info || info.length == 0) && !createMode) {
    //     return <div className='PostDetail'><></></div>;
    // }

    //Update the temporary data 
    const updateData = (e, key) => {
        setCurrentData({
            ...currentData,
            [key]: e.target.value,
        });


    }
    const navigate = useNavigate();
    const deleteData = () => {
        confirm("Are you sure you want to delete this post?");
        if (secretKeyRef.current.value != currentData.secretKey) {
            alert("Secret key mismatched. Entry won't be deleted. Please try again!");
            return;
        }

        databaseUtils.deleteData(dbID).then(() => {
            databaseUtils.deleteComments(dbID).then(() => {
                alert("Delete successfully");
                navigate('/');
            })
        });



        //Remember to delete the comments too

    }




    const saveData = async () => {
        if (!currentData || !currentData.title || !currentData.course || !currentData.content) {
            alert("Please filled out all required information.");
            return;
        }

        if (!createMode && secretKeyRef.current.value != currentData.secretKey) {
            alert("Secret key mismatched. Data won't be saved!");
            return;
        }

        //Update the last modified time
        if (createMode) {
            if (!currentData.secretKey){
                currentData.secretKey = "";
            }
            databaseUtils.createNewData(currentData, true).then((status) => {

                if (status === true) {
                    alert("Create successfully");
                    window.location.reload();
                }
                else {
                    alert("Create unsuccessful, please try again.");
                    console.log(status.message);
                }
            });
        }
        else {
            databaseUtils.updateData(currentData, dbID, true).then((status) => {
                if (status === true) {
                    alert("Update successfully");
                }
                else {
                    alert("Update unsuccessful, please try again.");
                    console.log(status.message);
                }
            });
        }
    }

    const likeHandler = () => {
        const newData = {
            ...currentData,
            like: currentData.like + 1,
        }

        setCurrentData(newData);
        databaseUtils.updateData(newData, currentData.id).then((data) => {

        });
    }

    const addCommentHandler = (e) => {
        let comment = commentRef.current.value;

        const newComment = {
            postID: currentData.id,
            content: comment,
        }

        databaseUtils.createNewComment(newComment).then((status) => {
            if (status === true) {
                alert("Comment created successfully");
                databaseUtils.fetchCommentsByPostID(id).then((data) => {
                    setCommentList(data);
                });
                //Update comment counts
                const newPostData = {
                    ...currentData,
                    commentCount: currentData.commentCount + 1,
                }

                setCurrentData(newPostData);
                databaseUtils.updateData(newPostData, currentData.id).then((data) => {

                });

                commentRef.current.value = "";
            }
            else {
                alert("Cannot add new comment, please try again.");
                console.log(status.message);
            }
        });

    }

    let title = <h2>Post View/Edit</h2>;
    if (createMode) {
        title = <h2>New Post</h2>;
    }

    const checkURL = (url) => {
        let tempURL = url;
        try {
            tempURL = new URL(url);

        } catch (_) {
            return false;
        }
        console.log(tempURL);
        const protocolComp = tempURL.protocol.localeCompare("http:") == 0
            || tempURL.protocol.localeCompare("https:") == 0;
        if (protocolComp) {
            if (tempURL.hostname.includes("yout")) {//Might be a youtube video
                return 'video'
            }
            else
                return 'photo'
        }
        else {
            return false;
        }

    }

    return <div className='PostDetail'>
        {title}
        <div className='mediaContainer'>
            <center>
                { //Video or Image
                    checkURL(currentData.imageURL) === 'photo' ?
                        <img className='postMedia' src={currentData.imageURL} />
                        : <></>
                }
                {
                    checkURL(currentData.imageURL) === 'video' ?
                        <iframe className='postMedia' src={currentData.imageURL} />
                        : <></>
                }
            </center>
        </div>


        <table className='detailTable'>
            <thead></thead>
            <tbody>

                <tr className="table-row" >
                    <th className="colHeader" key={"header title"}>
                        Title*
                    </th>
                    <th className="colData" >
                        <input className={"data title"}
                            type='text' defaultValue={createMode ? '' : currentData["title"]}
                            onChange={(e) => { updateData(e, "title") }}
                        />
                    </th>
                </tr>

                <tr className="table-row" >
                    <th className="colHeader" key={"header secretKey"}>
                        Secret Key*
                    </th>
                    <th className="colData" >
                        <input className={"data secretKey"}
                            type='text' defaultValue={''}
                            ref={secretKeyRef}
                        />
                    </th>
                </tr>

                <tr className="table-row" >
                    <th className="colHeader" key={"header course"}>
                        Course Name*
                    </th>
                    <th className="colData" >
                        <input className={"data course"}
                            type='text' defaultValue={createMode ? '' : currentData.course}
                            onChange={(e) => { updateData(e, "course") }}
                        />
                    </th>
                </tr>

                <tr className="table-row" >
                    <th className="colHeader" key={"header content"}>
                        Post content*
                    </th>
                    <th className="colData" >

                        <textarea className={"data content"} onChange={(e) => { updateData(e, "content") }}>

                        </textarea>
                    </th>
                </tr>

                <tr className="table-row" >
                    <th className="colHeader" key={"header imageURL"}>
                        Media URL (Optional)
                    </th>
                    <th className="colData" >
                        <input className={"data imageURL"}
                            type='text' defaultValue={createMode ? '' : currentData.imageURL}
                            onChange={(e) => { updateData(e, "imageURL") }}
                        />
                    </th>

                </tr>

                <tr key={"courseRating"} className="table-row" >
                    <th className="colHeader" key={"header courseRating"}>
                        Course Rating
                    </th>
                    <th className="colData" key={"data courseRating"}>
                        <input className={"data courseRating"}
                            type='range' min={0} max={10} defaultValue={createMode ? '' : currentData["courseRating"]}
                            onChange={(e) => { updateData(e, "courseRating") }}

                        />
                        Current Value {currentData["courseRating"]}
                    </th>
                </tr>

                <tr key={"like"} className="table-row" >
                    <th className="colHeader" key={"header like"}>
                        Number of upvotes
                    </th>
                    <th className="colData" key={"data like"}>
                        {currentData["like"]}
                    </th>
                </tr>
            </tbody>
            <tfoot>

            </tfoot>
        </table>
        <center><div>Any field with * is required</div> </center>
        <br></br>
        <div className='buttonContainer'>
            {!createMode ? <button className="cardButton" onClick={likeHandler}> +1 Upvote </button> : <></>}
            <button className="cardButton" onClick={saveData}> Save </button>
            {!createMode ? <button className="cardButton" onClick={deleteData}> Delete </button> : <></>}

        </div>
        <br></br>
        {createMode ? <></> :
            <div className="commentSectionContainer">
                <div className='commentContainer'>
                    {
                        commentList.map((comment) => {
                            const createdTime = new Date(comment.created_at).toUTCString();
                            return <div className="comment" key={comment.id}>

                                <p className="commentContent">{comment.content}</p>
                                <p className="commentCreatedTime">Created at {createdTime}</p>

                            </div>
                        })
                    }
                </div>
                <br></br>
                <div className='commentButtonContainer'>


                    <textarea className={"newCommentInput"} placeholder="Add new comment here." ref={commentRef} >

                    </textarea>
                    <center>
                        <button className="cardButton" onClick={addCommentHandler}> Add new comment </button>
                    </center>

                </div>
            </div>


        }
    </div>
}
export default PostDetail