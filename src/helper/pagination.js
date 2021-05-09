const paginationData = (offset, data) => {

	const { total, current_page, last_page } = data;

	if (!total) {
		return [];
	}

	var from = current_page - offset; //TODO offset

	if (from < 1) {
		from = 1;
	}

	var to = from + offset * 2; //TODO
	if (to >= last_page) {
		to = last_page;
	}

	var pagesArray = [];
	while (from <= to) {
		pagesArray.push(from);
		from++;
	}
  return pagesArray;
};

export { paginationData };
