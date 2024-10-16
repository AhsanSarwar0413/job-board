interface JobType {
    _id: string,
    title: string,
    description: string,
    remote: string,
    salary: number,
    country: string,
    state: string,
    city: string,
    countryId: string,
    stateId: string,
    cityId: string,
    jobIcon: string,
    contactName: string,
    contactPhone: string,
    contactPhoto?: string,
    contactEmail: string
    orgId: string,
    type: string,
    createdAt: string,
    isAdmin?: boolean;
}