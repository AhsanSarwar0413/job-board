import JobRow from "./JobRow";

export const revalidate = 0;
export default function Jobs({
    header,
    jobs
}: {
    header: string,
    jobs: (JobType & { orgName: string })[]
}) {
    return (
        <div className="bg-slate-200 rounded-3xl py-6">
            <div className="container">
                <h2 className="font-bold mb-4">{header || 'Recent Jobs'}</h2>
                <div className="flex flex-col gap-4">
                    {!jobs?.length && (
                        <div>No Jobs Found.</div>
                    )}
                    {jobs && jobs.map((job) => (
                        <JobRow key={job.title} jobDoc={job} />
                    ))}
                </div>
            </div>
        </div>
    )
}