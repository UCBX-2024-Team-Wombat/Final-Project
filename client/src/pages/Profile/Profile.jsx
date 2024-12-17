import { useEffect, useState, useMemo } from "react";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
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
  const [passwordMissMatch, setPasswordMissMatch] = useState(false);
  const { loading, data } = useQuery(QUERY_ME);
  const [modifyUser] = useMutation(MODIFY_USER);
  const [newUserData, setNewUserData] = useState({ ...data?.me });
  const [settingsUpdate, setSettingsUpdate] = useState(false);
  const [state, dispatch] = useGlobalContext();
  const [showUpdatModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [skillRelationshipPayload, setSkillRelationshipPayload] = useState({});
  const [updateSkill] = useMutation(MODIFY_SKILL_RELATIONSHIP);
  const [addSkillRelationship] = useMutation(ADD_SKILL_RELATIONSHIP);
  const styleRouter = new ProfileStyleRouter(state);
  const { data: relationshipsData, refetch: refetchSkillRelationships } =
    useQuery(QUERY_SKILL_RELATIONSHIPS_BY_USER_ID, {
      variables: { userId: AuthService.getProfile().data._id },
    });

  const skillRelationships =
    relationshipsData?.getSkillRelationshipsByUserId || [];

  const userData = data?.me || {};

  useEffect(() => {
    if (userData) {
      setNewUserData({ ...userData });
    }
  }, [userData]);

  const stateDisplay = () => {
    const states = [];

    US_STATES.map((state) => {
      states.push(<option value={state.name}>{state.name}</option>);
    });

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

  const handleUserFieldChange = (e) => {
    const { name, value } = e.target;
    console.log("name", name, "value", value);

    setNewUserData({
      ...newUserData,
      [name]: value,
    });
  };

  const handlePasswordUpdate = async (e) => {
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
    } catch (err) {
      console.error(err);
      alert("Error cannot update profile.");
    }
  };

  const handleUpdateSettings = async (e) => {
    e.preventDefault();

    try {
      const formattedNewUserData = { ...newUserData };

      delete formattedNewUserData.__typename;
      delete formattedNewUserData._id;

      await modifyUser({
        variables: { userId: userData._id, userInput: formattedNewUserData },
      });

      setSettingsUpdate(true);
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
      <div className="row">
        <div className={styleRouter.pageSection}>
          {styleRouter.isDesktop ? (
            <h2 className="text-left border-bottom pb-3 mb-2">My Profile</h2>
          ) : (
            <h1 className="text-left border-bottom pb-3 mb-2">My Profile</h1>
          )}
          <Accordion defaultActiveKey="">
            <Accordion.Item eventKey="0">
              <Accordion.Header className={styleRouter.header}>
                My Info
              </Accordion.Header>
              <Accordion.Body>
                <form>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={newUserData.username}
                      onChange={handleUserFieldChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={newUserData.email}
                      onChange={handleUserFieldChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">About Me</label>
                    <textarea
                      type="email"
                      className="form-control"
                      name="bio"
                      rows="3"
                      value={newUserData.bio}
                      onChange={handleUserFieldChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">City</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={newUserData.city}
                      onChange={handleUserFieldChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">State</label>
                    <select
                      id="stateOrProvince"
                      className="form-select"
                      name="stateOrProvince"
                      value={newUserData.stateOrProvince}
                      placeholder={newUserData.stateOrProvince}
                      onChange={handleUserFieldChange}
                    >
                      {stateDisplay()}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Gender</label>
                    <select
                      id="gender"
                      className="form-select"
                      name="gender"
                      value={newUserData.gender}
                      onChange={handleUserFieldChange}
                    >
                      {genderOptions()}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Meeting Preference
                    </label>
                    <select
                      id="meetingPreference"
                      className="form-select"
                      name="meetingPreference"
                      value={newUserData.meetingPreference}
                      onChange={handleUserFieldChange}
                    >
                      {meetingPreferences()}
                    </select>
                  </div>
                  <div className="border-bottom pb-3 mb-2">
                    <button
                      type="submit"
                      className="btn btn-success w-100"
                      onClick={handleUpdateSettings}
                    >
                      Update My Info
                    </button>
                    {settingsUpdate ? (
                      <div className="text-success mt-2 text-center">
                        Settings updated!
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </form>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header className={styleRouter.header}>
                Change Password
              </Accordion.Header>
              <Accordion.Body>
                <form>
                  <div className="mb-3">
                    <label className="form-label fw-bold">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password1"
                      onChange={handleUserFieldChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password2"
                      onChange={handleUserFieldChange}
                    />
                  </div>
                  <div className="text-danger" hidden={!passwordMissMatch}>
                    Passwords do not match
                  </div>
                  <div className="border-bottom pb-3 mb-2">
                    <button
                      type="submit"
                      className="btn btn-success w-100"
                      onClick={handlePasswordUpdate}
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className={styleRouter.isDesktop ? "col-8" : ""}>
          <div>
            <div
              className={
                styleRouter.pageSectionTitle + " row justify-content-between"
              }
            >
              <div className="col">
                {styleRouter.isDesktop ? (
                  <h2 className="text-left border-bottom pb-3 mb-2">
                    My Skills
                  </h2>
                ) : (
                  <h1 className="text-left border-bottom pb-3 mb-2">
                    My Skills
                  </h1>
                )}
              </div>
              <div className="col d-flex justify-content-end align-items-start">
                <button className="btn btn-info" onClick={openAddModal}>
                  Add A Skill
                </button>
              </div>
            </div>
          </div>
          <div className={styleRouter.isDesktop ? "row" : ""}>
            <div className={styleRouter.pageSection}>
              <div className={styleRouter.pageSectionTitle}>Skills I Offer</div>
              <div>
                {offeredSkills().length > 0 ? (
                  <SkillDisplayList
                    skillRelationshipList={offeredSkills()}
                    openModalFunction={openOfferedModal}
                  />
                ) : (
                  <div>Nothing yet! Click "Add Skill" to update this list.</div>
                )}
              </div>
            </div>
            <div className={styleRouter.pageSection}>
              <div className={styleRouter.pageSectionTitle}>
                Skills I Want To Learn
              </div>
              <div>
                {desiredSkills().length > 0 ? (
                  <SkillDisplayList
                    skillRelationshipList={desiredSkills()}
                    openModalFunction={openDesiredModal}
                  />
                ) : (
                  <div>Nothing yet! Click "Add Skill" to update this list.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
