import RestaurantCatalog from "@/components/restaurantCatalog";
import { getRestaurants } from "@/libs/apiActions";

export default async function venue(){
    const restaurant = await getRestaurants();
    return(
        <main className="bg-white min-h-screen">
            <RestaurantCatalog RestaurantJson={restaurant}/>
        </main>
    );
}