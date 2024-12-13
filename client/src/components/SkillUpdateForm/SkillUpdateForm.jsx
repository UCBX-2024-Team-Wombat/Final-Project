import Form from "react-bootstrap/Form";
import { useState } from "react";

const SkillUpdateForm = ({
  skillRelationshipData,
  offered,
  desired,
  submitButtonLabel,
  submitButtonFunction,
}) => {
  const [formState, setFormState] = useState({
    ...skillRelationshipData,
  });

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleChange(event) {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  }

  const offeredDisplay = (
    <>
      <Form.Group className="mb-3" controlId="offeredText">
        <Form.Label>
          Please give a brief description of what you can offer to teach
        </Form.Label>
        <Form.Control
          as="textarea"
          rows="5"
          required
          name="offeredText"
          value={formState.offeredText}
          onChange={handleChange}
        />
      </Form.Group>
    </>
  );

  const desiredDisplay = (
    <Form.Group className="mb-3" controlId="desiredText">
      <Form.Label>
        Please give a brief description of what you would like to learn
      </Form.Label>
      <Form.Control
        as="textarea"
        rows="5"
        required
        name="desiredText"
        value={formState.desiredText}
        onChange={handleChange}
      />
    </Form.Group>
  );

  return (
    <>
      <div>{skillRelationshipData.name}</div>
      <div>{skillRelationshipData.description}</div>
      {offered || desired ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="yearsOfExperience">
            <Form.Label>Years of Experience</Form.Label>
            <Form.Control
              type="number"
              required
              name="yearsOfExperience"
              min="0"
              step=".01"
              value={formState.yearsOfExperience}
              onChange={handleChange}
            />
          </Form.Group>
          {offered ? offeredDisplay : <></>}
          {desired ? desiredDisplay : <></>}

          <button
            className="btn btn-primary"
            onClick={() => submitButtonFunction(formState)}
          >
            {submitButtonLabel}
          </button>
        </Form>
      ) : (
        <></>
      )}
    </>
  );
};

export default SkillUpdateForm;
