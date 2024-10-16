import Jobs from "@/app/components/Jobs";
import { addOrgAndUserData, JobModel } from "@/models/Job";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { AutoPaginatable, OrganizationMembership, WorkOS } from "@workos-inc/node"
import mongoose from "mongoose";


export const revalidate = 0;

export default async function JobListing({
    params: {
        orgId
    }
}: {
    params: {
        orgId: string
    }
}) {
    const workOsClient = new WorkOS(process.env.WORKOS_API_KEY);
    const org = await workOsClient.organizations.getOrganization(orgId);
    let jobsDocs = JSON.parse(JSON.stringify(await JobModel.find({ orgId: org.id })));
    const { user } = await withAuth();
    jobsDocs = await addOrgAndUserData(jobsDocs, user);
    return (
        <>
            <div className="container">
                <div className="text-xl my-6">{org.name}</div>
            </div>
            <Jobs header={"Jobs posted by " + org.name} jobs={jobsDocs} />
        </>
    )
}