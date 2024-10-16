import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilterMenu, filterMenu, setFilterMenu, setList } from '../Slices/categorySlice';

function Filter() {
  const { categories, categoryList, cuisineList,filteroptions } = useSelector(state => state.category);
  const dispatch = useDispatch();
  function handleSearch(e){
    e.preventDefault()
    dispatch(filterMenu())
    dispatch(clearFilterMenu())
  }
  useEffect(() => {
    if (categories) {
      dispatch(setList()); 
    }
  }, [categories, dispatch]);

  return (
    <form className="flex items-center space-x-4 p-4 bg-white shadow-md rounded-lg mb-3">
      <input
        type="text"
        required
        name="search"
        placeholder="Search by name..."
        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={filteroptions.search || ""}
        onChange={(e)=>dispatch(setFilterMenu({name:e.target.name,value:e.target.value}))}
      />
      <select
        
        className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2"
        required
        name='category'
        onChange={(e)=>dispatch(setFilterMenu({name:e.target.name,value:e.target.value}))}
        value={filteroptions.category || ""}
      >
        <option value="" disabled>Select category</option>
        {categoryList?.map((val, index) => (
          <option value={val} key={index}>
            {val}
          </option>
        ))}
      </select>
      <select
        className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2"
        required
        name='cuisine'
        value={filteroptions.cuisine || ""}
        onChange={(e)=>dispatch(setFilterMenu({name:e.target.name,value:e.target.value}))}
      >
        <option value="" disabled>Select cuisine</option>
        {cuisineList?.map((val, index) => (
          <option value={val} key={index}>
            {val}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleSearch}
      >
        Search
      </button>
    </form>
  );
}

export default Filter;
