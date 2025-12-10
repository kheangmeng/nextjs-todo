"use client"

// import { ProductForm } from "@/components/product-form"
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
// import { Skeleton } from "@/components/ui/skeleton"
import Link from 'next/link'
import { useParams } from 'next/navigation'
// import { useGetProductDetail } from "@/hooks/use-fetch-product"
import { Save, X } from "lucide-react"

export default function Page() {
  const { id } = useParams()
  // const { product, status } = useGetProductDetail(id as string)

  return <div>
    <div className="flex justify-between items-center gap-2 px-3 mb-6">
      {/* <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="#">
              Product
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit Product</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb> */}

      <div className='flex gap-3'>
        <Link
          href={{
            pathname: "/admin/products",
            query: { skip: 1 }
          }}
        >
          <Button variant="outline"> <X /> Cancel</Button>
        </Link>
        <Button type="submit" form="edit-product">
          {/* { status === 'loading' ? 'Loading...' : <><Save /> Save Product</> } */}
          <Save /> Save Product
        </Button>
      </div>
    </div>
    {/* {
      status === 'pending' ?
          <Skeleton className="mt-6 h-[325px] w-full rounded-xl" />
        : <ProductForm id="edit-product" data={product} action="edit" />
    } */}
  </div>
}

