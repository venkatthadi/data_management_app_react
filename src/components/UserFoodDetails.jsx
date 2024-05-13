import propTypes from 'prop-types';

export default function FoodDetails({ food }) {
    return (
        <li>
            <b>Name: </b>
            <span>{food.name}</span>
            <br/>
            <b>Course: </b>
            <span>{food.course}</span>
            <br/>
        </li>
    );
}

FoodDetails.propTypes = {
    food: propTypes.shape({
        id: propTypes.number.isRequired,
        name: propTypes.string.isRequired,
        course: propTypes.string.isRequired,
    })
}