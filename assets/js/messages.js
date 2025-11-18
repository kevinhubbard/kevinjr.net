document.addEventListener('DOMContentLoaded', function() {
	const deleteMsg = document.getElementsByClassName('deleteMsg');
	for (let i = 0; i < deleteMsg.length; i++) { 
		deleteMsg[i].addEventListener('click', async function(e) {
			e.preventDefault();
			let confirmed = confirm(`Delete message ${this.dataset.itemId}`);
			if (confirmed) {
				try {
					const id = this.dataset.itemId;

					const response = await fetch(`/admin/messages/${id}`, {
						method: 'DELETE'
					});
					const data = await response.json();
					if (data.success) {
						window.location.reload();
					}
				} catch (error) {
					console.error("Error during delete: ", error);
				}
			}
			
		});
	}
});