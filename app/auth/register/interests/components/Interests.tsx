"use client";
type Props = {};
import { useEffect, useState } from "react";
import CustomInterestsModal from "./CustomInterestsModal";

function Interests({}: Props) {
  const [interests, setInterests] = useState<string[]>([
    "Knitting",
    "Urban Gardening",
    "Astronomy",
    "Mixology (Cocktail Making)",
    "Calligraphy",
    "Historical Reenactment",
    "Birdwatching",
    "Origami",
    "Astrophotography",
    "Vintage Cars",
    "Stand-up Comedy",
    "DIY Home Improvement",
    "Archery",
    "Podcasting",
    "Marine Biology",
    "Beekeeping",
    "Creative Writing",
    "Mountain Climbing",
    "Feng Shui",
    "Paragliding",
    "Puzzle Solving",
    "Interior Design",
    "Urban Exploration (Urbex)",
    "DIY Electronics",
    "Model Building (Planes, Trains, etc.)",
    "Kite Surfing",
    "Pottery",
    "Ghost Hunting",
    "Woodworking",
    "Magic Tricks",
    "Rock Climbing",
    "Genealogy",
    "Wine Tasting",
    "Quilting",
    "Scuba Diving",
    "Astronomy",
    "Hiking",
    "Salsa Dancing",
    "Geocaching",
    "Soap Making",
    "Parkour",
    "Historical Architecture",
    "Foraging",
    "Movie Trivia",
    "Juggling",
    "Tai Chi",
    "Urban Farming",
    "Cross-stitching",
    "Ice Skating",
    "Knifemaking",
  ]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const handleInterests = function (interest: string) {
    const data: string = interest.replaceAll(" ", "").toLowerCase();
    if (selectedInterests.includes(data)) {
      setSelectedInterests((prev) =>
        prev.filter((item) => item.replaceAll(" ", "").toLowerCase() !== data)
      );
    } else {
      setSelectedInterests((prev) => [...prev, data]);
    }
  };
  useEffect(() => {
    console.log(selectedInterests);
  }, [selectedInterests]);
  return (
    <>
      <div className="flex flex-row w-full flex-wrap gap-2 mt-2">
        {interests.map((interest, index) => {
          return (
            <div
              key={index}
              className="flex flex-row items-center justify-center gap-2 py-1 px-2 bg-base-100 rounded-full border-2 border-gray-500/40"
            >
              <input
                type="checkbox"
                id={interest}
                className="checkbox checkbox-accent"
                value={interest}
                onChange={(e) => handleInterests(e.currentTarget.value)}
              />
              <label htmlFor={interest}>{interest}</label>
            </div>
          );
        })}
      </div>
      <CustomInterestsModal setInterests={setInterests} />
    </>
  );
}

export default Interests;
