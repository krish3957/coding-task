'use client';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { use, useEffect, useRef, useState } from "react";
import { getSingleData, updateData } from "@/actions/data";
import { toast } from "sonner";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";


interface updateButtonProps {
    id: string
}
interface dataProps {
    name: string,
    phoneNumber: string,
    email: string,
    hobbies: string[]
}
export function UpdateButton({
    id
}: updateButtonProps) {
    const [data, setData] = useState<dataProps | null>(null);
    const router = useRouter();
    useEffect(() => {
        getSingleData(id).then((res) => {
            setData(res);
        })
    }, [id])
    const [name, setName] = useState(data?.name || "");
    const [phone, setPhone] = useState(data?.phoneNumber || "");
    const [email, setEmail] = useState(data?.email || "");
    const [hobbies, setHobbies] = useState<string[]>(data?.hobbies || []);
    const closeRef = useRef<HTMLButtonElement>(null);
    const handleUpdate = async () => {
        try {

            updateData(id, {
                name: name,
                phoneNumber: phone,
                email: email,
                hobbies: hobbies
            });
            toast.success("Data Updated successfully");
            closeRef.current?.click();
            router.refresh();
        }
        catch (err) {
            toast.error("Error adding data");
        }
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><Edit /></Button>
            </DialogTrigger>
            <DialogContent className="w-[100vw] md:w-[50vw]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Add new data.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4  items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            placeholder="Pedro Duarte" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phoneNumber" className="text-right">
                            Phone Number
                        </Label>
                        <Input
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
                            id="phoneNumber" placeholder="9099548792" minLength={10} maxLength={10} className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input id="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            placeholder="abc@xyz.com" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="hobbies" className="text-right">
                            Hobbies
                        </Label>
                        <Input id="hobbies"
                            value={hobbies.join(",")}
                            onChange={(e) => {
                                const value = e.target.value.split(",");
                                setHobbies(value);
                            }}
                            placeholder="Cricket,Lifting.." className="col-span-3" required />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleUpdate}>
                        Update Data
                    </Button>
                    <DialogClose>
                        <Button
                            ref={closeRef}
                            variant="secondary"
                            onClick={() => {
                                closeRef.current?.click();
                            }}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
