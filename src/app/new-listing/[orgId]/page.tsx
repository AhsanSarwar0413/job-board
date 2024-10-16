import JobForm from "@/app/components/JobForm";
import { withAuth } from "@workos-inc/authkit-nextjs"
import { WorkOS } from "@workos-inc/node";

export default async function NewListingForOrgPage({
    params: {
        orgId
    }
}: {
    params: {
        orgId: string
    }
}) {
    const { user } = await withAuth();
    const workOSClient = new WorkOS(process.env.WORKOS_API_KEY);
    if (!user) return 'Please Log In';
    const organizationId = orgId;
    const organizationMemberships = await workOSClient.userManagement.listOrganizationMemberships({ userId: user.id, organizationId });
    const hasAccess = organizationMemberships.data.length > 0;
    if (!hasAccess) {
        return 'no access';
    }
    return (
        <JobForm orgId={orgId} />
    )
}