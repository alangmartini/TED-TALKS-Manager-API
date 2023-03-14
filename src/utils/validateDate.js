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
  console.log(typeof dateStr);
  console.log(dateStr);
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateStr)) {
    console.log('im here');
    return false;
  }

  const parts = dateStr.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  console.log('date is', day, month, typeof day, typeof month);
  return validateDay(day) && validateMonth(month);
}

module.exports = isValidDate;