declare module "colorthief";

type Color = [number, number, number];

type ColorThief = {
  getColor: (img: HTMLImageElement, quality?: number) => Color;
  getPalette: (
    img: HTMLImageElement,
    quality?: number,
    colorCount?: number
  ) => Color[];
};
