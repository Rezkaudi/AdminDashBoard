const SearchBox = ({ title, setTitle }) => {
    return (
        <>
            <input
                type="text"
                name="listing-search"
                placeholder="Job title"
                value={title}
                onChange={e=>setTitle(e.target.value)}
            />
            <span className="icon flaticon-search-3"></span>
        </>
    );
};

export default SearchBox;
