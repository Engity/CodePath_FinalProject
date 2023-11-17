import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import '../assets/styles/Homepage.css'
// import crewmateIMG from '../assets/images/homeCrewmate.png'
// import ufoIMG from '../assets/images/saucer.png'

const Homepage = () => {
    return (
        <div className="Homepage">
            <h1>Welcome to the Course Talks</h1>
            <h2>This is where you can share what exciting in the courses you took</h2>
            <br />
            {/* <img className="homepageIMG" src={crewmateIMG} />
            <br />
            <img className="homepageIMG" src={ufoIMG} /> */}
        </div>
    );
}

export default Homepage;