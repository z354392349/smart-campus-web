function takeLongTime(n) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(n + 200), n)
  })
}

async function test() {
  const v1 = await takeLongTime(2000)
  console.log(v1)
}

test()
