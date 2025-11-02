'use client';
import { Select, SelectItem } from "@nextui-org/react";
import { Provider } from "@/entities";
import { useState } from "react";

export default function SelectProvider({ providers, defaultProvider }: { providers: Provider[] , defaultProvider : string}) {
    const [selectedProvider, setSelectedProvider] = useState<string>(defaultProvider || "");

    return (
        <>
            <Select
                label="Proveedor"
                selectedKeys={new Set([selectedProvider])}
                onSelectionChange={(keys) => {
                    const newValue = Array.from(keys)[0] as string || "";
                    setSelectedProvider(newValue);
                }}
            >
                {providers.map((provider) => (
                    <SelectItem key={provider.providerId} value={provider.providerId}>
                        {provider.providerName}
                    </SelectItem>
                ))}
            </Select>
            <input type="hidden" name="providerId" value={selectedProvider} />
        </>
    )
}