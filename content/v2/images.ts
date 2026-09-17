/**
 * Every photo the v2 pages use. The design exported them with content-hashed filenames,
 * so this gives each one a name the components can read.
 */

const asset = (file: string) => `/v2/${file}`;

export const images = {
  heroVideo: asset("930215efa40428fd9f8d0f63024f2fb6.mp4"),
  heroPoster: asset("00f1ff4407e11b759d4f26d644519daa.jpg"),
  livingCulture: asset("f26bc30518ebd238ece8cf61450c8ebe.jpg"),
  wildlifeEncounters: asset("b40791bd0b77588784c9b501ad5ab76d.jpg"),
  quietMoments: asset("45e72851c404eb37de3c32b346aab1e2.jpg"),
  sacredPlaces: asset("d480fd5463c2a41899b5d4b1dcd83a9b.jpg"),
  scenic: asset("e77a66899f34c2489eb802df5e80cac9.jpg"),
  teaEstate: asset("c5670454fa292ca33ce909311116223f.jpg"),
  wildlifePackage: asset("3276de156e35f2243c312d74076e3b41.jpg"),
  simply: asset("a330488cea582574b523136d4e00efa4.jpg"),
  littleOnes: asset("1260892ee6b033b2f8f08368d097bbc4.jpg"),
  honeymoon: asset("f8a8b4efa2e0ef78b05c873af56b6205.webp"),
  cloudForest: asset("6bbb9c964adcfd7bed8e04ad714c5daa.jpg"),
  southCoast: asset("ef6d2ae748237034bb3ea6e04683759b.jpg"),
  quietStop: asset("49c9ea8f6d4c74abde92d705e38b45e5.jpg"),
  optionalDays: asset("11945aa7861c13c1884485b6e4e5b3b6.jpg"),
  noteFamily: asset("09d95dc68e65357e5e1c3fd7f705b12f.jpg"),
  noteDates: asset("2666b322c67fd187300b1a0855435be6.jpg"),
  ctaBand: asset("0a72b04674868246806c566e0bca4df0.jpg"),
} as const;

/** Shots added by the package design. */
export const packageImages = {
  kandyLake: asset("1b2426204ca1bdc04d91da3ee8fce28b.jpg"),
  sigiriyaStay: asset("fa30d3d8b35015f69c8469c60da9b498.jpg"),
  daveTemple: asset("c1a3908123f2e026248328dafc946572.jpg"),
  tangalle: asset("b83e7495c3eed589bc4f059b7e57dfd3.jpg"),
  galleFort: asset("bbad07df9d6271a6725305a6c5ab4472.jpg"),
  yalaStay: asset("48c054b9508172d1e93e0f76327fcc8a.jpg"),
  northRoad: asset("9706cd80e0a69d9f3a4d07c86cb2bd72.jpg"),
} as const;
