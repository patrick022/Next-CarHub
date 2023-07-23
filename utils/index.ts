import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel, transmissionType } = filters;

  const headers = {
    "X-RapidAPI-Key": "dbbb0de24amshf576060ea3069ecp17f938jsnb53a48e6583d",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const url = new URL("https://cars-by-api-ninjas.p.rapidapi.com/v1/cars");

  url.searchParams.append("make", manufacturer);
  url.searchParams.append("year", `${year}`);
  url.searchParams.append("model", model);
  url.searchParams.append("limit", `${limit}`);
  url.searchParams.append("fuel_type", fuel);
  url.searchParams.append("transmission", transmissionType);

  //Manual url parameters approach
  // const response = await fetch(
  //   `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
  //   { headers: headers }
  // );

  const response = await fetch(`${url}`, { headers: headers });

  const result = await response.json();

  //Formats the result for display. e.g. transmission = 'a' then 'Automatic'
  const format = result.map((response: CarProps) => {
    if (response.transmission === "a") {
      return { ...response, transmission: "Automatic" };
    } else {
      return { ...response, transmission: "Manual" };
    }
  });

  return format;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");

  const { make, year, model } = car;

  url.searchParams.append("customer", "hrjavascript-mastery");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathName;
};
