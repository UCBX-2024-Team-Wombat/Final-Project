import SharerPreview from "../SharerPreview/SharerPreview.jsx";

const SearchResultsDisplay = ({ searchPayload, showOffered, showDesired }) => {
  const filteredData = () => {
    const filteredData = [];

    Object.keys(searchPayload)?.map((userId) => {
      const searchRelationshipData = searchPayload[userId].skillRelationships;

      const formattedData = {
        userInfo: searchPayload[userId].user,
        offeredSkills: [],
        desiredSkills: [],
      };

      for (const relationship of searchRelationshipData) {
        if (relationship.offered && showOffered) {
          formattedData.offeredSkills.push(relationship);
        }
        if (relationship.desired && showDesired) {
          formattedData.desiredSkills.push(relationship);
        }
      }

      if (
        (formattedData.offeredSkills.length > 0 && showOffered) ||
        (formattedData.desiredSkills.length > 0 && showDesired)
      ) {
        filteredData.push(formattedData);
      }
    });

    return filteredData;
  };

  if (!searchPayload) {
    return <></>;
  }

  return (
    <>
      {filteredData() ? (
        <div className="fw-bold fs-3">Search Results</div>
      ) : (
        <></>
      )}
      {filteredData().length > 0 ? (
        filteredData().map((data) => {
          return (
            <div key={JSON.stringify(data)}>
              <SharerPreview userInfo={data.userInfo} />
            </div>
          );
        })
      ) : (
        <></>
      )}
      {filteredData().length == 0 ? (
        <div className="fw-bold mx-3">
          <p>
            Shoot! Unfortunately we weren't able to find any Sharers that
            matched the criteria you're looking for.
          </p>
          <p>
            You can try again with different skill(s) and/or try your search
            again with less Sharer filters.
          </p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchResultsDisplay;
