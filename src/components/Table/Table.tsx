// import {
//   Table as FluentTable,
//   TableBody,
//   TableCell,
//   TableCellLayout,
//   TableHeader,
//   TableHeaderCell,
//   TableRow,
//   TableSelectionCell,
// } from "@fluentui/react-components";
// export interface TableProps<T> {
//   columnKey: keyof T;
//   label: string;
// }

// type Props<T> = {
//   columns: TableProps<T>[];
//   items: T[];
// };

// const Table = <T extends {}>({ columns, items }: Props<T>) => {
//   return (
//     <FluentTable>
//       <TableHeader>
//         <TableRow>
//           <TableSelectionCell type="radio" hidden />
//           {columns.map((column) => (
//             <TableHeaderCell key={column.columnKey.toString()}>
//               {column.label}
//             </TableHeaderCell>
//           ))}
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {items?.map((item) => (
//           <TableRow key={item.id}>
//             <TableSelectionCell type="radio" />
//             {columns.map((column) => (
//               <TableCell key={column.columnKey.toString()}>
//                 <TableCellLayout>{item[column.columnKey]}</TableCellLayout>
//               </TableCell>
//             ))}
//           </TableRow>
//         ))}
//       </TableBody>
//     </FluentTable>
//   );
// };

// export default Table;
