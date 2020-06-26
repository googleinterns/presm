export const sourceFormatTypes = ['module'];

export function getPostProcessor(options = {}) {
  return {
    async process(source) {
      return {
        source:
          source +
          "\nconsole.log('This line was added by a post processor!!');",
      };
    },
  };
}
