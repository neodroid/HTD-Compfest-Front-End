import { Global } from '@emotion/react';
const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Heading Font Name';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('./fonts/headingfont.woff2') format('woff2'), url('./fonts/headingfont.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* inter-regular - latin */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  src: url('./fonts/inter-v3-latin-regular.eot'); /* IE9 Compat Modes */
  src: local(''),
       url('./fonts/inter-v3-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('./fonts/inter-v3-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
       url('./fonts/inter-v3-latin-regular.woff') format('woff'), /* Modern Browsers */
       url('./fonts/inter-v3-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
       url('./fonts/inter-v3-latin-regular.svg#Inter') format('svg'); /* Legacy iOS */
}
      `}
  />
);
export default Fonts;
