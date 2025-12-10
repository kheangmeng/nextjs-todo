import { ProductForm } from "@/components/product-form"
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Plus, X } from "lucide-react"

export default function Page() {
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
            <BreadcrumbPage>Add Product</BreadcrumbPage>
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
        <Button type="submit" form="add-product">
          {/* { status === 'loading' ? 'Loading...' : <><Plus /> Add Product</> } */}
          <Plus /> Add Product
        </Button>
      </div>
    </div>
    <ProductForm id="add-product" action="add" />
  </div>
}
