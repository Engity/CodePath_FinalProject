import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import '../assets/styles/PostSummary.css'
import databaseUtils from '../utils/databaseUtils';

//Display a summary of a post
const PostSummary = ({ post, updatePost, index, setCurrentViewPost }) => {
    const navigate = useNavigate();

    const createdDate = new Date(post.createdAt);
    const lastModifed = new Date(post.lastModified);

    let briefContent = post.content.substring(0, 20);
    if (post.content.length > 20) {
        briefContent += "...";
    }

    const likeHandler = () => {

        const newData = {
            ...post,
            like: post.like + 1,
        }
        updatePost(index, "like", post.like + 1);
        databaseUtils.updateData(newData, post.id).then((status) => {

        });
    }

    const postClickHandler = () => {
        console.log("Post " + index + " clicked");
        setCurrentViewPost(post);
        navigate("posts/" + post.id);
    }

    return (
        <div className="PostSummary" key={"PostSummary" + index} >
            <div className="PostSummaryMainSection">
                <h3 className="PostSummaryTitle">
                    {post.title}
                </h3>
                <p> <b>Course: </b> {post.course} </p>
                <p> <b>Content: </b> {briefContent} </p>

                <div className="PostSummarySubSection">
                    <p className="numberOfLikes" >{post.like} upvotes </p>
                    <p className="numberOfComments" >{post.commentCount} comments </p>

                    <div className="timeSection">
                        Created at {createdDate.toUTCString()}
                        <br></br>
                        Last modified at {lastModifed.toUTCString()}
                    </div>

                </div>

            </div>

            <div className="buttonSection">
                <button onClick={likeHandler}> +1 Upvote </button>
        
                <br></br>
                <button onClick={postClickHandler}> View/Edit </button>

            </div>

        </div>
    );
}

export default PostSummary;