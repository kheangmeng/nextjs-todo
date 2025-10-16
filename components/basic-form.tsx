import { zodResolver } from "@hookform/resolvers/zod"
import { type UseFormReturn, useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"

const formSchema = z.object({
  price: z.number(),
  // z.preprocess((val) => {
  //   if (typeof val === "string") {
  //     return Number.parseInt(val);
  //   }
  //   return val;
  // }, z.number())
})
export default function BasicForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: 0,
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('submitted:', values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-500">Base Price</FormLabel>
              <FormControl>
                <Input
                  className="bg-slate-50"
                  type="number"
                  placeholder="$ Type base price here..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
