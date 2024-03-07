import { Link } from "@remix-run/react";
import { SortAndFilterBar } from "../SortAndFilter/SortAndFilterBar";
import { TransactionType } from "~/types/types";

type TransactionsTopProps = {
  transactionType: TransactionType;
};
export const TransactionsTop = ({ transactionType }: TransactionsTopProps) => {
  return (
    <div className="flex gap-3">
      {/* topBar */}
      <SortAndFilterBar type={transactionType} />
      <div>
        <Link to="new">Add tr +</Link>
      </div>
    </div>
  );
};
