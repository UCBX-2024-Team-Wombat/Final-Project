import React from 'react';
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_ME, QUERY_SKILLRELATIONSHIPS } from '../utils/queries';
import ProfileSkills from '../components/ProfileSkills/ProfileSkills';

//create a base myProfile page (form section)
// 2 buttons for functionality (current skills, desired skills)
//autofill

const Profile = () => {
    const { loading, data } = useQuery(QUERY_ME);
    // const { loading2, data2 } = useQuery(QUERY_SKILLRELATIONSHIPS);

    const userData = data?.me || {};

    // const foundSkillData = data2 || {};

    console.log(userData);
    // console.log("Skills: ", foundSkillData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
          ...userData,
          [name]: value,
        });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await updateUserProfile({
            variables: { ...userData },
          });
          alert('Profile updated!');
        } catch (err) {
          console.error(err);
          alert('Error cannot update profile.');
        }
      };


    if (loading) {
        return <h2>Loading...</h2>
    }
    return (
        <div className = "myProfile">
            <h1>My Profile</h1>
            <ProfileSkills id={userData._id}/>
            <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </div>
        <br></br>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <br></br>
        <button type="submit">Update Profile</button>
      </form>
        </div>
    )
}

export default Profile;