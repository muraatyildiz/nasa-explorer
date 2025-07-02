import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Apod from "./pages/Apod";
import Mars from "./pages/Mars";
import ErrorPage from "./pages/ErrorPage";
import Starfield from "./components/Starfield";
import { useDispatch, useSelector } from "react-redux";
import { fetchApodAndAiAnalysis} from "./store/slices/apodSlice";

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const dispatch = useDispatch();

  const { apod, aiAnalysis, loading } = useSelector((state) => state.apod);

  useEffect(() => {
    dispatch(fetchApodAndAiAnalysis(selectedDate));
  }, [selectedDate, dispatch]);

  const fallbackColors = ["#ffffff", "#aaaaaa", "#888888"];

  const safeColors = aiAnalysis?.colors?.some(
    (color) => color.toLowerCase() !== "#000000"
  )
    ? aiAnalysis.colors
    : fallbackColors;

  return (
    <Router>
      <Starfield backgroundColor="#000000" starColors={safeColors} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Apod
                apod={apod}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                loading={loading}
              />
            }
          />
          <Route path="/mars" element={<Mars />} />
           <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
