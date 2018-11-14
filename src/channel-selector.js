export class ChannelSelector {
    constructor(channels) {
        this.channels = channels;
        this.addChannels();
    }

    addChannels() {
        let channelList = document.getElementById("channel-list");
        this.channels.forEach((channel) => {
            channelList.appendChild(this.createOption(channel.name, channel.id));
        });
    }

    createOption(name, id) {
        let element;
        element = document.createElement("option");
        element.textContent = name;
        element.setAttribute("id", id);
        return element;
    }

    selectedChannel() {
        return document.getElementById("channel-list").selectedOptions[0].getAttribute("id");
    }
}
