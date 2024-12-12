import SharerPreview from "../SharerPreview/SharerPreview.jsx";

const SearchResultsDisplay = ({ searchPayload, showOffered, showDesired }) => {
  const filteredData = () => {
    const filteredData = [];
    console.log("searchPayload", searchPayload);

    searchPayload?.getSkillRelationshipsBySearchCriteria?.map(
      (skillRelationship) => {
        if (skillRelationship.offered && showOffered) {
          filteredData.push(skillRelationship);
        }
        if (skillRelationship.desired && showDesired) {
          filteredData.push(skillRelationship);
        }
      }
    );

    return filteredData;
  };

  return (
    <>
      {/* {JSON.stringify(filteredData())} */}
      {filteredData().length > 0 ? (
        filteredData().map((data) => {
          return (
            <div key={JSON.stringify(data)}>
              <SharerPreview payload={data} />;
            </div>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchResultsDisplay;
