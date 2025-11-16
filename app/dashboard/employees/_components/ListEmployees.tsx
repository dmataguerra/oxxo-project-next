"use client";
import EmployeeCard from "./EmployeeCard";
import EmployeePhotoCard from "./EmployeePhotoCard";
import FormCreateEmployee from "./FormCreateEmployee";
import CreateEmployee from "./CreateEmployee";
import { Employee, Location } from "@/entities";
import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

export default function ListEmployees({ employees, locations }: { employees: Employee[]; locations: Location[] }) {
  const [filter, setFilter] = useState<string>("all");
  const filteredEmployees = filter === "all" ? employees : employees.filter((e) => String(e.location?.locationId) === filter);

  return (
    <>
      <div className="w-full max-w-xs">
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
      </div>

      <div className="flex flex-wrap flex-grow-0 gap-4 py-4">
        {filteredEmployees.map((employee) =>
          employee.employeePhoto !== null ? (
            <EmployeePhotoCard key={employee.id} employee={employee} />
          ) : (
            <EmployeeCard key={employee.id} employee={employee} />
          )
        )}
      </div>

      <div className="absolute bottom-10 right-10">
        <CreateEmployee>
          <FormCreateEmployee locations={locations} />
        </CreateEmployee>
      </div>
    </>
  );
}
