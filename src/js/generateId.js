let newId = 0
function generateId() {
	const result = newId;
	newId++
	return result;
}

export default generateId;