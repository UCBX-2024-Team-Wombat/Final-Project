import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import "./TypeableDropdown.css";
import DropdownItem from "../DropdownItem/DropdownItem";

const TypeableDropdown = ({
  label,
  placeholder = "",
  query, // Note: Query must use argument titled "searchString"
  itemClickedFunction,
}) => {
  const [queryString, setQueryString] = useState("");
  const [querySkills, { called, loading, data }] = useLazyQuery(query, {
    variables: { searchString: queryString },
  });

  let queryTimer;
  const queryTimerWaitTime = 1000;

  function updateQueryString(event) {
    setQueryString(event.target.value);
  }

  function handleItemClicked(data) {
    console.log(data);
    itemClickedFunction(data);
    setQueryString("");
  }

  function queryText() {
    clearTimeout(queryTimer);

    queryTimer = setTimeout(() => {
      querySkills();
    }, queryTimerWaitTime);
  }

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="dropdown">
          <Form.Label>{label}</Form.Label>
          <Form.Control
            type="text"
            placeholder={placeholder}
            value={queryString}
            onChange={updateQueryString}
            onKeyUp={queryText}
          />
        </Form.Group>
      </Form>
      <div
        className={`dropdown-menu ${
          data && data.skillsByName.length > 0 ? "showDropdown" : ""
        }`}
      >
        <div>
          {data
            ? data.skillsByName.map((skill) => {
                return (
                  <>
                    <DropdownItem
                      onClick={handleItemClicked}
                      skillData={skill}
                    />
                  </>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export default TypeableDropdown;
