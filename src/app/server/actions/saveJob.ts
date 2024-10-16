'use server';

import { JobModel } from "@/models/Job";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export default async function saveJob(data: FormData) {
    await mongoose.connect(process.env.MONGO_DB_CONNECT as string);
    const { id, ...jobData } = Object.fromEntries(data);
    let jobDocument = (id)
        ? await JobModel.findByIdAndUpdate(id, jobData)
        : await JobModel.create(jobData);
    if ('orgId' in jobData) {
        revalidatePath('/jobs/' + jobData?.orgId);
    }
    return JSON.parse(JSON.stringify(jobDocument));
}