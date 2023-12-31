import styles from "./app.module.css";

import AppHeader from "../header/header";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {

    return (<div className={styles.app}>
            <AppHeader/>
            <main className={styles.main}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </main>
        </div>);
}

export default App;