import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import PdfGenerator from "./PdfGenerator"

  
export default function PrescriptionTable({ prescriptions }) {
    prescriptions.reverse()
return (
    <div className="p-8 px-32 w-full" >
        <Table className="border border-gray-300">
            <TableCaption>All Prescription List</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[400px] text-center">Doctor's Name</TableHead>
                <TableHead className="w-[200px] text-center"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {prescriptions.map((prescription) =>{ return (
                <TableRow key={prescription.id}>
                    <TableCell className="w-[400px] text-center">{prescription.doctorName}</TableCell>
                    <TableCell className="w-[200px] text-center">{prescriptions && <PdfGenerator input={JSON.parse(prescription.prescription)}/>}</TableCell>
                </TableRow>
                )})}
            </TableBody>
        </Table>
    </div>
)
}
  