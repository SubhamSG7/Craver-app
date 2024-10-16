import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { GetCategory } from '../Api/GetCategory';
import PageLoaders from '../Loaders/PageLoaders';
import CategoryWrapper from '../Components/CategoryWrapper';
import Filter from '../Components/Filter';



function Restaurant() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { apiStatus, categories, filteredData } = useSelector(state => state.category);
  const id = location.pathname.split("/")[2];
  
  useEffect(() => {
    dispatch(GetCategory(id));
  }, [dispatch, id]);

  if (apiStatus === "loading") {
    return <PageLoaders />;
  }

  const dataToRender = filteredData && filteredData.length > 0 ? filteredData : categories;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">Restaurant Categories</h1>
      <Filter /> 
      <div className="flex flex-wrap justify-between gap-6">
        {filteredData === "Not Found" ? (
          <div className="w-full text-center text-lg text-gray-500">
            Sorry, no items found.
          </div>
        ) : (
          dataToRender && dataToRender.map((val) => (
            <div key={val?._id} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <CategoryWrapper key={val._id} data={val} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Restaurant;
