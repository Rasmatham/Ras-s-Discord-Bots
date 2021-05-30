//Check amount
{
	/**
	 * 
	 * @param {String[]} arr 
	 * @param {String} str 
	 * @returns {String} Returns the string and the amount of elements in the array
	 */
	var checkFor = (arr, str) => {
		if (arr.length > 0) {
			return `${str} ${arr.length}\n`;
		} else {
			return ``;
		}
	}
}
module.exports = {checkFor};