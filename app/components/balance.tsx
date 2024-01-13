import { formatToPrice } from "~/helpers/priceFormat";

export const Balance = ({ balance }: { balance: number }) => {
  return (
    <div className="flex gap-5 items-center justify-between">
      {/* todo - bolder */}
      <span className="font-roboto text-secondary text-label tracking-small font-medium opacity-70">
        Balance
      </span>
      <span className="font-roboto text-main text-label tracking-small font-bold">
        {formatToPrice(balance)}
      </span>
    </div>
  );
};
