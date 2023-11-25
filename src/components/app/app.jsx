import styles from "./app.module.css";
import {data} from "../../utils/data";

function App() {
    return (
        <div className={styles.app}>
      <pre style={{
          margin: "auto",
          fontSize: "1.5rem"
      }}>
      	Измените src/components/app/app.jsx и сохраните для обновления.
          <br/>New line of text.
      </pre>
        </div>
    );
}

export default App;
