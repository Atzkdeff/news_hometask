import "@babel/polyfill";
import "whatwg-fetch";

import { ChannelSelector } from "./channel-selector.js";
import { NewsList } from "./news-list.js";

export class NewsAgregator {
    constructor(){
        this.fetchChannels().then((sources) => this.channelSelector = new ChannelSelector(sources));
        this.newsList = new NewsList();
        document.getElementById("submit").addEventListener("click", this.createNewsList.bind(this));
    }

    createNewsList() {
        this.newsList.clear();
        this.fetchNews()
            .then((articles) => this.newsList.addNews(articles))
    }

    async fetchChannels() {
        let response = await fetch("https://newsapi.org/v2/sources?apiKey=f289a45dd95b4b26accd20b486875b1a");
        let channels = await response.json();
        return channels.sources;
    }

    fetchNews() {
        let channel = this.channelSelector.selectedChannel();
        let amount = document.getElementById("articles-amount").valueAsNumber;

        if(amount > 100) {
            amount = 100
        } else if (amount <= 0 || !amount) {
            amount = 20
        }

        return fetch(`https://newsapi.org/v2/everything?sources=${channel}&pageSize=${amount}&apiKey=f289a45dd95b4b26accd20b486875b1a`)
            .then((response) => response.json())
            .then((json) => json.articles)
    }
}

new NewsAgregator();
