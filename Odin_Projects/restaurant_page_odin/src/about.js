const setAbout = () => {
    const ele = document.createElement('button');
    const linkEle = document.querySelector("#linkContainer");
    ele.textContent = 'About';
    linkEle.appendChild(ele);
    return ele;
}

export default setAbout;