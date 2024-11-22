import { Slider } from "../Components/Slider";
import RestaurantWrapper from "../Components/RestaurantWrapper";
import GetLocation from "../Components/GetLocation";
import { useSelector } from "react-redux";

function Home() {
  const { allRestaurant } = useSelector((state) => state.restaurant);

  return (
    <div className="w-full  px-10 py-10">
      <div>
        <GetLocation />
        <Slider />
      </div>
      <div className="w-full h-full flex flex-wrap gap-4 mt-6 justify-between">
        {allRestaurant.length === 0 ? (
          <div className="flex flex-col w-full items-center content-center">
            <h3 className="text-red-500">Sorry , No result found...</h3>
            <p>No restaurants deliver to your current location at this time</p>
          </div>
        ) : (
          allRestaurant?.map((res) => (
            <RestaurantWrapper key={res._id} data={res} />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
