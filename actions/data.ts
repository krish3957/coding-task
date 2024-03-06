"use server";
import dbConnect from "@/lib/dbConnect"
import data from "@/model/data";
import { revalidatePath } from "@/node_modules/next/cache";
import { toast } from "sonner";

interface dataProps {
    name: string,
    phoneNumber: string,
    email: string,
    hobbies: string[]
}
export const postData = async ({
    name,
    phoneNumber,
    email,
    hobbies
}: dataProps) => {
    await dbConnect();

    const newData = new data({
        name,
        phoneNumber,
        email,
        hobbies
    });
    newData.save().then(() => {
        toast.success("Data added successfully");
        revalidatePath("/");
    }).catch(() => {
        toast.error("Error adding data");
    })
    return newData;
}

export const getData = async () => {
    await dbConnect();
    const storedData = await data.find({}, { _id: 1, name: 1, phoneNumber: 1, email: 1, hobbies: 1 });
    console.log(storedData);
    return storedData;
}