import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import '../assets/styles/PostList.css'
import PostSummary from "./PostSummary";
import databaseUtils from '../utils/databaseUtils';

//Contain sort functionalities
const PostList = ({ posts, setPosts, setCurrentViewPost }) => {
    const navigate = useNavigate();
    const [tempPosts, setTempPosts] = useState([]);
    const [sortedPosts, setSortedPosts] = useState(posts);
    const searchRef = useRef(null);

    const sortByModifiedTime = (e, list) => {
        let newList = list.slice().sort((a, b) => {
            let dateA = new Date(a.lastModified);
            let dateB = new Date(b.lastModified);

            return dateB - dateA;
        });

        setSortedPosts(newList);

        return newList;
    }

    useLayoutEffect(() => {
        databaseUtils.fetchingDataFromDB().then((data) => {
            setPosts(data);
            setTempPosts(data);
            // setSortedPosts(data);
            sortByModifiedTime(null, data);
        });

    }, []);


    const sortByUpvotes = (e, list) => {
        let newList = list.slice().sort((a, b) => {
            return b.like - a.like;
        });

        setSortedPosts(newList);

        return newList;
    }


    const sortByName = (e, list) => {
        let newList = list.slice().sort((a, b) => {
            return a.title.localeCompare(b.title);
        });

        setSortedPosts(newList);


        return newList;
    }

    //Control entries navigation
    const [currentView, setCurrentView] = useState(0);

    const entriesPerview = 3;

    const viewNext = () => {
        if (currentView + entriesPerview < sortedPosts.length) {
            setCurrentView(currentView + entriesPerview);
        }
    }

    const viewPrevious = () => {
        if (currentView - entriesPerview >= 0) {
            setCurrentView(currentView - entriesPerview);
        }
    }

    const updatePost = (index, key, value) => {
        let postList = [...sortedPosts];
        postList[index][key] = value;
        setSortedPosts(postList);
    }

    const filterPost = (e) => {
        const val = e.target.value;

        if (!sortedPosts || sortedPosts.length == 0 && val !== '') {
            return;
        }

        if (val == '') {
            setSortedPosts(tempPosts);
            return;
        }

        let postList = sortedPosts.filter((post) => { return post.title.includes(val) });
        setSortedPosts(postList);
    }



    return (
        <div className="PostList">
            <div className="buttonContainer utility">
                <input id="searchBar" type="text" placeholder="Search title" onChange={filterPost} ref={searchRef} />

                <button className="postListButton" onClick={(e) => sortByName(e, sortedPosts)}> Sort by Title </button>
                <button className="postListButton" onClick={(e) => sortByModifiedTime(e, sortedPosts)}> Sort by modified time </button>
                <button className="postListButton" onClick={(e) => sortByUpvotes(e, sortedPosts)}> Sort by upvotes </button>
            </div>

            {(sortedPosts && sortedPosts.length != 0) ?
                <div>
                    <h3 className="TableInfo"> Current View {currentView} to {Math.min(sortedPosts.length, currentView + entriesPerview)} of {sortedPosts.length}</h3>
                    {sortedPosts.map((post, index) => {

                        if (index < currentView || index >= currentView + entriesPerview)
                            return null;

                        return <div key={post.id}>
                            <PostSummary
                                post={post} index={index}
                                updatePost={updatePost} setCurrentViewPost={setCurrentViewPost}
                            />

                        </div>
                    })}

                    <div className="entryTraversal">
                        <center>
                            {currentView - entriesPerview >= 0 ?
                                <button className="postListButton" onClick={() => viewPrevious()}>
                                    Prev
                                </button> : <></>}
                            {currentView + entriesPerview < sortedPosts.length ?
                                <button className="postListButton" onClick={() => viewNext()}>
                                    Next
                                </button> : <></>}
                        </center>
                    </div>
                </div>
                // Data has not been fetched or there is no data
                : <div>
                    <p id="NoData">
                        No data
                    </p>
                </div>
            }

        </div>
    );
}

export default PostList;