'use strict';

/**
 * Format data
 * @param data
 */
function dataFormat(data) {
  data.map((rpm) => {
    return {
      data1: rpm.data1,
      data2: rpm.data2,
      dat31: rpm.dat31
    }
  });

}

/**
 * Mock lambda call
 * @param id
 * @returns {{id: *, unusedData: boolean, data1: boolean}}
 */
function retrieveRPMbyId(id) {
  const unusedData = true;
  const data1 = true;
  return {id: id, unusedData: unusedData, data1: data1}

}

/**
 * AutoService
 */
class AutoService {

  static async getRPM(id) {
    // Contact RPM  existing lambda
    // Parse the data and format to Output as per to agreed definition
    const data = dataFormat(retrieveRPMbyId(id)); // mocking the call

    return dataFormat(data);
  }
}

module.exports = AutoService;