'use client';
import { deleteData } from "@/actions/data";
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
import { Trash } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

interface DeleteButtonProps {
    id: string
}
export function DeleteButton({ id }: DeleteButtonProps) {
    const handleDelete = () => {
        deleteData(id).then(() => {
            toast.success("Data deleted successfully");
            closeRef.current?.click();
        }
        ).catch(() => {
            toast.error("Error deleting data");
        })
    }
    const closeRef = useRef<HTMLButtonElement>(null);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Trash />
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[100vw] md:w-[50vw]">
                <DialogHeader>
                    <DialogTitle>Delete Item</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this data?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="submit" onClick={handleDelete}>
                        Delete
                    </Button>
                    <DialogClose>
                        <Button
                            variant="secondary"
                            ref={closeRef}
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

