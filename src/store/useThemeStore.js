import { create } from 'zustand';

const themes = {
  light: {
    background: '#ffffff',
    text: '#000000',
    primary: '#6200ee',
  },
  dark: {
    background: '#121212',
    text: '#ffffff',
    primary: '#bb86fc',
  },
};

const useThemeStore = create((set) => ({
  mode: 'light', 
  colors: themes.light,
  
  toggleTheme: () => set((state) => {
    // Logic: If current is light, go dark. Otherwise, go light.
    const nextMode = state.mode === 'light' ? 'dark' : 'light';
    return {
      mode: nextMode,
      colors: themes[nextMode],
    };
  }),
}));

export default useThemeStore;