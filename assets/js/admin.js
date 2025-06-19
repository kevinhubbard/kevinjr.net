window.addEventListener('DOMContentLoaded', function(event) {

document.querySelector('input[type="file"]').addEventListener('change', function(e) {
	const fileInput = this;
	const formData = new FormData();
	formData.append('image', fileInput.files[0]);

	fetch('/admin/upload', {
		method: 'POST',
		body: formData
	})
	.then(res => res.json())
	.then(data => {
		if (data.success) {
			const textarea = document.getElementById('postBody');
			const imgTag = `<img src="${data.imageUrl}" alt="uploaded img">\n`;
			textarea.value += imgTag;
		}
	})
	.catch(err => console.error('upload failed:', err));
});

});