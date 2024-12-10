import React from 'react';

const Sharer = ({user}) => {
    const {
        username,
        city,
        stateOrProvince,
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
         <strong> Meeting Preference:</strong> {meetingPreference},
         </p>
         <p>
         <strong> Provided Skills:</strong> {skills.offered.map(skill => skill.skillName).join(", ")},
         </p>
         <p>
         <strong> Desired Skills:</strong> {skills.desired.map(skill => skill.skillName).join(", ")},
         </p>
         <button onClick={() => alert(`Viewing ${username}'s profile`)}>
        View Profile
      </button>
        </div>
    )
}
export default Sharer;