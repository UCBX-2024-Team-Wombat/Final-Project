import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { MODIFY_USER } from "../utils/mutations";
import { US_STATES, MEETING_PREFERENCE, GENDER_OPTIONS } from "../utils/standardValues"

//create a base myProfile page (form section)
// 2 buttons for functionality (current skills, desired skills)
//autofill

const Profile = () => {
    const [newUserData, setUserData] = useState();
    const [passwordMissMatch, setPasswordMissMatch] = useState(false);
    const { loading, data } = useQuery(QUERY_ME);
    // const { loading2, data2 } = useQuery(QUERY_SKILLRELATIONSHIPS);
    const [modifyUser] = useMutation(MODIFY_USER);
    //var passwordMissMatch = false;
    const userData = data?.me || {};

    // const foundSkillData = data2 || {};

    //console.log(userData);
    // console.log("Skills: ", foundSkillData);

    //for loop for all the states and their abbreviation
    const stateDisplay = () => {
        const states = []
        for (let i = 0; i < 50; i++) {
            states.push(<option value={US_STATES[i].abbreviation}>{US_STATES[i].name}</option>)
          }
          return states;
    }

     //for loop for all the gender options
     const genderOptions = () => {
        const gender = []
        for (let i = 0; i < 5; i++) {
            gender.push(<option value={GENDER_OPTIONS[i]}>{GENDER_OPTIONS[i]}</option>)
          }
          return gender;
    }

     //for loop for meeting preferences
     const meetingPreferences = () => {
        const meeting = []
        for (let i = 0; i < 3; i++) {
            meeting.push(<option value={MEETING_PREFERENCE[i]}>{MEETING_PREFERENCE[i]}</option>)
          }
          return meeting;
    }

    const handleChange = (e) => {
        console.log(e.target);
        const { name, value } = e.target;
        console.log(name, value);
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
                setPasswordMissMatch(true);
                return;
            } else {
                setPasswordMissMatch(false);
            }
            const payload = {
                password: newUserData.password2,
                // Insert additional form fields from newUserData here
            };

            await modifyUser({
                variables: {
                    userId: userData._id,
                    userInput: payload,
                },
            });
            alert("Profile updated!");
        } catch (err) {
            console.error(err);
            alert("Error cannot update profile.");
        }
    };

    const handleUpdateSettings = async (e) => {
        e.preventDefault();
        try {

        console.log(newUserData);
        //send newUserData to backend to save it
        alert("Settings updated!");
           
        } catch (err) {
            console.log(err);
        }
    }

    if (loading) {
        return <h2>Loading...</h2>;
    }
    return (
        <div className="myProfile" style={{ display: 'flex' }}>
            <form style={{ flex: '1'}}>
            <h1>My Profile</h1>
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
                    <input type="password" name="password1" onChange={handleChange} />
                </div>
                <br></br>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" name="password2" onChange={handleChange} />
                </div>
                <div className="text-danger" hidden={!passwordMissMatch}>
                    Passwords do not match
                </div>
                <br></br>
                <button type="submit" onClick={handleSubmit}>
                    Update Profile
                </button>
            </form>
            <form style={{ flex: '1', marginTop: '55px' }}>
                <div>
                    <label>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={userData.city}
                        onChange={handleChange}
                    />
                </div>
                <br></br>
                <div>
                    <label>State:</label>
                    <select
                        id="state"
                        name="state"
                        onChange={handleChange}
                    > {stateDisplay()}
                    </select>
                </div>
                <br></br>
                <div>
                    <label>Gender:</label>
                    <select
                        id="gender"
                        name="gender"
                        onChange={handleChange}
                    > {genderOptions()}
                    </select>
                </div>
                <br></br>
                <div>
                    <label>Meeting Preference:</label>
                    <select
                        id="meeting"
                        name="meeting"
                        onChange={handleChange}
                    > {meetingPreferences()}
                    </select>
                </div>
                <br></br>
                <button type="submit" onClick={handleUpdateSettings}>
                    Update Settings
                </button>
            </form>
        </div>
    );
};

export default Profile;
