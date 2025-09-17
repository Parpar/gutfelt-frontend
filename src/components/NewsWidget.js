import React, { useState, useEffect } from 'react';

function NewsWidget() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://gutfelt-backend.onrender.com/api/news');
        const data = await response.json();
        setNewsArticles(data);
      } catch (error) {
        console.error("Kunne ikke hente nyheder:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="widget">
      <h2>Seneste Nyt</h2>
      <div className="widget-content">
        {isLoading ? (
          <p>Henter nyheder...</p>
        ) : (
          newsArticles.length > 0 ? (
            newsArticles.map((article, index) => (
              <div key={index} className="news-item">
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
              </div>
            ))
          ) : (
             <p>Der er ingen nyheder at vise.</p>
          )
        )}
      </div>
    </div>
  );
}

export default NewsWidget;