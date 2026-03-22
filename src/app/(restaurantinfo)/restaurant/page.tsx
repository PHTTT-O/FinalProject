import RestaurantCatalog from "@/components/restaurantCatalog";
import { getRestaurants } from "@/libs/apiActions";

export default async function venue(){
    const restaurant = await getRestaurants();
    return(
        <main>
            <RestaurantCatalog RestaurantJson={restaurant}/>
        </main>
    );
}