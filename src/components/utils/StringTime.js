/**
 * Calulates and returns string format of the given seconds in the following format:
 * X days Y hours Z minutes (A seconds if and only if not over a day)
 * @param {int} seconds 
 * @returns {string}
 */
const StringTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) {
      return "--";
    }
    
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    let result = "";

    if (days > 0) {
      result += `${days} day${days !== 1 ? 's' : ''}`;
      if (hours > 0 || remainingSeconds > 0) {
        result += " ";
      }
    }
  
    if (hours > 0) {
      result += `${hours} hour${hours !== 1 ? 's' : ''}`;
      if (minutes > 0 || remainingSeconds > 0) {
        result += " ";
      }
    }
  
    if (minutes > 0) {
      result += `${minutes} minute${minutes !== 1 ? 's' : ''}`;
      if (remainingSeconds > 0) {
        result += " ";
      }
    }
  
    if (!(days > 0) && remainingSeconds > 0) {
      result += `${Math.round(remainingSeconds)} second${Math.round(remainingSeconds) !== 1 ? 's' : ''}`;
    }
  
    return result;
  };

export default StringTime