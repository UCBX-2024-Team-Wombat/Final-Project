import React from 'react';

const Sharer = ({user}) => {
    const {
        username,
        city,
        country,
        gender,
        meetingPreferences,
        skill,
    } = user;
    return (
        <div style= {{ border: "1px solid #ccc", padding: "10px", margin: "10px"}}>
           <h3>{username}</h3>
           <p>
            <strong> location:</strong> {city}, {stateOrProvince}, {country}
         </p> 
         <p>
         <strong> Gender:</strong> {gender},
         </p>
         <p>
         <strong> Gender:</strong> {gender},
         </p>
        </div>
    )
}