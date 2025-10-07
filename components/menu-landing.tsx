import Link from "next/link";
import { Button } from "./ui/button";

export default function MenuLanding() {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold py-4">Menu Landing Pangs</h1>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Button asChild>
          <Link href="/blog">Blog</Link>
        </Button>
        <Button asChild>
          <Link href="/company">Company</Link>
        </Button>
        <Button asChild>
          <Link href="/mobile-shop">Mobile shop</Link>
        </Button>
        <Button asChild>
          <Link href="/product">Product</Link>
        </Button>
        <Button asChild>
          <Link href="/delivery">Delivery</Link>
        </Button>
        <Button asChild>
          <Link href="/job">Job</Link>
        </Button>
        {/* <div className="bg-muted/50 aspect-video rounded-xl"></div>
        <div className="bg-muted/50 aspect-video rounded-xl"></div>
        <div className="bg-muted/50 aspect-video rounded-xl"></div> */}
      </div>
    </div>
  )
}
