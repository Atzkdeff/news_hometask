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

    addNews(articles,) {
        this.articles = articles;
        this.articles.forEach((article, i,) => {
            this.newsList.insertAdjacentHTML("beforeEnd", this.createArticle(article, (this.articles.length - 1 === i)));
        });
    }

    createArticle(article, isLastArticle,) {
        const authorName = article.author || "link";
        return `
            <article>
                <h4>${ article.title }</h4>
                
                ${ article.urlToImage ? `<img src="${ article.urlToImage }">` : "" }
                
                ${ article.content ? `<div class="content">${ article.content }</div>` : ""}
                
                <a href="${ article.url }">${ authorName }</a>
            </article>
            ${ isLastArticle ? "" : "<hr/>"}
        `;
    }

    clear() {
        this.newsList.innerHTML = "";
    }
}
