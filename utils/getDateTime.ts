export const getBaseDate = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  if (hours < 2 || (hours === 2 && minutes < 10)) {
    date.setDate(date.getDate() - 1);
  }

  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}${month}${day}`;
};

export const getBaseTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const baseTimes = [2, 5, 8, 11, 14, 17, 20, 23];

  let baseTime = baseTimes[0];
  for (let i = baseTimes.length - 1; i >= 0; i--) {
    if (hours > baseTimes[i] || (hours === baseTimes[i] && minutes >= 10)) {
      baseTime = baseTimes[i];
      break;
    }
  }

  return ('0' + baseTime).slice(-2) + '00';
};
