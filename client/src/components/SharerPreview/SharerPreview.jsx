import { useNavigate } from "react-router-dom";

const SharerPreview = ({ payload }) => {
  const user = payload.user;
  const navigate = useNavigate();

  function viewProfile() {
    navigate(`/sharer/${user._id}`);
  }

  return (
    <>
      <div
        style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}
      >
        <h3>{user.username}</h3>
        <p>
          <strong> Location:</strong> {user.city}, {user.stateOrProvince},{" "}
          {user.country}
        </p>
        <p>
          <strong> Gender:</strong> {user.gender}
        </p>
        <p>
          <strong> Meeting Preference:</strong> {user.meetingPreference}
        </p>
        <p>
          <h3> Skills:</h3>
          <ul>
            {user.skills?.map((skill) => (
              <li key={skill.id}>
                {skill.skill.name} - {skill.ofered ? "Ofered" : "Desired"}
              </li>
            ))}
          </ul>
        </p>
        <button onClick={viewProfile}>View Profile</button>
      </div>
    </>
  );
};
export default SharerPreview;
