import { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations";
import { useGlobalContext } from "../../utils/GlobalState";

function Signup() {
  const [state] = useGlobalContext();
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        username: formState.username,
        email: formState.email,
        password: formState.password,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <>
      <h2 className="text-center my-3">Signup</h2>
      <div className={state.isDesktop ? "d-flex justify-content-center" : ""}>
        <form
          style={state.isDesktop ? { width: "500px" } : {}}
          onSubmit={handleFormSubmit}
        >
          <div className="text-center mb-3">
            <div>
              Welcome! Please enter a username, your current email address, and
              password below
            </div>
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              placeholder="yourUsername"
              name="username"
              id="username"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pwd" className="form-label">
              Password:
            </label>
            <input
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row flex-end">
            <button type="submit" className="btn btn-success w-100">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
