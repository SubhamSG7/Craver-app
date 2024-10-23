import { Slider } from "../Components/Slider";
import RestaurantWrapper from "../Components/RestaurantWrapper";
import GetLocation from "../Components/GetLocation";
import { useSelector } from "react-redux";

function Home() {
  const { allRestaurant } = useSelector((state) => state.restaurant);

  return (
    <div className="w-[100vw] ">
      <div>
        <GetLocation />
        <Slider className="h-[50vh] w-[100vw]" />
      </div>
      <div className="w-screen flex flex-wrap gap-2 justify-evenly mt-6">
        {allRestaurant?.map((res) => ( 
          <RestaurantWrapper key={res._id} data={res} />
        ))}
      </div>
    </div>
  );
}

export default Home;
