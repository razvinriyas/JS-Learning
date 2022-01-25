(function () {
    const myButton = document.getElementById('my-button');
    const myText = document.getElementById('my-text');
    const worldNewsUrl = 'https://api.nytimes.com/svc/topstories/v2/world.json?api-key=uR1j3A82i48Cvvn6A4pQRWBCIhUCIvG7';
    myButton.addEventListener('click', function (event) {
        fetch(worldNewsUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (resp) {
                const worldNews = resp;
                displayNews(worldNews);
            })
    });

    function displayNews(worldNews) {
        let doc = document.getElementsByClassName("parent");
        worldNews.results.forEach(function(results){
            const newsDiv = document.createElement('div');
            newsDiv.className="news";

            const titleDiv = document.createElement("div");
            titleDiv.className = "title";
            titleDiv.innerText = results.title;
            newsDiv.appendChild(titleDiv);

            const abstractDiv = document.createElement("div");
            abstractDiv.className = "abstract";
            abstractDiv.innerText = results.abstract;
            newsDiv.appendChild(abstractDiv);

            const urlDiv = document.createElement("a");
            urlDiv.className = "url";
            urlDiv.href = results.url;
            urlDiv.innerText = "more >";
            urlDiv.target = "_blank";
            newsDiv.appendChild(urlDiv);

            doc[0].appendChild(newsDiv);
        });
    }


})();