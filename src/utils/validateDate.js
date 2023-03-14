const validateMonth = (month) => {
  if (month === 0 || month > 12) {
    return false;
  }

  return true;
};

const validateDay = (day) => {
  if (day === 0 || day > 31) {
    return false;
  }

  return true;
};

function isValidDate(dateStr) {
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateStr)) {
    return false;
  }

  const parts = dateStr.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);

  return validateDay(day) && validateMonth(month);
}

module.exports = isValidDate;