import { JobModel } from "@/models/Job";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    console.log("id is :", id);
    await mongoose.connect(process.env.MONGO_DB_CONNECT as string);
    await JobModel.deleteOne({
        _id: id,
    })
    return Response.json(true);
}