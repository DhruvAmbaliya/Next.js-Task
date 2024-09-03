import style from "./Product.module.css";

const SearchItems = ({ search, setSearch }) => {
  return (
    <form className={style.searchForm} onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search">Search...</label>
      <input
        id="search"
        type="text"
        role="searchbox"
        placeholder="Search Items ...."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchItems;
