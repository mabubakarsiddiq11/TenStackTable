
export const columns = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Gender",
    accessorKey: "gender",
  },
  // 2 naam ya 2 column ku merge krne ke liye..Means first and last alag alag han tu merge kr du
  // Cell Merge Example
  // {
  //   accessorFn : (row) => `${row.first_name} ${row.last_name} `,
  //   header : 'Name'
  // },
];
