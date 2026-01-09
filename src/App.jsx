import MainBody from "./Components/MainBody";
import Navbar from "./Components/Navbar";

const App = () => {
  return (
    <div className="lg:container mx-auto px-4 sm:px-8">
      <Navbar />
      <MainBody />
    </div>
  );
};

export default App;
