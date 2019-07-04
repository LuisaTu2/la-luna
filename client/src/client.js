
window.onload = function(){
    console.log("The black cat.");

    const loader = document.querySelector('.loader');

    // if you want to show the loader when React loads data again
    const showLoader = () => loader.classList.remove('loader--hide');
    const hideLoader = () => loader.classList.add('loader--hide');
    // console.log("Hiding Holder");
    // setTimeout(  hideLoader, 2000);
}