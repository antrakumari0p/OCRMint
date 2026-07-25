import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/layout";
import { Home } from "@/pages/Home";

function App() {
  return (
    <>
      <Header />
      <Home />
      <Analytics />
    </>
  );
}

export default App;
