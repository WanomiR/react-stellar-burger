import styles from "./app.module.css";

import AppHeader from "../header/header";
import BurgerIngredients from "../burger-ingridients/burger-ingredients";

function App() {
    return (
        <div className={styles.app}>
            <AppHeader/>
            <main className={styles.main}>
                <BurgerIngredients/>
            </main>
        </div>
    );
}

export default App;
