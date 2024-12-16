import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { useGlobalContext } from "../../utils/GlobalState";

function Login() {
  const [state] = useGlobalContext();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
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
      <h2 className="text-center my-3">Login</h2>
      <div className={state.isDesktop ? "d-flex justify-content-center" : ""}>
        <form
          style={state.isDesktop ? { width: "500px" } : {}}
          onSubmit={handleFormSubmit}
        >
          <div className="text-center mb-3">
            <div>Welcome back!</div>
            <div>Please enter your username and password below</div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address:
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
          {error ? (
            <div>
              <p className="error-text">
                The provided credentials are incorrect
              </p>
            </div>
          ) : null}
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

export default Login;
