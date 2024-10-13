import { useLoaderData } from "react-router-dom";
import { Slider } from "../Components/Slider";
import RestaurantWrapper from "../Components/RestaurantWrapper";

function Home() {
  const data = useLoaderData();

  return (
    <div className="space-y-12">
      <div>
        <Slider className="h-[50vh] w-full" />
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 px-4 md:px-8">
        {data?.map((res) => (
          <RestaurantWrapper key={res._id} data={res} />
        ))}
      </div>
    </div>
  );
}

export default Home;
