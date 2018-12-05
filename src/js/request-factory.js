export class RequestFactory {
    static sendRequest(type, url, data) {
        switch (type) {
            case "GET":
                return new GetRequest(url);
            case "POST":
                return new  PostRequest(url, data)
        }
    }
}

const GetRequest = function (url) {
    return fetch(url);
};

const PostRequest = function (url, data) {
    return fetch(
        url,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers:{
              'Content-Type': 'application/json'
            }
        }
    );
};
