import { colorize, getTextColorForName, hexToRgb } from "./commonFunctions";

interface nameAndColor {
  name: string,
  color: string,
}

test("test text color", () => {
  const namesAndColors: nameAndColor[] = [];
  namesAndColors.push({name: "Eka", color: "white"});
  namesAndColors.push({name: "Toka", color: "black"});
  namesAndColors.push({name: "Vika", color: "black"});

  namesAndColors.forEach(testObj => {
    const nameColorAsRGB = hexToRgb(colorize(testObj.name));
    expect(nameColorAsRGB).not.toBeNull();
    const color = getTextColorForName(nameColorAsRGB);
    expect(color).toBe(testObj.color);
  });
});
