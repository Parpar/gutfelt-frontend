import React from 'react';
const newsArticles = [ { id: 1, title: "Ny strategisk partner inden for IT-sikkerhed", summary: "Vi er glade for at kunne byde velkommen til..." }, { id: 2, title: "Sommerfest 2025: Sæt kryds i kalenderen!", summary: "Dato og lokation er nu fastlagt for årets..." }, { id: 3, title: "Nyt i personalhåndbogen", summary: "Opdaterede retningslinjer for hjemmearbejde er nu tilgængelige." }];
function NewsWidget() {
  return (
    <div className="widget">
      <h2>Seneste Nyt</h2>
      {newsArticles.map(article => ( <div key={article.id} className="news-item"> <h3>{article.title}</h3> <p>{article.summary}</p> </div> ))}
    </div>
  );
}
export default NewsWidget;