import { Mail, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export default function NewsletterSection() {
  return(
    <div className="bg-indigo-700 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center text-white">
          <div>
            <h3 className="text-2xl font-bold">Get New Jobs Straight to Your Inbox</h3>
            <p className="text-indigo-200">Subscribe to our newsletter and never miss an opportunity.</p>
          </div>
          <form className="mt-6 md:mt-0 flex w-full max-w-md">
            {/* <input type="email" placeholder="Enter your email" className="w-full rounded-l-md px-4 py-3 bg-white text-gray-900 focus:outline-none" /> */}
            {/* <button className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-6 py-3 rounded-r-md">Subscribe</button> */}
            <InputGroup className='bg-white text-gray-900 focus:outline-none'>
              <InputGroupInput type="email" placeholder="Enter your email" />
              <InputGroupAddon>
                <Mail />
              </InputGroupAddon>
            </InputGroup>
            <Button className='bg-indigo-500 ml-2'>
              <Send />
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </div>
)};
