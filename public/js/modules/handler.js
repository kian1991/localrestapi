const pageInit = () => {
    window.onclick = function(event) {
        if (event.target.classList.value.includes('modal-container'))
            event.target.style.display = 'none';
    };
};

export { pageInit };