const applySearchTermFilter = (filtersObject, filterType, arrayToFilter) => {
  if (filterType === 'searchTerm') {
    const regex = new RegExp(filtersObject.searchTerm);

    return arrayToFilter.filter((talker) => regex.test(talker.name));
  }

  return arrayToFilter;
};

const applyRateFilter = (filtersObject, filterType, arrayToFilter) => {
  if (filterType === 'rate' && filtersObject.rate) {
    return arrayToFilter
      .filter((talker) => talker.talk.rate === Number(filtersObject.rate));
  }

  return arrayToFilter;
};

const applyDateFilter = (filtersObject, filterType, arrayToFilter) => {
  if (filterType === 'date' && filtersObject.date) {
    return arrayToFilter
      .filter((talker) => {
        console.log('filters', talker.talk.watchedAt)
        return talker.talk.watchedAt === filtersObject.date;
      });
  }

  return arrayToFilter;
};

const applyFilter = (filtersObject, arrayToFilter) => {
  let filteredArray = arrayToFilter;

  Object.keys(filtersObject).forEach((filterType) => {
    filteredArray = applySearchTermFilter(filtersObject, filterType, filteredArray);
    filteredArray = applyRateFilter(filtersObject, filterType, filteredArray);
    filteredArray = applyDateFilter(filtersObject, filterType, filteredArray);
  });

  return filteredArray;
};

module.exports = applyFilter;