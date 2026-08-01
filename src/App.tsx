import { Route, Routes } from "react-router-dom";
import { Header } from "@/components/layout";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
