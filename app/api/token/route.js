import Midtrans from "midtrans-client";

let snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT,
});

export async function POST(request) {
    const {} = await request.json();
    let parameter = {
    };
}