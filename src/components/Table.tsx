import type { ReactNode } from "react";

type Column<T> = {
    key: keyof T | string;
    header: string;
    render?: (item: T) => ReactNode
};

type TableProps<T> = {
    data: T[];
    columns: Column<T>[];
};

export function Table<T extends Record<string, any>>({ data, columns }: TableProps<T>) {
    return (
        <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full border border-primary bg-white">
                <thead className="bg-primary text-white">
                    <tr>
                        {columns.map((col) => (
                        <th key={col.key as string} className="px-4 py-2 text-left font-semibold">
                            {col.header}
                        </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                {data.map((row, idx) => (
                    <tr key={idx} className="border-t hover:bg-gray-50">
                        {columns.map((col) => (
                            <td key={col.key as string} className="px-4 py-2">
                            {col.render ? col.render(row) : (row[col.key] as ReactNode)}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
