'use server'

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withAuth } from "@workos-inc/authkit-nextjs"
import { WorkOS } from "@workos-inc/node";
import Link from "next/link";

export default async function NewListing() {

    const { user } = await withAuth();

    if (!user) {
        return (
            <div className="container">
                <div>You need to be logged in to post a job</div>
            </div>
        )
    }
    const workOSClient = new WorkOS(process.env.WORKOS_API_KEY);

    const organizationMemeberShips = await workOSClient.userManagement.listOrganizationMemberships({
        userId: user.id,
    });

    const activeOrganizationMemberships = organizationMemeberShips.data.filter((orgMember) => orgMember.status === 'active');
    const organizationsNames: { [key: string]: string } = {};
    for (const activeMembership of activeOrganizationMemberships) {
        const organization = await workOSClient.organizations.getOrganization(activeMembership.organizationId);
        organizationsNames[organization.id] = organization.name;
    }


    return (
        <div className="container">
            <div>
                <h2 className="text-lg mt-6">Your Comapnies</h2>
                <p className="text-gray-500 text-sm mb-2">Select a company to create a job</p>
                <div>
                    <div className="border rounded-md inline-block">
                        {Object.keys(organizationsNames).map(orgId => (
                            <Link key={orgId} href={`/new-listing/${orgId}`} className="py-2 px-4 flex gap-2 items-center [&:not(:last-child)]:border-b">
                                {organizationsNames[orgId]}
                                <FontAwesomeIcon className="h-4" icon={faArrowRight} />
                            </Link>
                        ))}
                    </div>
                </div>
                {organizationMemeberShips?.data?.length === 0 && (
                    <div className="border border-blue-300 bg-blue-50 p-4 rounded-md">
                        No companies assigned to your user.
                    </div>
                )}
                <Link href="/new-company" className="bg-gray-200 px-4 py-2 rounded-md inline-block mt-6">Create Company</Link>
            </div>
        </div>
    )
}