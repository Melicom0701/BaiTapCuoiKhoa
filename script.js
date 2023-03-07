let editId = 0
let section = ["todo","doing","finished"]
    if (localStorage.getItem("flashCards")===null)
    localStorage.setItem("flashCards", "[]");
 let   flashCards = JSON.parse(localStorage.getItem("flashCards") || "[]");
    flashCards.forEach(element => {
        element.time = new Date(element.time);
        element.list = Number(element.list)
        
    });
    if (localStorage.getItem("id")==null)
    localStorage.setItem("id", 0);
let id = localStorage.getItem("id")
let model = {
    "id" : 1,
    "title" : "ex",
    "category" : "ex",
    "content" : "ex",
    "time" : new Date("2022-03-25"),
    "list" : -1
}
 //   flashCards.push(model)
function flashCardShow(card,section) {
    var month=new Array();
    month[0]="Jan";
    month[1]="Feb";
    month[2]="Mar";
    month[3]="Apr";
    month[4]="May";
    month[5]="Jun";
    month[6]="Jul";
    month[7]="Aug";
    month[8]="Sep";
    month[9]="Oct";
    month[10]="Nov";
    month[11]="Dec";
    
    const flashcard = document.createElement("div")

    const flashcardContent  = document.createElement("div")
    const flashcardFunction = document.createElement("div")
    flashcard.appendChild(flashcardContent)
    flashcard.appendChild(flashcardFunction)
    flashcardContent.className = "flashcardContent"
    flashcardFunction.className = "flashcardFunction"
    const editButton = document.createElement("span")
    const deleteButton = document.createElement("span")
    deleteButton.className = "material-symbols-outlined"
    editButton.className = "material-symbols-outlined";
    editButton.textContent ="edit"
    deleteButton.textContent = "delete"
    deleteButton.addEventListener("click", () => {
        flashCards[Number(card.id)-1].list = -1;
        localStorage.setItem('flashCards', JSON.stringify(flashCards));
        window.location.reload();
      })

    


    editButton.addEventListener("click",()=>{
   // alert("Edit handle")
    document.querySelector('.editOverlay').style.display = 'flex';
        const a = document.querySelector("#editCategory")
        const b = document.querySelector("#editTitle")
        const c = document.querySelector("#editcontent")
        a.value = card.category
        b.value = card.title
        c.value = card.content
        editId = Number(card.id)-1;





    })


    flashcardFunction.appendChild(editButton)
    flashcardFunction.appendChild(deleteButton)
    const title = document.createElement("div")
    const category = document.createElement("a")
    category.setAttribute("href","#")
    const content = document.createElement("div")
    const date = document.createElement("div")
    title.textContent = card.title
    category.textContent = card.category
    content.textContent = card.content
    time = card.time;
    date.textContent = `${month[time.getMonth()]} ${time.getDate()}, ${time.getFullYear()} `
    flashcard.className = "flashCard"
    title.className = "title"
    category.className = "category"
    content.className = "content"
    date.className = "date"
    flashcard.id = `${card.id}`
    flashcardContent.appendChild(category)
    flashcardContent.appendChild(title)
   
    flashcardContent.appendChild(content)
    flashcardContent.appendChild(date)
    element  = document.querySelector(`.${section}`)
    element = element.querySelector(".scroll-box")
    element = element.querySelector(".scroll-content")
    element.appendChild(flashcard)

};


function openToDoForm()
{
    document.querySelector('.overlay').style.display = 'flex';
}

function cancelForm() {
    document.querySelector('.overlay').style.display = 'none';
}
function cancelEditForm() {
    document.querySelector('.editOverlay').style.display = 'none';
}
const scrollBox = document.querySelector('.scroll-box');
scrollBox.scrollTop = scrollBox.scrollHeight;



function add(form)
{
   
    //console.log(form)
    let Cates = form["Category"].value
    
    let title = form["Title"].value
    let content = form["content"].value
    if (title&&content&&Cates)
    {
    id = Number(id) + 1
    model.id = id
    model.category = Cates
    model.title = title 
    model.content = content
    model.list = 0
    model.time = Date.now()
    flashCards.push(model)
    localStorage.setItem("flashCards", JSON.stringify(flashCards));
    localStorage.setItem("id", id);
    cancelForm()
    load()
    }
   // console.log(Cates)
}
function load()
{
   
   for (i = 0 ;i<flashCards.length;i++)
   if (flashCards[i].list>=0 && flashCards[i].list<=2)
   flashCardShow(flashCards[i],section[flashCards[i].list])


}
function edit(form)
{
    model.id = editId+1
    model.category = form["editCategory"].value
    model.content = form["editcontent"].value
    model.time = Date.now()
    model.title = form["editTitle"].value
    model.list = document.querySelector('input[name="opts"]:checked').value
    flashCards[editId] = model
    localStorage.setItem("flashCards", JSON.stringify(flashCards))
    cancelEditForm()
    load()




}


load()