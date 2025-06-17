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













/*	console.log("admin page");

	document.getElementById('submitBtn').addEventListener('click', function(e) {
		e.preventDefault();
		const titleVar = document.getElementById('postTitle').value;
		const bodyVar = document.getElementById('postBody').value;
		const authVar = document.getElementById('postAuth').value;
		//console.log('title: ' + titleVar + '\nbody: ' + bodyVar + '\nauth: ' + authVar);
		savePost()
	});

	function savePost() {
		const titleVar = document.getElementById('postTitle').value;
		const bodyVar = document.getElementById('postBody').value;
		const authVar = document.getElementById('postAuth').value;

		fetch('/admin/blog-post', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({t: titleVar, a: authVar, v: bodyVar}),
		})//.then(response => response.text()).then(data => console.log(data));
	}*/
});