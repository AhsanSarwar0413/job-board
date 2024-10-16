import { withAuth } from "@workos-inc/authkit-nextjs";
import { createCompany } from "../server/actions/createCompany.";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default async function NewCompanyPage() {

    const { user } = await withAuth();

    const handleSubmit = async (data: FormData) => {
        'use server';
        if (user) {
            await createCompany(data.get('newCompanyName') as string, user.id);
        }
    }


    if (!user) {
        return (
            <div>Login to use this page</div>
        )
    }

    return (
        <div className="container">
            <h2 className="text-lg mt-6">Create a new company</h2>
            <p className="text-gray-500 text-sm mb-2">To create a job, you first need to create a new company</p>
            <form
                action={handleSubmit}
                className="flex gap-2"
            >
                <input
                    type="text"
                    placeholder="Enter Company Name"
                    className="p-2 border border-gray-400 rounded-md"
                    name="newCompanyName"
                />
                <button type="submit" className="flex bg-gray-200 px-4 py-2 rounded-md gap-2 items-center">
                    Create Company
                    <FontAwesomeIcon className="h-4" icon={faArrowRight} />
                </button>
            </form>
        </div>
    )
}