import { Platform } from "react-native";

const BACKGROUND_PRIMARY = '#24292e';
const BACKGROUND_SECONDARY = '#e1e4e8'
const PRIMARY = '#0366d6';
const PRIMARY_DARK = '#032f62';
const DANGER = '#d73a4a';

const theme = {
    colors: {
        textPrimary: '#ffffff',
        textSecondary: '#586069',
        backgroundPrimary: BACKGROUND_PRIMARY,
        backgroundSecondary: BACKGROUND_SECONDARY,
        primary: PRIMARY,
        primaryDark: PRIMARY_DARK,
        danger: DANGER,
        transparent: 'rgba(0, 0, 0, 0)',
    },
    fontSizes: {
        body: 14,
        subheading: 16,
        heading: 20,
    },
    fonts: {
        main: Platform.select({
            android: 'Roboto',
            ios: 'Arial',
            default: 'System',
        }),
    },
    fontWeights: {
        normal: '400',
        bold: '700',
    },
};
  
export default theme;