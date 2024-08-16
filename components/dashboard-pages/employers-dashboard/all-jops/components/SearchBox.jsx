import { useDispatch,useSelector } from "react-redux";
import { handleChangeFilters } from "@/mainData/jops/jopsSlice";

const SearchBox = () => {

    const { filterByTitle } = useSelector((state) => state.jops)
    const dispatch = useDispatch()


    return (
        <>
            <input
                type="text"
                name="listing-search"
                placeholder="Job title"
                value={filterByTitle}
                onChange={e => dispatch(handleChangeFilters({ title: e.target.value }))}
            />
            <span className="icon flaticon-search-3"></span>
        </>
    );
};

export default SearchBox;
