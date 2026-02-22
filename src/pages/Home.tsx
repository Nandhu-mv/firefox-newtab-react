// import bgimage from '../assets/images/bg1.jpg';
import firefoxLogo from '../assets/images/FF.png';
import googleLogo from '../assets/images/search.png';
import '../App.css';
import SideSheet from '../components/SideSheet';
import AddShortcuts from '../components/AddShortcuts';
import NewsGrid from '@/components/Newsgrid';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

interface News {
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  author?: string;
}

type Shortcut = {
  logo: string;
  name: string;
  url: string;
};

function Home() {
  const [news, setnews] = useState<News[]>([]);

  const [filtredNews, setFilterNews] = useState<News[]>([]);

  const [filter, setFilter] = useState<string>('');

  const [scrolled, setscrolled] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [background, setBackground] = useState('');
  const [showStories, setShowStories] = useState(false);
  const [showShorts, setShowShorts] = useState(true);
  const [rows, setRows] = useState<'1' | '2' | '3'>('1');

  //loading Shortcuts

  const [shortcuts, setShortcuts] = useState<Shortcut[]>(() => {
    const saved = localStorage.getItem('shortcuts');
    return saved ? (JSON.parse(saved) as Shortcut[]) : [];
  });

  //saving shortcuts

  useEffect(() => {
    localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
  }, [shortcuts]);

  //removing shortcuts

  const removeShortcut = (url: string) => {
    setShortcuts((prev) => prev.filter((s) => s.url !== url));
  };

  //  function to add images to shortcuts

  const addshortcut = (name: string, url: string) => {
    const domain = new URL(url).hostname;

    setShortcuts((prev) => [
      ...prev,
      {
        name,
        url,
        logo: `https://www.google.com/s2/favicons?sz=64&domain=${domain}`,
      },
    ]);
  };

  //   checking scroll

  useEffect(() => {
    const el = scrollRef.current;

    const handleScroll = () => {
      if (el && el.scrollTop > 20) {
        setscrolled(true);
      } else {
        setscrolled(false);
      }
    };

    el?.addEventListener('scroll', handleScroll);

    return () => el?.removeEventListener('scroll', handleScroll);
  }, []);

  //  api fetching
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/top-headlines',
          {
            params: {
              country: 'us',
              apiKey: import.meta.env.VITE_NEWS_API_KEY,
            },
          }
        );
        setnews(response.data.articles);
        setFilterNews(response.data.articles);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNews();
  }, [showStories]);

  // printing api
  // useEffect(() => {
  //   console.log(news);
  // }, [news]);

  //   console.log(import.meta.env.VITE_NEWS_API_KEY);
  //   console.log(background);

  return (
    <div id="fullcontainer" className=" overflow-hidden">
      <div
        ref={scrollRef}
        className="w-full h-full overflow-scroll bg-cover bg-center fixed flex justify-center p-10"
        style={{ backgroundImage: `url(${background})` }}
      >
        <main
          className={`w-full max-w-7xl h-full flex flex-col items-center ${showStories ? '' : 'justify-center'} `}
        >
          <div
            id="logo-firefox"
            className={`text-white z-8 flex items-center gap-3 left-12 ${scrolled ? 'hidden' : 'block'} ${showStories ? 'absolute' : ''}`}
          >
            <img src={firefoxLogo} alt="Firefox logo" className="w-14 h-14" />
            <span className="text-3xl font-bold hidden [@media(min-width:1170px)]:block cursor-default">
              Firefox
            </span>
          </div>

          {/* search bar */}
          <div
            className={`fixed w-screen h-25 top-0 bg-[#42414D]/70 border-b border-b-gray-500 ${scrolled ? 'block' : 'hidden'}`}
          ></div>
          <div
            id="search-holder"
            className={` [@media(min-width:1000px)]:w-full sm:w-100 z-10  max-w-180 mt-4 flex items-center bg-[#42414D] rounded-md px-3
            ${scrolled ? 'fixed top-0 z-50' : ''}`}
          >
            <img src={googleLogo} alt="Google" className="w-5 h-5 mr-3" />

            <input
              className="bg-transparent text-white h-13 w-full outline-none"
              type="search"
              placeholder="Search News Stories..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const result = news.filter((n) =>
                    n.title.toLowerCase().includes(filter.toLowerCase())
                  );
                  setFilterNews(result);
                  //   console.log(result);
                }
              }}
            />
          </div>

          {/* shortcut icons  */}
          {showShorts && (
            <div
              id="shortcutscontainer"
              className="grid lg:grid-cols-8 grid-flow-row md:grid-cols-6 sm:grid-cols-3 grid-cols-3 mb-4 mt-16 "
            >
              {shortcuts.map((i, index) => (
                <div key={index}>
                  <button
                    className="absolute flex text-white/60 justify-center items-center  p-1.5 font-bold hover:bg-gray-700/80 rounded-sm"
                    onClick={() => removeShortcut(i.url)}
                  >
                    x
                  </button>
                  <div
                    key={i.name}
                    onClick={() => {
                      window.open(i.url, '_blank');
                    }}
                    className="hover:bg-white/20 cursor-pointer bg-none rounded-xl w-28 pb-3 h-30 flex flex-col justify-center items-center"
                  >
                    <div className="bg-[#42414D]/80 shadow-gray-900 shadow-sm flex flex-col justify-center items-center  text-white w-16 h-16 rounded-2xl">
                      <img
                        className="w-9 rounded-md "
                        src={i.logo}
                        alt="logo"
                      />
                    </div>
                    <p className="text-center text-white">{i.name}</p>
                  </div>
                </div>
              ))}
              <AddShortcuts onAddShortcut={addshortcut} />
            </div>
          )}

          {/* news grid section */}

          <NewsGrid
            showStories={showStories}
            filtredNews={filtredNews}
            news={news}
          />

          {/* sidebar */}
          <SideSheet
            showStories={showStories}
            setShowStories={setShowStories}
            showShorts={showShorts}
            setShowShorts={setShowShorts}
            rows={rows}
            setRows={setRows}
            setBackground={setBackground}
            background={background}
          />
        </main>
      </div>
    </div>
  );
}

export default Home;
