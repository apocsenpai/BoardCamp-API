import dayjs from "dayjs";

function calculateDelayFee(returnDate, rentDate, daysRented, originalPrice) {
  const pricePerDay = originalPrice / daysRented;
  const daysPassedBetweenRentAndReturnDates = dayjs(returnDate).diff(
    rentDate,
    "day"
  );

  return daysPassedBetweenRentAndReturnDates > daysRented
    ? pricePerDay * (daysPassedBetweenRentAndReturnDates - daysRented)
    : null;
}

export default calculateDelayFee;
