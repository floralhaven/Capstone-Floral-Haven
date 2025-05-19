import React, { useEffect } from 'react';
import '../style/Main.css';

const Profile = () => {
    useEffect(() => {
        const navScript = document.createElement("script");
        navScript.src = "/JS/nav.js";
        navScript.async = true;
        document.body.appendChild(navScript);

        const profileScript = document.createElement("script");
        profileScript.src = "/JS/profile.js";
        profileScript.async = true;
        document.body.appendChild(profileScript);

        const gardenScript = document.createElement("script");
        gardenScript.src = "/JS/garden-planner.js";
        gardenScript.async = true;
        document.body.appendChild(gardenScript);

        return () => {
            document.body.removeChild(navScript);
            document.body.removeChild(profileScript);
            document.body.removeChild(gardenScript);
        };
    }, []);

    return (
        <div className="profile">
            <h1 className="profile-header">Profile</h1>

            <div className="garden-planner">
                <div>                
                    <label htmlFor="collection-select">Collection:</label>
                    <select id="collection-select">
                        <option value="bees">Bees</option>
                        <option value="bats">Bats</option>
                        <option value="butterflies">Butterflies</option>
                        <option value="hummingbirds">Hummingbirds</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="plant-name">Plant Name:</label>
                    <input type="text" id="plant-name" />
                    <button id="addPlantButton">Add Plant</button>
                </div>

                <div>
                    <label htmlFor="layout-name">Layout Name:</label>
                    <input type="text" id="layout-name" />
                    <button id="saveLayoutButton">Save Layout</button>
                    <button id="clearLayoutButton">Clear Grid</button>
                </div>

                <p className="favorites">Favorite Plants</p>

                <div className="Gridplants">
                    <div className="likedplants"></div>

                    <div className="grid-container" id="garden-grid">
                        {[...Array(9)].map((_, idx) => {
                            const row = Math.floor(idx / 3);
                            const col = idx % 3;
                            return (
                                <div
                                    key={idx}
                                    className="grid-item"
                                    data-row={row}
                                    data-col={col}
                                ></div>
                            );
                        })}
                    </div>
                </div>

                <p>Saved Layouts</p>
                <div id="saved-layouts" className="saved-layouts"></div>

                <br />
                <button className="logoutbtn" id="logoutbtn">Log out</button>
            </div>
        </div>
    );
};

export default Profile;
