export default function generateHeader(token) {
	return {
		headers: {
			'Authorization': 'Bearer ' + token
		}
	}
}