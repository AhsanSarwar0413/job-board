import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    let body = new FormData();
    const data = await req.formData();
    const file = data.get('file') as File;
    body.set('key', process.env.IMGBB_API_KEY as string);
    body.append('image', file);
    const response = await axios({
        method: 'post',
        url: 'https://api.imgbb.com/1/upload',
        data: body
    });
    if (response.status === 200) {
        return NextResponse.json(response?.data?.data?.url);
    }
    return NextResponse.json({ error: true });

}
