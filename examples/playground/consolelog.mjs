export function getPostProcessor(options = {}) {
  return { 
    async process(source){
      return {
        source: source + "console.log('Added in post processor!!');"
      }
    }
  }
}