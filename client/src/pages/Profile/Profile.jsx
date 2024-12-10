import React from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_ME } from '../../utils/queries';

const Profile = () => {
    const { loading, data } = useQuery(QUERY_ME);

    const userData = data?.me || {};

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
        <button type="submit">Update Profile</button>
      </form>
        </div>
    )
}

export default Profile;