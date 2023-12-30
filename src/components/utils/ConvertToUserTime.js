/**
 * Converts given UTC date string to user specific time format in HH:MM:SS AM MM/DD/YYYY
 * @param {string} utcTimeString 
 * @returns {string}
 */
const convertToUserTime = (utcTimeString) => {
    const utcTime = new Date(utcTimeString);
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const userDate = utcTime.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const userTime = utcTime.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: userTimeZone,
    });
    const userDateTime = `${userTime} ${userDate}`;
    return userDateTime;
  };

export default convertToUserTime