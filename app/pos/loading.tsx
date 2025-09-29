import { Loader2Icon } from "lucide-react"

export default function Loading() {
  return (
		<div className="flex justify-center items-center h-screen">
			<Loader2Icon className="h-12 w-12 animate-spin" />
			Please wait...
			</div>
	)
}