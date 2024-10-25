const setHome = () => {
    const ele = document.createElement('button');
    const linkEle = document.querySelector("#linkContainer");
    ele.textContent = 'Home';
    linkEle.appendChild(ele);
    return ele;
}


export default setHome;