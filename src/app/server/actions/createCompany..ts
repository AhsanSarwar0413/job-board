'use server';
import { WorkOS } from "@workos-inc/node";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCompany(companyName: string, userId: string) {
    const workOSClient = new WorkOS(process.env.WORKOS_API_KEY);
    const org = await workOSClient.organizations.createOrganization({
        name: companyName,
    })
    await workOSClient.userManagement.createOrganizationMembership({
        userId,
        organizationId: org.id,
        roleSlug: 'admin',
    })
    revalidatePath('/new-listing');
    redirect('/new-listing');
}
