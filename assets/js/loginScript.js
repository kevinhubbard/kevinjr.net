window.addEventListener("DOMContentLoaded", function(event) {
    let login = document.getElementById('logLink');
    let form = document.getElementById('loginModel');
    let overlay = document.getElementById('overlay');

    // OPEN MODAL
    login.addEventListener('click', function(e) {
        e.preventDefault();
        form.classList.add("active");
        overlay.classList.add("active");
    });

    // PREVENT overlay click from closing immediately
    form.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // CLOSE WHEN CLICKING OUTSIDE
    overlay.addEventListener('click', function(e) {
        closeModal();
    });

    function closeModal() {
        form.classList.remove("active");
        overlay.classList.remove("active");
    }
});