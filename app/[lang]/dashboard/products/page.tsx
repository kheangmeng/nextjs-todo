// "use client"

// // import { getProductList } from "@/api/product/fetch-api"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import type { Pagination } from "@/types"
// // import { useQuery, useQueryClient } from "@tanstack/react-query"
// // import { createFileRoute, useRouterState } from '@tanstack/react-router'
// import Link from 'next/link'
// import { useSearchParams } from 'next/navigation'
// import { Download, Plus, Search } from "lucide-react"
// // import { toast } from "sonner"
// import { useGetProducts } from "@/hooks/use-fetch-product"
// import { ProductTable } from '../../../components/tables/product-table'

// export default function Page() {
//   const searchParams = useSearchParams()
//   const { products, status } = useGetProducts({skip: Number(searchParams.get('skip')) || 1, limit: 10})
//   const search: Pagination = {skip: Number(searchParams.get('skip')) || 1, limit: Number(searchParams.get('limit')) || 10}
//   // const queryClient = useQueryClient();
//   // const routerState = useRouterState();
//   // const search: Pagination = routerState.location.search;
//   // const { data, status: fetchingStatus } = useQuery({
//   //   queryKey: ['products', search.skip],
//   //   queryFn: () => getProductList({skip: search.skip || 1, limit: 10}),
//   //   initialData: undefined,
//   // })

//   // if (status === 'succeeded' && successMessage) {
//   //   toast.success(successMessage)
//   //   dispatch(resetStore())
//   //   queryClient.invalidateQueries({ queryKey: ['products'] })
//   // }
//   // if (status === 'failed' && error) {
//   //   toast.error(error)
//   //   dispatch(resetStore())
//   // }

//   return (
//     <main>
//       <div className="flex items-center py-4 gap-2">
//         <div className="w-full relative block">
//           <span className="absolute inset-y-0 left-0 flex items-center pl-2">
//             <Search className="h-5 w-5 text-gray-400" />
//           </span>
//           <span className="sr-only">Search</span>
//             <Input
//               placeholder="Search order..."
//               className="block w-full py-2 pr-3 pl-9 text-gray-700"
//               type="text" name="search"
//             />
//         </div>
//         <Button variant="secondary" className="text-primary">
//           <Download /> Export
//         </Button>
//         <Link href="/admin/products/add">
//           <Button>
//             <Plus /> Add Product
//           </Button>
//         </Link>
//       </div>
//       <ProductTable data={products} status={status} search={search} />
//     </main>
//   )
// }

export default async function Page() {

  return (<main>
    <h1>Products</h1>
  </main>)
}
