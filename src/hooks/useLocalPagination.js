const URL = 'https://worldtimeapi.org/api/timezone/Etc/UTC'

const useLocalPagination = () => {}

export default useLocalPagination

function* countUpToThree() {
  yield 1
  yield 2
  yield 3
}

const counter = countUpToThree()

console.log(counter.next().value) // 1
console.log(counter.next().value) // 2
console.log(counter.next().value) // 3
console.log(counter.next().value) // undefined
