"use client";
import EmployeeCard from "../../_components/EmployeeCard";
import EmployeePhotoCard from "../../_components/EmployeePhotoCard";
import { Employee } from "@/entities";
import FormCreateEmployee from "../../_components/FormCreateEmployee";
import CreateEmployee from "../../_components/CreateEmployee";
import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { Location } from "@/entities";

export default function ListEmployees({ employees , locations}: { employees: Employee[], locations: Location[]}) {
    const [filter, setFilter] = useState<string>("all");
    const filteredEmployees = filter === "all"
        ? employees
        : employees.filter((e) => String(e.location?.locationId) === filter);
    return (
        <>
            <Select
                label="Filtrar por tienda"
                selectedKeys={new Set([filter])}
                onSelectionChange={(keys) => {
                    if (keys === "all") { setFilter("all"); return; }
                    const key = Array.from(keys as Set<string>)[0];
                    setFilter(key ?? "all");
                }}
                items={[
                    { key: "all", name: "Todas" },
                    ...locations.map((l) => ({ key: String(l.locationId), name: l.locationName })),
                ]}
            >
                {(item) => <SelectItem key={item.key}>{item.name}</SelectItem>}
            </Select>
            {filteredEmployees.map((employee: Employee) => {
                if (employee.employeePhoto !== null) {
                    return <EmployeePhotoCard key={employee.id} employee={employee} />;
                } else {
                    return <EmployeeCard key={employee.id} employee={employee} />;
                }
            })}
            <div className="absolute bottom-10 right-10">
                <CreateEmployee>
                    <FormCreateEmployee locations={locations} />
                </CreateEmployee>
            </div>
        </>
    )
}