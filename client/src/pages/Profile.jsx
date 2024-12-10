import React, { useMemo, useState } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from '../utils/queries';
import { MODIFY_USER } from '../utils/mutations';

//create a base myProfile page (form section)
// 2 buttons for functionality (current skills, desired skills)
//autofill

const Profile = () => {
    const [newUserData, setUserData] = useState()
    const [passwordMissMatch, setPasswordMissMatch] = useState(false);
    const { loading, data } = useQuery(QUERY_ME);
    // const { loading2, data2 } = useQuery(QUERY_SKILLRELATIONSHIPS);
    const [modifyUser] = useMutation(MODIFY_USER);
    //var passwordMissMatch = false;
    const userData = data?.me || {};

    // const foundSkillData = data2 || {};

    //console.log(userData);
    // console.log("Skills: ", foundSkillData);

    const handleChange = (e) => {
        console.log(e.target);
        const { name, value } = e.target;
        console.log(name, value)
        setUserData({
            ...newUserData,
            [name]: value,
        });
        console.log(newUserData);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(newUserData);
            if (newUserData.password1 != newUserData.password2) {
                setPasswordMissMatch(true)
                return;
            } else {
                setPasswordMissMatch(false)
            }
            const payload = {
                password: newUserData.password2,
                userId: userData._id
            }
            console.log(payload);
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
        <div className="myProfile">
            <h1>My Profile</h1>
            <form>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="name"
                        value={userData.username}
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
                        name="password1"
                        onChange={handleChange}
                    />
                </div>
                <br></br>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="password2"
                        onChange={handleChange}
                    />
                </div>
                <div className="text-danger" hidden={!passwordMissMatch}>
                    Passwords do not match
                </div>
                <br></br>
                <button type="submit" onClick={handleSubmit}>Update Profile</button>
            </form>
        </div>
    )
}

export default Profile;