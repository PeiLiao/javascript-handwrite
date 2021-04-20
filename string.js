export function swap(str, i, j) {
	return str.substring(0, i) + str[j] + str.substring(i + 1, j) + str[i] + str.substring(j + 1)
}

export function insert(str, i, s) {
	return str.substring(0, i) + s + str.substring(i)
}
export default { insert, swap }
