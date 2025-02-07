import { createContext, useContext, useState } from "react";

const Themecontext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('chiaro')
    const toggleTheme = () => {
        setTheme((statoAttuale) => {
            if (statoAttuale === 'chiaro') {
                return 'scuro'
            } else {
                return 'chiaro'
            }
        });
    };
    return (
        <Themecontext.Provider value={{ theme, toggleTheme }}>
            {children}
        </Themecontext.Provider>
    );
}

export const useTheme = () => useContext(Themecontext);

export default ThemeProvider;