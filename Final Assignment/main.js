sectionUrl = 'https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=uR1j3A82i48Cvvn6A4pQRWBCIhUCIvG7';
articleUrl = 'https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=uR1j3A82i48Cvvn6A4pQRWBCIhUCIvG7';

fetch(sectionUrl)
   .then(function (response) {
      return response.json();
   })
   .then(function (resp) {
      const content = resp;
      displaysection(content);
   });

function displaysection(content) {
   let doc = document.getElementsByClassName("sections");
   content.results.forEach(function (results) {
      const sectionListingDiv = document.createElement('div');
      sectionListingDiv.className = "sectionListing";

      /* const sectionDiv = document.createElement("div");
       sectionDiv.className = "section";
       sectionDiv.innerText = results.section;
       sectionListingDiv.appendChild(sectionDiv); */

      const displaynameDiv = document.createElement("div");
      displaynameDiv.className = "displayname";
      displaynameDiv.innerText = results.display_name;
      sectionListingDiv.appendChild(displaynameDiv);

      doc[0].appendChild(sectionListingDiv);
   })
}


fetch(articleUrl)
   .then(function (response) {
      return response.json();
   })
   .then(function (resp) {
      const content1 = resp;
      displayarticle(content1);
   });

function displayarticle(content1) {
   let doc = document.getElementsByClassName("articles");
   content1.results.forEach(function (results) {
      const articleListingDiv = document.createElement('div');
      articleListingDiv.className = "articleListing";

      const titleDiv = document.createElement("div");
      titleDiv.className = "title";
      titleDiv.innerText = results.title;
      articleListingDiv.appendChild(titleDiv);

      const abstractDiv = document.createElement("div");
      abstractDiv.className = "abstract";
      abstractDiv.innerText = results.abstract;
      articleListingDiv.appendChild(abstractDiv);

     /* const thumbnail = document.createElement("img");
      thumbnail.src = results.multimedia[1].url;
      articleListingDiv.appendChild(thumbnail); */
      
      doc[0].appendChild(articleListingDiv);

      articleListingDiv.addEventListener('click', function (event) {
         window.open(results.url, '_blank');
      });


   })
}


