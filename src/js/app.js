import "@babel/polyfill";
import "whatwg-fetch";

import "../styles/main.scss";

import { ChannelSelector } from "./channel-selector";
import { NewsList } from "./news-list";
import { RequestFactory } from "./request-factory";

const ERROR_MESSAGE = "We are trying to solve this problem right now";

export class NewsAgregator {
    constructor(){
        this.fetchChannels()
            .then((sources) => this.channelSelector = new ChannelSelector(sources))
            .catch(() => this.showPopup(ERROR_MESSAGE));

        this.newsList = new NewsList();
        document.getElementById("submit").addEventListener("click", this.createNewsList.bind(this));
    }

    createNewsList() {
        this.fetchNews()
            .then((articles) => {
                this.newsList.clear();
                return articles
            })
            .then((articles) => this.newsList.addNews(articles))
            .catch(() => this.showPopup(ERROR_MESSAGE))
    }

    async fetchChannels() {
        let response = await RequestFactory.sendRequest("GET", "https://newsapi.org/v2/sources?apiKey=f289a45dd95b4b26accd20b486875b1a");
        let channels = await response.json();
        return channels.sources;
    }

    async fetchNews() {
        let channel = this.channelSelector.selectedChannel();
        let amount = parseInt(document.getElementById("articles-amount").value);
        let response;
        let news;

        if(amount > 100) {
            amount = 100
        } else if (amount <= 0 || !amount) {
            amount = 20
        }

        response = await RequestFactory.sendRequest("GET", `https://newsapi.org/v2/everything?sources=${channel}&pageSize=${amount}&apiKey=f289a45dd95b4b26accd20b486875b1a`)
        news = await response.json();
        return news.articles
    }

    showPopup(message) {
            import(/* webpackChunkName: "error-handler-popup" */ './error-handler-popup').then( (module) => {
                let ErrorHandlerPopup = module.default;
                new ErrorHandlerPopup().showPopup(message)
            }
            );

    }
}

new NewsAgregator();
