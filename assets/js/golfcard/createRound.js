window.addEventListener("DOMContentLoaded", function(event) {
    const courseSelect = document.getElementById("courseSelect");
    const teeBoxContainer = document.getElementById('teeBoxOptions');

    function renderTeeBoxes(courseID) {
        teeBoxContainer.innerHTML = "";

        const filtered = teeBoxes.filter(tb => tb.courseID == courseID);
        filtered.forEach(tb => {
            const label = document.createElement('label');
            label.innerHTML = `
                <input type="radio" name="teeBoxID" value="${tb.teeBoxID}" required>
                ${tb.teeName} (${tb.totalYards} yds)
                `;
            teeBoxContainer.appendChild(label);
        });
    }

    renderTeeBoxes(courseSelect.value);
    courseSelect.addEventListener('change', function(e) {
        e.preventDefault();
        renderTeeBoxes(courseSelect.value);
    });
});