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
import { useRef, useState } from "react";
import { postData } from "@/actions/data";
import { toast } from "sonner";

export function FormDialog() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [hobbies, setHobbies] = useState<string[]>([]);
    const closeRef = useRef<HTMLButtonElement>(null);
    const handleSend = () => {
        postData({
            name: name,
            phoneNumber: phone,
            email: email,
            hobbies: hobbies
        }).then(() => {
            toast.success("Data added successfully");
            closeRef.current?.click();
        }).catch(() => {
            toast.error("Error adding data");
        })
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add</Button>
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
                            onChange={(e) => {
                                const value = e.target.value.split(",");
                                setHobbies(value);
                            }}
                            placeholder="Cricket,Lifting.." className="col-span-3" required />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSend}>
                        Send Data
                    </Button>
                    <DialogClose>
                        <Button
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
