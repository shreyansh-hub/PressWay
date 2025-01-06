import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { LoginPage, SignupPage, ForgotPasswordPage } from "./auth-components";

const Website = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentDate, setCurrentDate] = useState("");
  const [weather, setWeather] = useState("");

  const slides = [
    "Stay updated with the latest news on PressWay",
    "Breaking news from around the world",
    "Your daily dose of current affairs",
    "PressWay: Where stories come to life",
    "Explore, Learn, and Stay Ahead with PressWay",
  ];

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:5000/api/news');
      if (Array.isArray(response.data)) {
        setNewsItems(response.data);
      } else if (response.data.articles) {
        setNewsItems(response.data.articles);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      setError('Failed to fetch news');
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const now = new Date();
    const options = { weekday: "long", month: "short", day: "numeric", year: "numeric" };
    setCurrentDate(now.toLocaleDateString("en-US", options));

    const sliderInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    const newsInterval = setInterval(fetchNews, 300000);

    return () => {
      clearInterval(sliderInterval);
      clearInterval(newsInterval);
    };
  }, []);

  const MainContent = () => {
    if (loading) {
      return <div className="min-h-screen flex items-center justify-center">Loading news...</div>;
    }

    if (error) {
      return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
    }

    return (
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div>
              <p>{currentDate}</p>
              <p>{weather || "Fetching weather..."}</p>
            </div>
            <div className="flex flex-col items-center flex-grow">
              <h1 className="text-3xl font-extrabold font-serif">PressWay</h1>
              <p className="text-lg font-light italic mt-1 font-sans">Stay Informed, Stay Ahead.</p>
            </div>
            <div>
              <Link 
                to="/login"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                target="_blank"
              >
                Login
              </Link>
            </div>
          </div>
        </header>

        {/* Rest of your existing content */}
        {/* Slider */}
        <div className="bg-gray-100 p-8">
          <div className="container mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 relative h-40 flex items-center justify-center">
              <div className="text-2xl text-center transition-opacity duration-500">
                {slides[currentSlide]}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto flex flex-col md:flex-row mt-6 px-4">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-lg mb-6 md:mb-0">
            <h2 className="text-lg font-bold mb-4">[ LATEST NEWS ]</h2>
            <ul className="space-y-4">
              {newsItems.slice(0, 5).map((news, index) => (
                <li key={index} className="border-b pb-2">
                  <h3 className="text-blue-600 font-semibold">{news.source?.name || 'News Source'}</h3>
                  <p className="text-gray-700">{news.title}</p>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main Content Area */}
          <main className="flex-grow bg-white p-6 md:ml-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">[ TOP NEWS ]</h2>
            {newsItems.slice(5, 10).map((news, index) => (
              <article key={index} className="bg-gray-50 p-4 rounded-lg shadow mb-4">
                <h3 className="text-2xl font-bold my-2">{news.title}</h3>
                <p>{news.description || 'No description available'}</p>
                {news.url && (
                  <a 
                    href={news.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline mt-2 inline-block"
                  >
                    Read more
                  </a>
                )}
              </article>
            ))}
          </main>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-6 mt-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">About Us</h3>
                <p className="text-gray-300">
                  PressWay is your trusted source for the latest news and updates.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>Contact Us</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Contact Info</h3>
                <p className="text-gray-300">Email: info@example.com</p>
                <p className="text-gray-300">Phone: +1 123 456 7890</p>
              </div>
            </div>
            <div className="mt-8 text-center text-gray-300">
              <p>&copy; {new Date().getFullYear()} PressWay. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/" element={<MainContent />} />
      </Routes>
    </Router>
  );
};

export default Website;
