const setMenu = () => {
    const ele = document.createElement('button');
    ele.textContent = 'Menu';
    const linkEle = document.querySelector("#linkContainer");
    linkEle.appendChild(ele);
    return ele;
}

export default setMenu;