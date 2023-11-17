import { useState, useLayoutEffect, useRef, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import axios from "axios";
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import Dashboard from './components/Dashboard';
import Homepage from './components/Homepage';

// import { createClient } from '@supabase/supabase-js';
// const VITE_DB_KEY = import.meta.env.VITE_DB_KEY
// const VITE_DB_URL = import.meta.env.VITE_DB_URL
// const supabase = createClient(VITE_DB_URL, VITE_DB_KEY);
import databaseUtils from './utils/databaseUtils';


function App() {
    const [fetchData, setFetchData] = useState([]);
    const [postDetail, setPostDetail] = useState({});

    useEffect(() => {
        // databaseUtils.fetchingDataFromDB().then((data) => setFetchData(data));
        // setFetchData(JSON.parse(import.meta.env.VITE_FETCH_DATA));
        // console.log("Use effect trigger");
    }, []);



    return (
        <div className="App">
            <BrowserRouter>
                <Dashboard />
                <Routes>
                    <Route path="/">
                        <Route index element={<Homepage />} />
                        <Route path="posts">
                            <Route index element={<PostList
                                posts={fetchData}
                                setPosts={setFetchData}
                                setCurrentViewPost={setPostDetail}
                            />} />

                            <Route path="posts/:id" element={<PostDetail createMode={false} />}></Route>
                        </Route>


                        <Route path="createPost" element={<PostDetail createMode={true} />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>

        </div >

    )
}

export default App

