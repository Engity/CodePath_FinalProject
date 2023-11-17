import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import '../assets/styles/Dashboard.css'

const Dashboard = (info) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Home');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        switch (tabName) {
            case 'Home':
                navigate("/");
                break;
            case 'Create':
                navigate("createPost");
                break;
            case 'Posts':
                navigate("posts");
                break;
            default:
                navigate("/");
        }
    };

    return (
        <div className="Dashboard">
            <ul>
                <li className={activeTab === 'Home' ? 'active' : ''}>
                    <button className="dashboardButton" onClick={() => handleTabClick('Home')}>Home</button>
                </li>
                <li className={activeTab === 'Posts' ? 'active' : ''}>
                    <button className="dashboardButton" onClick={() => handleTabClick('Posts')}>Posts</button>
                </li>

                <li className={activeTab === 'Create' ? 'active' : ''}>
                    <button className="dashboardButton" onClick={() => handleTabClick('Create')}>Create New Post</button>
                </li>
            </ul>

            <h1 id="Title">
                Course Talks!
            </h1>
        </div>
    );
}

export default Dashboard;