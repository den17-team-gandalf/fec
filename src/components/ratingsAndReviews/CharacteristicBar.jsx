import React from 'react';
import propTypes from 'prop-types';

const characteristicMeanings = {
  Size: ['Too small', 'Too Large'],
  Width: ['Too narrow', 'Too wide'],
  Comfort: ['Uncomfortable', 'Perfect'],
  Quality: ['Poor', 'Perfect'],
  Length: ['Runs Short', 'Runs Long'],
  Fit: ['Runs tight', 'Runs long'],
};

export default function CharacteristicBar({ characteristic, rating }) {
  console.log(rating, String((rating / 5) * 27.5));
  return (
    <div className="CharacteristicBar">
      <div className="CharBarTitle">
        <img
          className="CharacteristicIcon"
          src="https://cdn0.iconfinder.com/data/icons/famous-character-vol-2-colored/48/JD-41-512.png"
          alt="gandalf"
          style={{
            width: '30px',
            position: 'absolute',
            paddingLeft: `${String((rating / 5) * 27.5)}%`,
          }}
        />
        {characteristic}
        <hr />
      </div>
      <div className="CharacteristicDescriptionPoor">
        {characteristicMeanings[characteristic][0]}
      </div>
      <div className="CharacteristicDescriptionGreat">
        {characteristicMeanings[characteristic][1]}
      </div>
    </div>
  );
}

CharacteristicBar.propTypes = {
  characteristic: propTypes.string.isRequired,
  rating: propTypes.number.isRequired,
};
