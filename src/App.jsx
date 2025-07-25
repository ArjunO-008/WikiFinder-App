import "./App.css";
import ParticleBackground from "./utils/ParticleBackground";
import { SearchLayout } from "./layouts/Layouts";

function App() {
  return (
    <>
      <ParticleBackground id="particles" />
      <SearchLayout />
    </>
  );
}

export default App;
