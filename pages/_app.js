import "../styles/globals.css";

import { NotesProvider } from "../utils/notesContext";
import { ThemeContextProvider } from "../utils/themeContext";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <NotesProvider>
        <Component {...pageProps} />
      </NotesProvider>
    </ThemeContextProvider>
  );
}

export default MyApp;
