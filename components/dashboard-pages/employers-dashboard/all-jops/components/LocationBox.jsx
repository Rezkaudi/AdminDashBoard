
const LocationBox = ({ location, setLocation }) => {

    return (
        <>
            <input
                type="text"
                name="listing-search"
                placeholder="Location Or City"
                value={location}
                onChange={e=>setLocation(e.target.value)}
            />
            <span className="icon flaticon-map-locator"></span>
        </>
    );
};

export default LocationBox;
