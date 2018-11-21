export class NewsList {
    constructor() {
        this.newsList = this.createNewsList();
    }

    createNewsList() {
        const main = document.body.getElementsByTagName("main")[0];
        const newsList = document.createElement("div");
        newsList.setAttribute("id", "news-list");
        main.appendChild(newsList);
        return newsList
    }

    addNews(articles) {
        this.articles = articles;
        this.articles.forEach((article) => {
            this.newsList.insertAdjacentHTML("beforeEnd", this.createArticle(article));
        });
    }

    createArticle(article) {
        return `
            <article>
                <h4>${ article.title }</h4>
                
                ${ article.urlToImage ? `<img src="${ article.urlToImage }">` : "" }
                
                <div class="content">${ article.content }</div>
                
                <a href="${ article.url }">${ article.author }</a>
            </article>
            <hr/>
        `;
    }

    clear() {
        this.newsList.innerHTML = "";
    }
}
