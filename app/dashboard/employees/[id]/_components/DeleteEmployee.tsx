"use client";
import { Button } from "@nextui-org/react";
import { LuTrash } from "react-icons/lu";
import deleteEmployee from "@/actions/employees/delete";

export default function DeleteEmployee({ employeeId }: { employeeId: string }) {
    return (
        <form action={deleteEmployee}>
            <input type="hidden" name="employeeId" value={employeeId} />
            <Button color="danger" type="submit">
                <LuTrash size="20" />
            </Button>
        </form>
    );
}