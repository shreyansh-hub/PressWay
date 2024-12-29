import React, { useState, useEffect } from 'react';

const Website = () => {
  // State for slider
  const [currentSlide, setCurrentSlide] = useState(0);

  // State for date and weather
  const [currentDate, setCurrentDate] = useState('');
  const [weather, setWeather] = useState('');

  // Slider content
  const slides = [
    {
      headline: 'World Bank forecasts global economy slowdown',
      category: 'Economy',
      url: '/news/global-economy',
    },
    {
      headline: 'James Webb Telescope captures new exoplanet images',
      category: 'Science',
      url: '/news/james-webb-exoplanet',
    },
    {
      headline: 'Tesla launches fully autonomous vehicles in 2024',
      category: 'Technology',
      url: '/news/tesla-autonomous-cars',
    },
  ];

  // Latest News content
  const latestNews = [
    {
      category: 'Entertainment',
      headline: 'Oscars 2024: Key highlights from the ceremony',
      description: 'Memorable moments from the star-studded event...',
      published: '30 mins ago',
    },
    {
      category: 'Sports',
      headline: 'India wins Cricket World Cup after thrilling final',
      description: 'Victory celebrated across the nation...',
      published: '1 hour ago',
    },
    {
      category: 'Politics',
      headline: 'UN Security Council passes new climate resolution',
      description: 'Resolution focuses on renewable energy goals...',
      published: '2 hours ago',
    },
  ];

  // Top News content
  const topNews = [
    {
      category: 'Health',
      headline: 'New study links Mediterranean diet to longevity',
      description: 'Researchers discover benefits of plant-based foods.',
      image: 'https://via.placeholder.com/800x400',
      updated: '5 mins ago',
    },
    {
      category: 'World News',
      headline: 'Protests erupt in major cities over labor rights',
      description: 'Workers demand higher wages and better conditions.',
      image: 'https://via.placeholder.com/800x400',
      updated: '10 mins ago',
    },
    {
      category: 'Environment',
      headline: 'Arctic ice levels reach record lows in December',
      description: 'Global warming accelerates polar ice melt.',
      image: 'https://via.placeholder.com/800x400',
      updated: '15 mins ago',
    },
  ];

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Slide duration increased to 5 seconds
    return () => clearInterval(timer);
  }, [slides.length]);

  // Fetch current date
  useEffect(() => {
    const now = new Date();
    const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options));
  }, []);

  // Fetch weather (Example: Using OpenWeather API)
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeather API key
        const city = 'New York'; // Replace with your desired city
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const temp = Math.round(data.main.temp);
        const description = data.weather[0].description;
        setWeather(`${temp}°C, ${description}`);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setWeather('Weather data unavailable');
      }
    };

    fetchWeather();

    // Update weather every 10 minutes
    const interval = setInterval(fetchWeather, 600000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left: Date and Weather */}
          <div>
            <p>{currentDate}</p>
            <p>{weather}</p>
          </div>

          {/* Center: PressWay */}
          <div className="flex flex-col items-center flex-grow">
            <h1 className="text-3xl font-extrabold font-serif">PressWay</h1>
            <p className="text-lg font-light italic mt-1 font-sans">Stay Informed, Stay Ahead.</p>
          </div>

          {/* Right: Navigation */}
          <nav>
            <ul className="flex space-x-6">
              {['Home', 'About', 'Services', 'Contact'].map((item, index) => (
                <li key={index}>
                  <button className="hover:text-blue-200 transition-colors">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Slider */}
      <div className="bg-gray-100 p-8">
        <div className="container mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 relative h-40 flex flex-col justify-center items-center">
            <div className="text-center">
              <span className="text-sm text-gray-500">{slides[currentSlide].category}</span>
              <a
                href={slides[currentSlide].url}
                className="block text-2xl font-bold text-blue-600 hover:underline mt-2"
              >
                {slides[currentSlide].headline}
              </a>
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto flex mt-6">
          {/* Sidebar */}
          <aside className="w-1/4 bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">[ LATEST NEWS ]</h2>
            <ul className="space-y-4">
              {latestNews.map((news, index) => (
                <li key={index}>
                  <h3 className="text-blue-600 font-semibold">{news.category}</h3>
                  <p className="text-gray-700">{news.headline}</p>
                  <span className="text-gray-500 text-sm">{news.published}</span>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main Content Area */}
          <main className="flex-grow bg-white p-6 ml-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">[ TOP NEWS ]</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topNews.map((news, index) => (
                <article
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-blue-600 font-bold mb-2">{news.category}</h3>
                  <img
                    src={news.image}
                    alt={news.headline}
                    className="w-full h-48 rounded-lg object-cover mb-4"
                  />
                  <a
                    href="#"
                    className="block text-lg font-semibold text-gray-800 hover:underline"
                  >
                    {news.headline}
                  </a>
                  <p className="text-gray-600 text-sm mt-2">{news.description}</p>
                  <span className="text-gray-500 text-sm">{news.updated}</span>
                </article>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 PressWay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Website;
