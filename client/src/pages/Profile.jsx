import React, { useMemo, useState } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from '../utils/queries';
import { MODIFY_USER } from '../utils/mutations';

//create a base myProfile page (form section)
// 2 buttons for functionality (current skills, desired skills)
//autofill

const Profile = () => {
    const [newUserData, setUserData] = useState()
    const { loading, data } = useQuery(QUERY_ME);
    // const { loading2, data2 } = useQuery(QUERY_SKILLRELATIONSHIPS);
    const [modifyUser] = useMutation(MODIFY_USER)

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
        const payload = {
            password: newUserData.password,
            userId: userData._id 
        }
        console.log(payload);
        //TODO: if passwords don't match, send alert (if else statement)
          await modifyUser({
            variables: { ...payload },
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
            <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            // onChange={handleChange}
          />
        </div>
        <br></br>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            // onChange={handleChange}
          />
        </div>
        <br></br>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            // onChange={handleChange}
          />
        </div>
        <br></br>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <br></br>
        <button type="submit" onClick = {handleSubmit}>Update Profile</button>
      </form>
        </div>
    )
}

export default Profile;