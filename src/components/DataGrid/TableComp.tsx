import {
  DataGrid,
  TableColumnDefinition,
  createTableColumn,
  TableCellLayout,
  DataGridHeader,
  DataGridRow,
  DataGridHeaderCell,
  DataGridBody,
  DataGridCell,
  OnSelectionChangeData,
  Spinner,
} from "@fluentui/react-components";
import { ReactNode, useEffect, useState } from "react";

export interface DataGridCol<T> {
  dataKey: keyof T;
  isSortable?: boolean;
  title: string;
  render?: (item: T) => ReactNode;
}

type Props<T> = {
  columns: DataGridCol<T>[];
  data: T[];
  idCol?: string;
  loading?: boolean;
  onSelect?: (item: T) => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  btnText?: string;
};

export const TableComp = <T extends {}>(props: Props<T>) => {
  const [cols, setCols] = useState<TableColumnDefinition<T>[]>([]);

  const init = () => {
    const columns: TableColumnDefinition<T>[] = [];
    props.columns.forEach((x) => {
      let item = x.dataKey.toString();

      columns.push(
        createTableColumn<T>({
          columnId: item,
          compare: x.isSortable
            ? (a, b) => (a[x.dataKey] as any).localeCompare(b[x.dataKey])
            : undefined,
          renderCell: (o) => (
            <TableCellLayout>
              {x.render ? x.render(o) : (o?.[x.dataKey] as any)}
            </TableCellLayout>
          ),
          renderHeaderCell: (_) => <>{x.title}</>,
        })
      );
    });

    // {
    //   props.actions &&
    //     columns.push(
    //       createTableColumn<T>({
    //         columnId: "actions",
    //         renderHeaderCell: () => <strong>Actions</strong>,
    //         renderCell: () => (
    //           <div className="flex gap-4">
    //             <Tooltip withArrow content={"edit"} relationship="label">
    //               <Button
    //                 aria-label="Edit"
    //                 icon={<BiEdit />}
    //                 onClick={props.onEditClick}
    //               />
    //             </Tooltip>
    //             <Tooltip withArrow content={"delete"} relationship="label">
    //               <Button
    //                 aria-label="Delete"
    //                 icon={<FaDeleteLeft />}
    //                 onClick={props.onDeleteClick}
    //               />
    //             </Tooltip>
    //           </div>
    //         ),
    //       })
    //     );
    // }

    setCols(columns);
  };

  useEffect(() => {
    init();
  }, []);

  const handleSelect = (_: any, data: OnSelectionChangeData) => {
    if (!props.columns) return;

    let val = data.selectedItems.entries().next().value[0];
    if (props.idCol) {
      let item = (props.data as any).filter(
        (x: any) => x[props.idCol || "id"] == val
      );
      props.onSelect && props.onSelect(item[0]);
    } else {
      let item = props.data[val];
      props.onSelect && props.onSelect(item);
    }
  };

  return props.loading ? (
    <Spinner style={{ padding: "0.5em" }} />
  ) : (
    <div>
      {/* <div className="flex justify-between mb-3">
        <Search />
        {props.btnText && <AddButton buttonText={props.btnText} />}
      </div> */}
      <DataGrid
        columns={cols}
        items={props.data}
        getRowId={(item) =>
          props.idCol ? item[props.idCol] : props.data.indexOf(item)
        }
        selectionMode="single"
        sortable
        onSelectionChange={handleSelect}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<T>>
          {({ item, rowId }) => (
            <DataGridRow<T>
              key={rowId}
              selectionCell={{
                checkboxIndicator: { "aria-label": "Select row" },
              }}
              onClick={() => {
                // Handle row click here
                console.log("Row clicked:", item);
              }}
            >
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </div>
  );
};
