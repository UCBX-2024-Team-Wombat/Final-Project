import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import "./typeableDropdown.css";
import DropdownItem from "../DropdownItem/DropdownItem";
import { useGlobalContext } from "../../utils/GlobalState";
import TypeableDropdownStyleRouter from "./TypeableDropdownStyleRouter";

const TypeableDropdown = ({
  label,
  placeholder = "",
  query, // Note: Query must use argument titled "searchString"
  itemClickedFunction,
}) => {
  const [state, dispatch] = useGlobalContext();
  const styleRouter = new TypeableDropdownStyleRouter(state);
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

  const customDropdown = (skill) => {
    return (
      <>
        <DropdownItem onClick={handleItemClicked} itemData={skill} />
      </>
    );
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="dropdown">
          {label.length > 0 ? <Form.Label>{label}</Form.Label> : <></>}
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
        className={`dropdown-menu ${styleRouter.customDropdownMenu} ${
          data && data.skillsByName.length > 0 ? "showDropdown" : ""
        }`}
      >
        <div>
          {data
            ? data.skillsByName.map((skill, i, array) => {
                if (array.length - 1 == i) {
                  return customDropdown(skill);
                } else {
                  return (
                    <>
                      {customDropdown(skill)}
                      <hr className="dropdown-divider" />
                    </>
                  );
                }
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export default TypeableDropdown;
