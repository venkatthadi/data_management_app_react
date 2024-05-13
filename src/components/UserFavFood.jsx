import propTypes from 'prop-types'
import FoodDetails from './UserFoodDetails';

export default function UserFavFood() {
    // console.log(props)
    const mockFoods = [
        {
            "id": 1,
            "name": "biryani",
            "course": "main",
        },
        {
            "id": 2,
            "name": "ice-cream",
            "course": "dessert",
        },
    ]

    return(
        <ul>
            {mockFoods.map(
                (food) => {
                    return (
                        <FoodDetails key={food.id} food={food}/>
                    );
                }
            )}
        </ul>
    )
}
