'use client';
import { ModeToggle } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FormDialog } from "./_components/form-dialog";
import { getData } from "@/actions/data";
import { DataTable } from "./_components/table";
import { ColumnDef } from "@tanstack/react-table";
import { sendData } from "@/actions/mail";
import { toast } from "sonner";

export default function Home() {
  type Data = {
    _id: string
    phoneNumber: string
    email: string
    hobbies: string[]
  }
  const [selectAll, setSelectAll] = useState(false);
  const [tableEntries, setTableEntries] = useState([]);
  const [selected, setSelected] = useState<Data[]>([]);
  const columns: ColumnDef<Data>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            if (!!value) {
              setSelected(tableEntries);
            }
            else {
              setSelected([]);
            }
            console.log(selected);
            table.toggleAllPageRowsSelected(!!value)
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            if (!!value) {
              setSelected([...selected, {
                _id: row.original._id,
                phoneNumber: row.original.phoneNumber,
                email: row.original.email,
                hobbies: row.original.hobbies
              }]);
            }
            else {
              setSelected(selected.filter((item) => item._id !== row.original._id));
            }
            row.toggleSelected(!!value)
            console.log(selected);
          }
          }
          aria-label="Select row"
        />
      ),
    },
    {
      accessorKey: "_id",
      header: "Id",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
    },
    {
      accessorKey: "hobbies",
      header: "Hobbies",
    }
  ]

  useEffect(() => {
    const getEntries = async () => {
      const data = await getData();
      setTableEntries(data);
    }
    getEntries();
  }, []);

  const sendEmail = async () => {
    if (!selected.length) {
      alert('Please select atleast one entry');
      return;
    }
    try{
      sendData(selected);
      
      toast.success('Email sent successfully');

    }
    catch(e){
      toast.error('Error sending email');
    }
  }


  return (
    <div className="w-full">
      <div className="p-5 w-full flex bg-muted justify-between">
        <h1 className="font-semibold text-2xl">
          User Information
        </h1>
        <ModeToggle />
      </div>
      <div className="pl-10 pr-10 mt-5 mb-5 flex justify-between items-center">
        <div className="flex w-[100px] justify-between items-center">
          <input type='checkbox'
            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            onChange={() => setSelectAll(!selectAll)}
          />
          <p>Select All</p>
        </div>
        <div>
          <Button
            disabled={!selected.length}
            onClick={sendEmail}
            variant='secondary' className="mr-5"
          >
            Send
          </Button>
          <FormDialog />
        </div>
      </div>
      <div className="pl-10 pr-10 mt-5">
        <DataTable data={tableEntries} columns={columns} />
      </div>
    </div>
  );
}
