import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";
import css from "./SearchBox.module.css";

export default function SearchBox() {
  const filter = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    const action = changeFilter(evt.target.value);
    dispatch(action);
  };
  return (
    <div className={css.divSearch}>
      <p>Search by name</p>
      <input
        type="text"
        value={filter}
        onChange={handleChange}
        className={css.inputSearch}
      />
    </div>
  );
}
