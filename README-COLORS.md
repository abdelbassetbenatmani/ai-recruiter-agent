# Using Custom Colors with Tailwind CSS

## Overview

This project has been configured to use custom colors defined in `globals.css` as Tailwind CSS classes. The custom colors are available as Tailwind utility classes for backgrounds, text colors, borders, and more.

## Available Custom Colors

The following custom colors are available:

### Greens

- `GREEN_50`: hsl(83, 100%, 50%)
- `GREEN_60`: hsl(83, 100%, 60%)
- `GREEN_70`: hsl(83, 100%, 70%)
- `GREEN_80`: hsl(83, 100%, 80%)
- `GREEN_90`: hsl(83, 100%, 90%)
- `GREEN_95`: hsl(82, 100%, 95%)
- `GREEN_97`: hsl(83, 100%, 97%)
- `GREEN_99`: hsl(84, 100%, 99%)

### Greys

- `GREY_10`: hsl(0, 0%, 10%)
- `GREY_15`: hsl(0, 0%, 15%)
- `GREY_20`: hsl(0, 0%, 20%)
- `GREY_30`: hsl(240, 1%, 30%)
- `GREY_35`: hsl(240, 1%, 35%)
- `GREY_40`: hsl(240, 1%, 40%)
- `GREY_60`: hsl(240, 1%, 60%)
- `GREY_90`: hsl(0, 0%, 90%)

### Absolute Colors

- `ABSOLUTE_WHITE`: hsl(0, 0%, 100%)
- `ABSOLUTE_BLACK`: hsl(0, 0%, 0%)

## How to Use

You can use these colors with any Tailwind utility that accepts a color:

```jsx
// Background color
<div className="bg-GREEN_70">Green background</div>

// Text color
<p className="text-GREY_30">Grey text</p>

// Border color
<div className="border border-GREEN_90">Box with green border</div>

// Hover states
<button className="bg-GREEN_60 hover:bg-GREEN_50">Hover me</button>
```

## Implementation Details

The custom colors are defined in `globals.css` and made available to Tailwind through the `tailwind.config.js` file, which extends the theme with these colors.

### tailwind.config.js

```js
module.exports = {
  // ... other config
  theme: {
    extend: {
      colors: {
        ABSOLUTE_WHITE: "hsl(0, 0%, 100%)",
        ABSOLUTE_BLACK: "hsl(0, 0%, 0%)",
        GREEN_50: "hsl(83, 100%, 50%)",
        // ... other colors
      },
    },
  },
};
```

## Example Components

Check out the `ColorCard` and `ColorPalette` components in `components/ui/color-card.tsx` for examples of how to use these custom colors in your components.

The home page (`app/page.tsx`) also demonstrates the use of these custom colors in a layout.
