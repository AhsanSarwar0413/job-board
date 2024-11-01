import { addOrgAndUserData, JobModel } from "@/models/Job";
import Hero from "./components/Hero";
import Jobs from "./components/Jobs";
import { withAuth } from "@workos-inc/authkit-nextjs";
import mongoose from "mongoose";

export default async function Home() {
  const { user } = await withAuth();
  console.log("user is :", user);
  let latestJobs = null;
  if (user) {
    await mongoose.connect(process.env.MONGO_DB_CONNECT as string);
    const jobDocs = await JobModel.find({}, {}, { limit: 5, sort: '-createdAt' });
    console.log("job docs ", jobDocs);
    latestJobs = await addOrgAndUserData(
      jobDocs,
      user
    );
    console.log("latest jobs", latestJobs);
  }  
  return (
    <>
      <Hero />
      <Jobs header={''} jobs={latestJobs} />
    </>
  );
}
