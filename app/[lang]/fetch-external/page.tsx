import { useEffect } from "react"

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/auth/test`)
  const data = await res.json()
  console.log('>>>>>>>>>>>', data)

  useEffect(() => {
    console.log('User entered the page');

    const sendBeacon = () => {
      console.log('User left the page');
      const data = new FormData();
        data.append('event', 'user_left_page');
        data.append('timestamp', new Date().toISOString());
      navigator.sendBeacon(`${process.env.NEXT_PUBLIC_API}/api/analytic`, data);
    };

    window.addEventListener('pagehide', sendBeacon);

    return () => {
      sendBeacon();
      window.removeEventListener('pagehide', sendBeacon);
    };
  }, []);

  return (<main>
    <h1>Hello: {data.message}</h1>
  </main>)
}
