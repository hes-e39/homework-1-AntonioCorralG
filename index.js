import fetch from "node-fetch";
// Recommend using node-fetch for those familiar with JS fetch

const COLORS = "https://nt-cdn.s3.amazonaws.com/colors.json";

/**
 * @param name filter for color name
 * @param hex filter for color hex code
 * @param compName filter for complementary color name
 * @param compHex filter for complementary color hex code
 * @returns Promise
 */

const fetchColors = ({ name, hex, compName, compHex }) => {
  //empty array to hold the output
  let arr = [];
  //fetching colors
  return (
    fetch(COLORS)
      //converting to json for manipulation
      .then((res) => res.json())
      //then to map out the response
      .then((res) => {
        //if to check the color name includes the name param
        res.map((colorObj) => {
          if (
            name &&
            colorObj.name.toLowerCase().includes(name.toLowerCase())
          ) {
            //pushing the matching colorObj to the array
            arr.push(colorObj);
            // to check if hex includes the hex param
          } else if (
            hex &&
            colorObj.hex.toLowerCase().includes(hex.toLowerCase())
          ) {
            //pushing the matching colorObj to the array

            arr.push(colorObj);
            //check if this is compName or compHex to go into the inner loop
          } else if (compName || compHex) {
            //mapping within the comp object to the same as above
            colorObj.comp.map((compObj) => {
              if (
                compName &&
                compObj.name.toLowerCase().includes(compName.toLowerCase())
              ) {
                arr.push(colorObj);
              } else if (
                compHex &&
                compObj.hex.toLowerCase().includes(compHex.toLowerCase())
              ) {
                arr.push(colorObj);
              }
            });
          }
        });
        //return the array
        return arr;
      })
  );
};

// Leave this here
export default fetchColors;
