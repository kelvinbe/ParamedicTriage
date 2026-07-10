const store = {};

console.log('Using mocked MMKV');

class MMKVLoader {
  initialize() {
    return {
      getString: jest.fn(key => store[key] || null),

      setString: jest.fn((key, value) => {
        store[key] = value;
      }),

      set: jest.fn((key, value) => {
        store[key] = value;
      }),

      clearStore: jest.fn(() => {
        Object.keys(store).forEach(key => delete store[key]);
      }),
    };
  }
}

module.exports = {
  MMKVLoader,
};