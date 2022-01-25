const items= [
    {id: 1,text:'a'},
    {id: 2,text:'b'},
    {id: 3,text:'c'},
    {id: 4,text:'d'},
    {id: 5,text:'e'}
    
]

let doc=document.getElementsByClassName("parent");
var arrayLength = items.length;
for (var i = 0; i < arrayLength; i++) 
{
    const childrenDiv=document.createElement("div");
    childrenDiv.className="children";
    childrenDiv.innerText=items[i]['text'];
    doc[0].appendChild(childrenDiv);
    
    //OR TPYE THIS INSTEAD OF ABOVE 4 LINES->>> doc[0].innerHTML += '<div class="children">'+items[i]['text']+'</div>';
    
}

