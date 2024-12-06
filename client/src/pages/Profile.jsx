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


    if (loading) {
        return <h2>Loading...</h2>
    }
    return (
        <div className = "myProfile">
            <h1>My Profile</h1>
            <ProfileSkills id={userData._id}/>
        </div>
    )
}

export default Profile;