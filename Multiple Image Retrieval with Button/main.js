(function () {
    var counter = 1;
    const myButton = document.getElementById('my-button');
    const loadingIndicator = document.getElementById('loading-indicator');
    loadComic(counter);
    myButton.addEventListener('click', function (event) {
        counter = counter + 1
        loadComic(counter);
    });

    function displaypage(content) {
        let doc = document.getElementById("parent");
        removeImage(doc);
        const comicImage = document.createElement('img');
        loadingIndicator.style.display = "block";

        comicImage.onload = function () {
            loadingIndicator.style.display = "none";
        };

        comicImage.src = content.img;
        doc.appendChild(comicImage);
    }

    function removeImage(parent) {
        if (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    function loadComic(comicIndex) {
        const Pageurl = 'https://xkcd-apis.glitch.me/comics/' + comicIndex;
        fetch(Pageurl)
            .then(function (response) {
                return response.json();
            })
            .then(function (resp) {
                const content = resp;
                displaypage(content);
            })
    }

}

)();