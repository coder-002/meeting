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
  Button,
  Input,
} from "@fluentui/react-components";
import { ReactNode, useEffect, useState } from "react";
import Loading from "../Loading";
import { Search16Regular } from "@fluentui/react-icons";

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
  onAction?: () => void;
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
    <Loading />
  ) : (
    <div className="p-4 h-[50rem] overflow-hidden">
      <div className="flex gap-4">
        <Input
          size="medium"
          placeholder="Search..."
          contentAfter={<Search16Regular />}
          style={{ width: "300px" }}
        />
        {props.btnText && (
          <Button appearance="primary" onClick={props.onAction}>
            {props.btnText}
          </Button>
        )}
      </div>
      <div className="h-full overflow-y-auto mt-4">
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
                <DataGridHeaderCell>
                  <strong>{renderHeaderCell()}</strong>
                </DataGridHeaderCell>
              )}
            </DataGridRow>
          </DataGridHeader>
          {!props.data ? (
            ""
          ) : (
            <DataGridBody<T>>
              {({ item, rowId }) => (
                <DataGridRow<T>
                  key={rowId}
                  selectionCell={{
                    checkboxIndicator: { "aria-label": "Select row" },
                  }}
                >
                  {({ renderCell }) => (
                    <DataGridCell>{renderCell(item)}</DataGridCell>
                  )}
                </DataGridRow>
              )}
            </DataGridBody>
          )}
        </DataGrid>
      </div>
    </div>
  );
};
