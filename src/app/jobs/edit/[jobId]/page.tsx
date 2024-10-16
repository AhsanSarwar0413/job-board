import JobForm from "@/app/components/JobForm";
import { JobModel } from "@/models/Job";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import mongoose from "mongoose"

export default async function EditJobPage({
    params: {
        jobId,
    }
}: {
    params: {
        jobId: string
    }
}) {
    await mongoose.connect(process.env.MONGO_DB_CONNECT as string);
    const jobDoc = JSON.parse(JSON.stringify(await JobModel.findById(jobId)));
    if (!jobDoc) {
        return 'Not Found';
    }
    const { user } = await withAuth();
    const workOsClient = new WorkOS(process.env.WORKOS_API_KEY);
    if (!user) return 'You need to login first.';

    const oms = await workOsClient.userManagement.listOrganizationMemberships({
        userId: user.id,
        organizationId: jobDoc.orgId
    });
    if (oms.data.length === 0) {
        return 'Access Denied';
    }
    return (
        <div>
            <JobForm orgId={jobDoc.orgId} jobDoc={jobDoc} />
        </div>
    )
}