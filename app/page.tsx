"use client";

import { useEffect, useState } from "react";

import { CustomFilter, Hero, SearchBar, CarCard, ShowMore } from "@/components";
import { fuels, yearsOfProduction, transmission } from "@/constants";
import { fetchCars } from "@/utils";
import Image from "next/image";
import { CarState } from "@/types";

export default function Home() {
  const [allCars, setAllCars] = useState<CarState>([]);
  const [loading, setLoading] = useState(false);

  //search states
  const [manufacturer, setManuFacturer] = useState("");
  const [model, setModel] = useState("");

  //filter states
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2022);
  const [transmissionType, setTransmissionType] = useState("");

  //pagination states
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    setLoading(true);

    try {
      const result = await fetchCars({
        manufacturer: manufacturer.toLowerCase() || "",
        year: year || 2023,
        fuel: fuel.toLowerCase() || "",
        limit: limit || 10,
        model: model || "",
        transmissionType: transmissionType.toLowerCase() || "",
      });

      setAllCars(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(fuel, transmissionType, year, limit, manufacturer, model);

    getCars();
  }, [fuel, year, limit, manufacturer, model, transmissionType]);

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar setManuFacturer={setManuFacturer} setModel={setModel} />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter
              title="transmission"
              options={transmission}
              setFilter={setTransmissionType}
            />
            <CustomFilter
              title="year"
              options={yearsOfProduction}
              setFilter={setYear}
            />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            {loading && (
              <div className="mt-16 w-full flex-center">
                <Image
                  src="/loader.svg"
                  alt="loader"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            )}
            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">OOPS , NO RESULTS</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
