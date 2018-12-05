export class ChannelSelector {
    constructor(channels) {
        this.addChannels(channels);
    }

    addChannels(channels) {
        let channelList = document.getElementById("channel-list");
        channels.forEach((channel) => {
            channelList.appendChild(this.createOption(channel.name, channel.id));
        });
    }

    createOption(name, id,) {
        let element;
        element = document.createElement("option");
        element.textContent = name;
        element.setAttribute("id", id);
        return element;
    }

    selectedChannel() {
        const list = document.getElementById("channel-list");
        return list.options[list.selectedIndex].id;
    }
}
