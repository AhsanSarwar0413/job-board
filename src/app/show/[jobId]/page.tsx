import { JobModel } from "@/models/Job";
import mongoose from "mongoose";
import Image from "next/image";

export default async function SingleJobPage({
    params: {
        jobId
    }
}: {
    params: {
        jobId: string,
    }
}) {
    await mongoose.connect(process.env.MONGO_DB_CONNECT as string);
    const jobDoc = await JobModel.findById(jobId);
    return (
        <div className="container my-6">
            <div className="sm:flex sm:items-center">
                <div className="grow">
                    <h1 className="text-2xl mb-2">{jobDoc.title}</h1>
                    <div className="capitalize text-sm text-blue-800 font-semibold mb-4">
                        {jobDoc.remote + " • " + jobDoc.city + ", " + jobDoc.state + ", " + jobDoc.country + " • " + jobDoc.type + "-time"}
                    </div>
                </div>
                <div>
                    <Image
                        src={jobDoc?.jobIcon}
                        alt='jobicon'
                        width={500}
                        height={500}
                        className="w-auth h-auto max-w-16 max-h-16"
                    />
                </div>
            </div>
            <div className="whitespace-pre-line text-sm text-gray-600  mt-8">
                {jobDoc.description}
            </div>
            <div className="mt-4 bg-gray-200 p-8 rounded-lg">
                <h3 className="font-bold mb-2">Apply By Contacting Us</h3>
                <div className="flex gap-4">
                    {jobDoc?.contactPhoto && (
                        <Image
                            src={jobDoc?.contactPhoto}
                            alt='contact person'
                            width={500}
                            height={500}
                            className="w-auth h-auto max-w-24 max-h-24"
                        />
                    )}
                    <div className="flex content-center items-center">
                        Name: {jobDoc?.contactName}<br />
                        Email: {jobDoc?.contactEmail}<br />
                        Phone: {jobDoc?.contactPhone}
                    </div>
                </div>
            </div>
        </div>
    )
}