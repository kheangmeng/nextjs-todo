'use client'

import Image from 'next/image'
import { allJobs, type Job } from './data'

const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;

export default function JobCardFeaturedJobsSection() {
  return(
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Featured Job Openings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {allJobs.slice(0, 8).map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
)};

const imageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  return `https://picsum.photos/seed/${src}/${width}`
}
export function JobCard({ job }: { job: Job }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start mb-4">
          <Image
          loader={imageLoader}
          priority={true}
          src={`${job.id}`}
          alt={job.company}
          width={200}
          height={200}
          className="w-12 h-12 rounded-md mr-4"
        />
        <div>
					<a href="#" className="text-lg font-bold text-gray-800 hover:text-indigo-600">{job.title}</a>
					<p className="text-sm text-gray-500">{job.company}</p>
        </div>
      </div>
      <div className="flex-grow space-y-2 text-sm text-gray-600">
				<p className="flex items-center"><LocationIcon /> <span className="ml-1.5">{job.location}</span></p>
				<p className="flex items-center font-semibold"><CashIcon /> {job.salary}</p>
				<p className="flex items-center"><ClockIcon /> {job.term}</p>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
				<span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">{job.industry}</span>
      </div>
    </div>
)};
