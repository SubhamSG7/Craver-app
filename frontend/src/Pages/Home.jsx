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
        <Slider className="h-[50vh] w-full" />
      </div>
      <div className="w-full h-full flex flex-wrap gap-4 justify-evenly mt-6">
        {allRestaurant?.map((res) => ( 
          <RestaurantWrapper key={res._id} data={res} />
        ))}
      </div>
    </div>
  );
}

export default Home;
