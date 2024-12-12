const DropdownItem = ({ itemData, onClick }) => {
  return (
    <>
      <div
        className={`dropdown-item text-wrap`}
        key={itemData.name}
        onClick={() => onClick(itemData)}
      >
        <div className="fw-bold">{itemData.name}</div>
        {itemData.description ? (
          <div className="text-secondary">{itemData.description}</div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default DropdownItem;
