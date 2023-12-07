import {Appearance, ColorSchemeName} from 'react-native';
import {createSlice} from '@reduxjs/toolkit';



interface ColorSchemeState {
  darkMode: boolean;
  colorScheme: ColorSchemeName;
}

const initialState: ColorSchemeState = {
  darkMode: Appearance.getColorScheme() === 'dark',
  colorScheme: Appearance.getColorScheme(),
};

const colorSchemeSlice = createSlice({
  name: 'colorScheme',
  initialState,
  reducers: {
    toggleColorScheme: state => {
      state.colorScheme = state.colorScheme === 'dark' ? 'light' : 'dark';
      state.darkMode = !state.darkMode;
    },
  },
});

export const {toggleColorScheme} = colorSchemeSlice.actions;
export default colorSchemeSlice.reducer;
