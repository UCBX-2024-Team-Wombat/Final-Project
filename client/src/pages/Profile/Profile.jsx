import { useEffect, useState, useMemo } from "react";
import Modal from "react-bootstrap/Modal";
import { useQuery, useMutation } from "@apollo/client";
import {
  QUERY_ME,
  QUERY_SKILL_RELATIONSHIPS_BY_USER_ID,
} from "../../utils/queries.js";
import {
  MODIFY_USER,
  MODIFY_SKILL_RELATIONSHIP,
  ADD_SKILL_RELATIONSHIP,
} from "../../utils/mutations.js";
import SkillDisplayList from "../../components/SkillDisplayList/SkillDisplayList.jsx";
import AuthService from "../../utils/auth.js";
import { useGlobalContext } from "../../utils/GlobalState.jsx";
import ProfileStyleRouter from "./ProfileStyleRouter.js";
import SkillUpdateForm from "../../components/SkillUpdateForm/SkillUpdateForm.jsx";
import SkillAddForm from "../../components/SkillAddForm/SkillAddForm.jsx";
import {
  US_STATES,
  MEETING_PREFERENCE,
  GENDER_OPTIONS,
} from "../../utils/standardValues.js";

const Profile = () => {
  const [newUserData, setUserData] = useState();
  const [passwordMissMatch, setPasswordMissMatch] = useState(false);
  const { loading, data } = useQuery(QUERY_ME);
  const [modifyUser] = useMutation(MODIFY_USER);

  const userData = useMemo(() => data?.me || {}, [data]);

  useEffect(() => {
    if (userData) {
      setUserData({
        username: userData.username,
        email: userData.email,
      });
    }
  }, [userData]);

  const stateDisplay = () => {
    const states = [];

    for (let i = 0; i < 50; i++) {
      states.push(
        <option value={US_STATES[i].name}>{US_STATES[i].name}</option>
      );
    }

    return states;
  };

  const genderOptions = () => {
    const gender = [];

    for (let i = 0; i < 5; i++) {
      gender.push(
        <option value={GENDER_OPTIONS[i]}>{GENDER_OPTIONS[i]}</option>
      );
    }

    return gender;
  };

  const meetingPreferences = () => {
    const meeting = [];

    for (let i = 0; i < 3; i++) {
      meeting.push(
        <option value={MEETING_PREFERENCE[i]}>{MEETING_PREFERENCE[i]}</option>
      );
    }

    return meeting;
  };

  const [state, dispatch] = useGlobalContext();
  const [showUpdatModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [skillRelationshipPayload, setSkillRelationshipPayload] = useState({});
  const [updateSkill] = useMutation(MODIFY_SKILL_RELATIONSHIP);
  const [addSkillRelationship] = useMutation(ADD_SKILL_RELATIONSHIP);
  const styleRouter = new ProfileStyleRouter(state);
  const {
    loading: loadingRelationships,
    data: relationshipsData,
    refetch: refetchSkillRelationships,
  } = useQuery(QUERY_SKILL_RELATIONSHIPS_BY_USER_ID, {
    variables: { userId: AuthService.getProfile().data._id },
  });

  const skillRelationships =
    relationshipsData?.getSkillRelationshipsByUserId || [];

  function openOfferedModal(payload) {
    setSkillRelationshipPayload({ ...payload, modalType: "offered" });
    setShowUpdateModal(true);
  }

  function openDesiredModal(payload) {
    setSkillRelationshipPayload({ ...payload, modalType: "desired" });
    setShowUpdateModal(true);
  }

  function formatFormStateForUpdate(formState) {
    const skillRelationshipInput = formState;

    skillRelationshipInput.userId = skillRelationshipInput.user._id;
    skillRelationshipInput.skillId = skillRelationshipInput.skill._id;

    delete skillRelationshipInput.user;
    delete skillRelationshipInput.skill;
    delete skillRelationshipInput.modalType;
    delete skillRelationshipInput.__typename;
    delete skillRelationshipInput._id;

    return skillRelationshipInput;
  }

  function updateRelationship(formState) {
    hideUpdateModal();

    updateSkill({
      variables: {
        skillRelationshipId: formState._id,

        skillRelationshipInput: formatFormStateForUpdate(formState),
      },
    });

    refetchSkillRelationships();
  }

  function createSkillRelationship(payload) {
    hideAddModal();

    const {
      skillId,
      userId,
      yearsOfExperience,
      offered,
      offeredText,
      desired,
      desiredText,
    } = payload;

    addSkillRelationship({
      variables: {
        input: {
          skillId,
          userId,
          yearsOfExperience,
          offered,
          offeredText,
          desired,
          desiredText,
        },
      },
    });

    refetchSkillRelationships();
  }

  function openAddModal() {
    setShowAddModal(true);
  }

  function hideUpdateModal() {
    setShowUpdateModal(false);
  }

  function hideAddModal() {
    setShowAddModal(false);
  }

  const offeredSkills = () => {
    if (skillRelationships.length > 0) {
      return skillRelationships.filter(
        (relationship) => relationship.offered == true
      );
    }

    return [];
  };

  const desiredSkills = () => {
    if (skillRelationships.length > 0) {
      return skillRelationships.filter(
        (relationship) => relationship.desired == true
      );
    }

    return [];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData({
      ...newUserData,
      [name]: value,
    });
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
        password: newUserData.password2, // Insert additional form fields from newUserData here
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
      await modifyUser({
        variables: { userId: userData._id, userInput: newUserData },
      });

      alert("Settings updated!");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container my-5">
      {/* =============================== */}
      {/* =====Update Skill Modal======== */}
      {/* =============================== */}
      <Modal show={showUpdatModal} onHide={hideUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>{skillRelationshipPayload?.skill?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SkillUpdateForm
            skillRelationshipData={skillRelationshipPayload}
            offered={skillRelationshipPayload.modalType == "offered"}
            desired={skillRelationshipPayload.modalType == "desired"}
            submitButtonLabel="Update"
            submitButtonFunction={updateRelationship}
          />
        </Modal.Body>
      </Modal>
      {/* =============================== */}
      {/* =======Add Skill Modal========= */}
      {/* =============================== */}
      <Modal show={showAddModal} onHide={hideAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add A New Skill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SkillAddForm submitButtonFunction={createSkillRelationship} />
        </Modal.Body>
      </Modal>
      {/* =============================== */}
      <form style={{ flex: "1" }}>
        <h1 className="text-left mb-4">My Profile</h1>
        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={newUserData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={newUserData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">About Me:</label>
          <textarea
            type="email"
            className="form-control"
            name="bio"
            rows="3"
            value={userData.bio}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">City:</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={userData.city}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">State:</label>
          <select
            id="stateOrProvince"
            className="form-select"
            name="stateOrProvince"
            value={userData.stateOrProvince}
            placeholder={userData.stateOrProvince}
            onChange={handleChange}
          >
            {stateDisplay()}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Gender:</label>
          <select
            id="gender"
            className="form-select"
            name="gender"
            value={userData.gender}
            onChange={handleChange}
          >
            {genderOptions()}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Meeting Preference:</label>
          <select
            id="meetingPreference"
            className="form-select"
            name="meetingPreference"
            value={userData.meetingPreference}
            onChange={handleChange}
          >
            {meetingPreferences()}
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleUpdateSettings}
        >
          Update Settings
        </button>
      </form>
      <br></br> <br></br>
      <form className="">
        <div className="mb-3">
          <label className="form-label">New Password:</label>
          <input
            type="password"
            className="form-control"
            name="password1"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password:</label>
          <input
            type="password"
            className="form-control"
            name="password2"
            onChange={handleChange}
          />
        </div>
        <div className="text-danger" hidden={!passwordMissMatch}>
          Passwords do not match
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Update Profile
        </button>
      </form>
      <div>
        {offeredSkills().length > 0 ? (
          <>
            <div className="container">
              <div className="row justify-content-between">
                <div className="col">
                  <div className={styleRouter.header}>Skills I Offer</div>
                </div>
                <div className="col d-flex justify-content-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => openAddModal("offered")}
                  >
                    Add A Skill
                  </button>
                </div>
              </div>
            </div>
            <SkillDisplayList
              skillRelationshipList={offeredSkills()}
              openModalFunction={openOfferedModal}
            />
          </>
        ) : (
          <></>
        )}
        {desiredSkills().length > 0 ? (
          <>
            <div className={styleRouter.header}>Skills I Want To Learn</div>
            <SkillDisplayList
              skillRelationshipList={desiredSkills()}
              openModalFunction={openDesiredModal}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Profile;
