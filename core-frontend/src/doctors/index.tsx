import TableBody from "../components/shared/TableBody";
import TableFooter from "../components/shared/TableFooter";

const doctors = () => {
  return (
    <div>
      <h1>Doctors</h1>
      <TableBody columns={[]} rows={[]}></TableBody>
      <TableFooter
        page={0}
        pageSize={0}
        totalItems={0}
        onPageChange={function (page: number): void {
          throw new Error("Function not implemented.");
        }}
      ></TableFooter>
    </div>
  );
};

export default doctors;
