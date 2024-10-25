const loadPage = (imgUrl, headerText) => {
    const div = document.querySelector("#content");
    div.innerHTML = "";
    const img = new Image();
    img.id = "sharedImg";
    img.src = imgUrl;
    const header = document.createElement('h1');
    header.id = "sharedHeader";
    header.textContent = headerText;
    div.appendChild(img);
    div.appendChild(header);


}
export { loadPage };