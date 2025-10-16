export default async function Page() {
  const res = await fetch('http://localhost:3030/api/auth/test')
  const data = await res.json()
  console.log('>>>>>>>>>>>', data)

  return (<main>
    <h1>Hello: {data.message}</h1>
  </main>)
}
