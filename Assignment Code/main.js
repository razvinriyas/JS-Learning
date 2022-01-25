const sectionUrl = "https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=uR1j3A82i48Cvvn6A4pQRWBCIhUCIvG7";
const articleUrl = "https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=uR1j3A82i48Cvvn6A4pQRWBCIhUCIvG7";

let fetchedData;

fetch(articleUrl)
	.then(function (response) {
		return response.json();
	})
	.then(function (resp) {
		fetchedData = resp;
		displayArticles(fetchedData);
	});

fetch(sectionUrl)
	.then(function (response) {
		return response.json();
	})
	.then(function (resp) {
		displaySection(resp);
	});

function displaySection(content) {
	let doc = document.getElementsByClassName("sections");
	content.results.forEach(function (results) {
		const sectionListingDiv = document.createElement("div");
		sectionListingDiv.className = "sectionListing";
		const displaynameDiv = document.createElement("div");
		displaynameDiv.className = "displayname";
		displaynameDiv.innerText = results.display_name;
		sectionListingDiv.appendChild(displaynameDiv);
		doc[0].appendChild(sectionListingDiv);
	});
	addListenersToSection();
}


function displayArticles(content, section) {
	/*
	If there is already something rendered in articles div, we need to remove it.
	Otherwise, when we call this function again, the old rendered content would remain there.
	*/
	removeArticles();
	const [doc] = document.getElementsByClassName("articles");
	content.results.forEach(function (result) {
		if (section && result.section.toLowerCase() !== section.toLowerCase()) {
			return;
		}
		const articleListingDiv = document.createElement("div");
		articleListingDiv.className = "articleListing";

		const thumbnailUrl = result.multimedia?.[1].url;
		if (thumbnailUrl) {
			const thumbnailImg = document.createElement("img");
			thumbnailImg.src = thumbnailUrl;
			articleListingDiv.appendChild(thumbnailImg);
		}

		const contentDiv = document.createElement("div");

		const titleDiv = document.createElement("div");
		titleDiv.className = "title";
		titleDiv.innerText = result.title;
		titleDiv.addEventListener("click", () => window.open(result.url, "_blank"));
		contentDiv.appendChild(titleDiv);

		const abstractDiv = document.createElement("div");
		abstractDiv.className = "abstract";
		abstractDiv.innerText = result.abstract;
		contentDiv.appendChild(abstractDiv);

		articleListingDiv.appendChild(contentDiv);
		doc.appendChild(articleListingDiv);
	});
	if (!doc.firstChild) {
		// Nothing has been rendered, show error
		const errorDiv = document.createElement("div");
		errorDiv.className = "error";
		errorDiv.innerText = `No news story found under section ${section}`;
		doc.appendChild(errorDiv);
	}
}

function removeArticles() {
	const articles = document.querySelector(".articles");
	while (articles.firstChild) {
		articles.removeChild(articles.firstChild);
	}
}

function addListenersToSection() {
	const elements = document.querySelector(".sections").children;
	for (const e of elements) {
		e.addEventListener("click", (event) => displayArticles(fetchedData, event.target.innerText));
	}
}
