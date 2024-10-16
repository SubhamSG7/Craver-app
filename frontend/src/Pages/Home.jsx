import { Slider } from "../Components/Slider";
import RestaurantWrapper from "../Components/RestaurantWrapper";
import GetLocation from "../Components/GetLocation";
import { useSelector } from "react-redux";

function Home() {
  const { allRestaurant } = useSelector((state) => state.restaurant);

  return (
    <div className="space-y-12">
      <div>
        <GetLocation />
        <Slider className="h-[50vh] w-full" />
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 px-4 md:px-8">
        {allRestaurant?.map((res) => (
          <RestaurantWrapper key={res._id} data={res} />
        ))}
      </div>
    </div>
  );
}

export default Home;
